import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello, world !");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  const args: [number, number] = [Number(height), Number(weight)];
  if (args.includes(NaN)) {
    res.status(400).send({ error: "Malformatted parameters" });
  }
  res.send(calculateBmi(...args));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

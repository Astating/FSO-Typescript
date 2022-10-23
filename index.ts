import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).send({ error: "Parameters missing." });
  }
  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((value) => isNaN(Number(value))) ||
    isNaN(Number(target))
  ) {
    res.status(400).send({ error: "Malformatted parameters." });
  }

  const calculated = calculateExercises(
    (daily_exercises as number[]).map(Number), // Actually, true => 1, which is not desirable. Better to use Number.parseInt (beware that Number.parseInt can take multiple parameters so you should not use it like this ".map(Number.parseInt)" but like this ".map(v => Number.parseInt(v)")
    Number(target)
  );
  res.send(calculated);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

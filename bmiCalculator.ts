export function calculateBmi(heightInCentimeters: number, weight: number): {height: number, weight: number, bmi: string} {
    const heightInMeters = heightInCentimeters / 100;
    const bmi = weight / (heightInMeters**2);

    const bmiDescription: string = (() => {
        if (bmi < 18.5) return "Underweight";
        if (bmi > 25) return "Overweight";
        return "Normal";
    })();

    return { height: heightInCentimeters,
      weight,
      bmi: `${bmi.toFixed(2)} => ${bmiDescription}`};
}

interface BmiParams {
    height: number;
    weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiParams => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
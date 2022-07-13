function calculateBmi(heightInCentimeters: number, weight: number): string {
    const heightInMeters = heightInCentimeters / 100;
    const bmi = weight / (heightInMeters**2);
    
    if (bmi < 18.5) return "Underweight";
    if (bmi > 18.5 && bmi < 25) return "Normal";
    if (bmi > 25) return "Overweight";


}

console.log(calculateBmi(181, 60));
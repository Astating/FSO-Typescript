function calculateExercises(dailyExerciseHours: Array<number>, dailyTarget: number) {
    const periodLength: number = dailyExerciseHours.length;

    const trainingDays: number = dailyExerciseHours.reduce((totalDays, trainingHours) => {
        return trainingHours > 0 ? totalDays + 1 : totalDays;
    }, 0);

    const average: number = dailyExerciseHours.reduce((total, hours) => total + hours, 0) / periodLength;

    const success: boolean = average >= dailyTarget;

    const rating: 1 | 2 | 3 = (() => {
        if (success) {return 3;}
        else if (average > dailyTarget / 2) {return 2;}
        else return 1;
    })();

    const ratingDescription: string = (() => {
        switch(rating) {
            case 1:
                return "Meh. You can still do it next time!";
                break;
            case 2:
                return "Eh, you were not that far from your goal!";
                break;
            case 3:
                return "Success!";
                break;
            default:
                return "Hmm, this should not happen";
        }
    })();

    return { periodLength, trainingDays, success, rating, ratingDescription, target: dailyTarget, average };
}

interface ExerciseValues {
    dailyHours: number[];
    target: number;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const hours: number[] = (() => {
        const processedArg = [];
        for (let i = 3 ; i < process.argv.length ; i++) {
            processedArg.push(Number(process.argv[i]));
        }
        return processedArg;
    })();

    if (!isNaN(Number(args[2])) && !hours.some((arg) => isNaN(Number(arg)))) {
        return {
          target: Number(args[2]),
          dailyHours: hours
        };
      } else {
        throw new Error('Provided values were not numbers!');
      }
};

try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
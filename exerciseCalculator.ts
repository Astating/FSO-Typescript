function calculateExercises(dailyExerciseHours: Array<number>, dailyTarget: number) {
    const periodLength: number = dailyExerciseHours.length;

    const trainingDays: number = dailyExerciseHours.reduce((totalDays, hours) => {
        return hours > 0 ? totalDays + 1 : totalDays;
    }, 0);

    const average: number = dailyExerciseHours.reduce((total, hours) => total + hours, 0) / periodLength;

    const success: boolean = average >= dailyTarget;

    const rating: number = (() => {
        if (success) return 3;
        if (average > dailyTarget / 2) return 2;
        if (average <= dailyTarget / 2) return 1;
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
                return "Success!"
                break;
            default:
                return "Hmm, this should not happen";
        }
    })();

    return {periodLength, trainingDays, success, rating, ratingDescription, target: dailyTarget, average };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
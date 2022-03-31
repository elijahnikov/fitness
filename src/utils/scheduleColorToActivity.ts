export const scheduleColorToActivity = (activity: string) => {

    let map = new Map(
        [
            ["Workout", "blue.100"], 
            ["Cardio", "green.100"],
            ["Meal", "orange.100"],
        ]
    );

    let color = map.get(activity)

    return color
}
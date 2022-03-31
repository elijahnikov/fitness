export const validateSavedWorkoutInput = (values: {
    title: string, 
    type: string, 
    sets:  string, 
    reps:  string, 
    weight: number, 
    duration: number}) => 
{

    if (!values.title || 
        !values.type)
    {
        return true
    }

    return false;

}
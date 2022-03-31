export const validateDiaryInput = (
    type: string,
    id: number
) => 
{
    if (!type || !id)
    {
        return true
    }
    return false
}

export const validateWorkoutDiaryInput = (
    type: string,
    id: number,
) =>
{
    if (!type || !id)
    {
        return true
    }
    return false
}
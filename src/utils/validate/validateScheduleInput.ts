export const validateScheduleInput = (values: {
    title: string, 
    type: string,
    day: string, 
    duration: number}) => 
{

    if (!values.title || 
        !values.type ||
        !values.day || 
        !values.duration)
    {
        return true
    }

    return false;

}
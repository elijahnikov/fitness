export const validateSavedFoodInput = (values: {
    title: string, 
    type: string, 
    serving:  number, 
    calories:  number, 
    protein: number, 
    carbs: number, 
    fat: number}) => 
{

    if (!values.title || 
        !values.type || 
        !values.serving || 
        !values.calories || 
        !values.protein || 
        !values.carbs || 
        !values.fat)
    {
        return true
    }

    return false;

}
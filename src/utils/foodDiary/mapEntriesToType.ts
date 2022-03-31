import { GetFoodDiaryQuery } from "../../generated/graphql";

export const mapEntriesToType = (data: GetFoodDiaryQuery) => {

    let f = data.getFoodDiary.foodDiary

    let breakfast = []
    let lunch = []
    let dinner = []
    let snack = []

    for (let i = 0; i < f.length; i++)
    {
        if (f[i].type === 'Breakfast')
        {
            breakfast.push(f[i])
        }
        if (f[i].type === 'Lunch')
        {
            lunch.push(f[i])
        }
        if (f[i].type === 'Dinner')
        {
            dinner.push(f[i])
        }
        if (f[i].type === 'Snack')
        {
            snack.push(f[i])
        }
    }

    return {
        breakfast,
        lunch,
        dinner,
        snack
    }

}
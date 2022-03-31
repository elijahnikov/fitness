import { ActivitiesByUserQuery } from "../../generated/graphql";

export const mapScheduleToDays = (data: ActivitiesByUserQuery) => {
    //function to map each schedule activity to day arrays
    
    let a = data.activitiesByUser.activities

    let mondayData = []
    let tuesdayData = []
    let wednesdayData = []
    let thursdayData = []
    let fridayData = []
    let saturdayData = []
    let sundayData = []

    for (let i = 0; i < a.length; i++)
    {
        if (a[i].day === 'Monday')
        {
            mondayData.push(a[i])
        }
        if (a[i].day === 'Tuesday')
        {
            tuesdayData.push(a[i])
        }
        if (a[i].day === 'Wednesday')
        {
            wednesdayData.push(a[i])
        }
        if (a[i].day === 'Thursday')
        {
            thursdayData.push(a[i])
        }
        if (a[i].day === 'Friday')
        {
            fridayData.push(a[i])
        }
        if (a[i].day === 'Saturday')
        {
            saturdayData.push(a[i])
        }
        if (a[i].day === 'Sunday')
        {
            sundayData.push(a[i])
        }
    }
    
    return {
        mondayData,
        tuesdayData,
        wednesdayData,
        thursdayData,
        fridayData,
        saturdayData,
        sundayData
    }
}
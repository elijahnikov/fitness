import { getDiaryDateFromURL } from "./getDiaryDateFromURL";

export const formatDate = () => {
    const dateURL = getDiaryDateFromURL();
    const year = dateURL.substring(0,4)
    const month = dateURL.substring(4,6)
    const day = dateURL.substring(6,8)
    
    const fullDate = year+'-'+month+'-'+day 

    return fullDate
}

export const formatDateFromPicker = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]
    
    const year = formattedDate.substring(0,4)
    const month = formattedDate.substring(5,7)
    const day = formattedDate.substring(8,10)
    
    const fullDate = year+month+day 
    return fullDate
}
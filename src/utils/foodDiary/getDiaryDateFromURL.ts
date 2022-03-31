import { useRouter } from "next/router"

export const getDiaryDateFromURL = () => {
    const router = useRouter()
    const date = typeof router.query.date === 'string' ? router.query.date : '';
    return date.substring(0,8);
}
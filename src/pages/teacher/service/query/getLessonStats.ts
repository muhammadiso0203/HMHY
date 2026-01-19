import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"

export const getLessonStats = () => {
    return useQuery({
        queryKey: ['lesson-stats'],
        queryFn: () => {
            return request.get('lessons/stats/all').then((res) => res.data)
        }
    })   
}
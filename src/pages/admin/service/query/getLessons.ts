import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { ILessons } from "../../types"

export const useGetLesson = () => {
    return useQuery<ILessons[]>({
        queryKey: ['lessons_all'],
        queryFn: () => {
            return request.get<ILessons[]>('lessons').then((res) => res.data)
        }
    })
}
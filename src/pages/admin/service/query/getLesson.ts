import { useQuery } from "@tanstack/react-query"
import type { ILessonsResponse } from "../../types"
import { request } from "@/config/request"

export const getLesson = () => {
    return useQuery<ILessonsResponse>({
        queryKey: ['lessons'],
        queryFn: () => {
            return request.get<ILessonsResponse>('/lessons').then((res) => res.data)
        }
    })
}
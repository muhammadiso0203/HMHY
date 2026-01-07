import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { IStudentsResponse } from "../../types"

export const getStudents = () => {
    return useQuery<IStudentsResponse>({
        queryKey: ['students'],
        queryFn: () => {
            return request.get<IStudentsResponse>('/students').then((res) => res.data)
        }
    })
}   
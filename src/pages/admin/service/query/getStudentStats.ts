import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { IStudentStats } from "../../types"

export const useGetStudentStats = () => {
    return useQuery<IStudentStats>({
        queryKey: ['students-stats'],
        queryFn: () => {
            return  request.get<IStudentStats>('/students/stats').then((res) => res.data)
        }
    })
}
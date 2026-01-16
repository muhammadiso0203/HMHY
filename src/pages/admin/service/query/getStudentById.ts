import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { IStudentById } from "../../types"

export const useGetStudent = (id:string) => {
    return useQuery<IStudentById>({
        queryKey: ['student', id],
        enabled: !!id,
        queryFn: () => {
            return request.get<IStudentById>(`/students/${id}`).then((res) => res.data)
        },
    })
}
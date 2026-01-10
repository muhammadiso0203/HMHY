import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { ITeacherById } from "../../types"

export const useGetTeacherById = (id:string) => {
    return useQuery({
        queryKey: ['teacher', id],
        enabled: !!id,
        queryFn: () => {
            return request.get<ITeacherById>(`/teacher/${id}`).then((res) => res.data.data)
        }
    })
}
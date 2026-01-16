import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { IAllAdmin } from "../../types"

export const useGetAllAdmin = () => {
    return useQuery<IAllAdmin[]>({
        queryKey: ['admins'],
        queryFn: () => {
            return request.get<IAllAdmin[]>('/admin').then((res) => res.data)
        }
    })
}
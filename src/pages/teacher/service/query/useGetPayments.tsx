import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { IPayments } from "../../types"

export const useGetPayments = () => {
    return useQuery({
        queryKey: ['payments'],
        queryFn: () => {
            return request.get<IPayments[]>('teacher-payments').then((res) => res.data)
        }
    })
}
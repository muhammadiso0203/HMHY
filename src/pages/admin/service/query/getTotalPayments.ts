import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { ITotalPayments } from "../../types"

export const useTotalPayments = () => {
    return useQuery({
        queryKey: ['totalPayments'],
        queryFn: () => {
            return request.get<ITotalPayments>('teacher-payments/statistics').then((res) => res.data)
        }
    })
}
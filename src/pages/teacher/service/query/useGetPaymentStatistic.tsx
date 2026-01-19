import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"

export const useGetPaymentStatistic = () => {
    return useQuery({
        queryKey: ['payment-statistic'],
        queryFn: () => {
            return request.get('teacher-payments/statistics').then((res) => res.data)
        }
    })   
}
import { useQuery } from "@tanstack/react-query"
import type { IDashboardStatsResponse } from "../../types"
import { request } from "@/config/request"

export const getStatistic = () => {
    return useQuery<IDashboardStatsResponse>({
        queryKey: ['statistic'],
        queryFn: () => {
            return request.get<IDashboardStatsResponse>('/admin/statistic').then((res) => res.data)
        }
    })
}
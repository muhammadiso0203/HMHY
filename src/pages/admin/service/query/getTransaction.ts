import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { ITransactionsResponse } from "../../types"

export const useGetTransaction = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: () => {
            return request.get<ITransactionsResponse>("/transactions").then((res) => res.data)
        }
    })
}

import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"

export const useGetStudents = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () => {
         return request.get('/students').then((res) => res.data.data)
        }
    })
}   
import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"

export const useDeleteStudent = () => {
    return useMutation({
        mutationFn: (id:string) => {
            return request.delete(`students/${id}`).then((res) => res.data)
        }
    })
}
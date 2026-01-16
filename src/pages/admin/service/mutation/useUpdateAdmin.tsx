import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"
import type { IAdminUpdate } from "../../types"

export const useUpdateAdmin = (id:string) => {
    return useMutation({
        mutationFn: (data: IAdminUpdate) => {
            return request.patch(`admin/${id}`, data).then((res) => res.data)
        }
    })
}
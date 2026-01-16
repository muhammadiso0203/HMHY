import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"
import type { IAdminResponse, ICreateAdmin } from "../../types"

export const useCreateAdmin = () => {
    return useMutation<IAdminResponse, Error, ICreateAdmin>({
        mutationFn: (data) => {
             return request.post<IAdminResponse>('/admin', data).then((res) => res.data)
        }
    })
}
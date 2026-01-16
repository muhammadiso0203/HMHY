import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"
import type { IAdminUpdate } from "../../types"

export const useUpdateMe = () => {
    return useMutation({
        mutationFn: (data: IAdminUpdate) => {
            return request.patch(`/admin/me`, data)
        }
    })
}
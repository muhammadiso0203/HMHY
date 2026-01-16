import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"

export const useSignIn = () => {
    return useMutation({
        mutationFn: (data: any) => {
            return request.post('auth/teacher/sign-in', data).then((res) => res.data)
        }
    })
}
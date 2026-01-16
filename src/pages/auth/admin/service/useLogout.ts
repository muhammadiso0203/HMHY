import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { useNavigate } from "react-router"

export const useLogout = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: () => {
            return request.post('/auth/admin/logout').then((res) => res.data)

        },
        onSuccess: () => {
            Cookies.remove("token");
            Cookies.remove("access_token");
            navigate("/")
        }
    })
}
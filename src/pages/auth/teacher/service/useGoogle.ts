import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const navigate = useNavigate();


export const useGoogle = () => { 
    return useMutation({
        mutationFn: (credential) => {
            return request.get('/auth/teacher/google', {params: credential}).then((res)=>res.data)
        },
        onSuccess: (data: any) => {
            if (data?.accessToken) {
                Cookies.set("access_token", data?.accessToken, { expires: 1 });
            }
            navigate("/teacher/my-lessons");
        },
    })
};

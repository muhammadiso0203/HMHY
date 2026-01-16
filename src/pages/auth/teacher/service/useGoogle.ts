import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

interface GoogleLoginPayload {
  credential: string;
}

export const useGoogle = () => { 
    return useMutation({
        mutationFn: (payload: GoogleLoginPayload) => {
            return request.get('/auth/teacher/google', {params: payload}).then((res)=>res.data)
        }
    })
};

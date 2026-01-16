import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { IAdminProfile } from "../../types"

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => {
          return request.get<IAdminProfile>("/admin/me").then((res) => res.data)  
        }
    })
}   
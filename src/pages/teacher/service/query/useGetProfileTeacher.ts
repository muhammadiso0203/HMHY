import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { ITeacherProfile } from "../../types";

export const useGetProfileTeacher = () => {
    return useQuery({
        queryKey: ['profile-teacher'],
        queryFn: () => {
            return request.get<ITeacherProfile>('/teacher/me').then((res) => res.data.data)
        }
    })   
}
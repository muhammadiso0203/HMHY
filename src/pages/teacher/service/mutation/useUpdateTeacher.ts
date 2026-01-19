import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"
import type { ITeacherUpdateProfile } from "../../types"

export const useUpdateTeacher = () => {
    return useMutation({
        mutationFn: (data: ITeacherUpdateProfile) => {
            return request.patch(`/teacher/me`, data)
        }
    })
}
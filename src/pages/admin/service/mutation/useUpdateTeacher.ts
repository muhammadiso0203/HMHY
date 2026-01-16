import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"
import type { ITeacherEdit } from "../../types"

export const useUpdateTeacher = (id:string) => {
    return useMutation({
        mutationFn: (data: ITeacherEdit) => {
            return request.patch(`teacher/${id}`, data).then((res) => res.data)
        }
    })
}
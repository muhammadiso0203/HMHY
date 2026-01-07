import { request } from "@/config/request"
import {useQuery} from "@tanstack/react-query"
import type { IGetTeachersResponse, ITeacher } from "../../types"


export const getTeachers = () => {
    return useQuery<ITeacher[]>({
        queryKey: ['teachers'],
        queryFn: () => {
            return request.get<IGetTeachersResponse>('/teacher').then((res) => res.data.data.data)
        }
    })
}
import { request } from '@/config/request';
import { useQuery } from '@tanstack/react-query';
import type { IDeletedTeacher } from '../../types';
export const getDeletedTeacher = () => {
    return useQuery<IDeletedTeacher>({
        queryKey: ['delete'],
        queryFn: () => {
            return request.get<IDeletedTeacher>('/teacher/deleted').then((res) => res.data)
        }
    })
}
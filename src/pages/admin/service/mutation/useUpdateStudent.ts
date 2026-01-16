import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import type { IStudentUpdate } from "../../types";

export const useUpdateStudent = (id: string) => {
  return useMutation({
    mutationFn: (data: IStudentUpdate) => {
      return request.patch(`students/${id}`, data).then((res) => res.data);
    },
  });
};

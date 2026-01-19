import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import type { ILessons } from "@/pages/admin/types";

export interface CreateLessonPayload {
  name: string;
  price: number;
  startTime: string; // ISO
  endTime: string; // ISO
  teacherId: string;
}

// Creates a lesson (admin/teacher) on /lessons endpoint
export const useCreateLesson = () => {
  return useMutation<ILessons, unknown, CreateLessonPayload>({
    mutationFn: async (payload) => {
      const res = await request.post("/lessons", payload);
      return res.data?.data ?? res.data;
    },
  });
};


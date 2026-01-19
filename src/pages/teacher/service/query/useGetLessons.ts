import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { ILessons } from "@/pages/admin/types";

export const useGetTeacherLessons = () => {
  return useQuery<ILessons[]>({
    queryKey: ["teacher-lessons"],
    queryFn: async () => {
      const response = await request.get("/lessons");
      const payload = response.data;

      if (Array.isArray(payload)) {
        return payload;
      }

      if (Array.isArray(payload?.data)) {
        return payload.data;
      }

      return [];
    },
  });
};


import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { IAdmin } from "../../types";

export const useGetAdmin = (adminId?: string) => {
  return useQuery<IAdmin>({
    queryKey: ["admin", adminId],
    enabled: !!adminId,
    queryFn: async () => {
      const res = await request.get<IAdmin>(`/admin/${adminId}`);
      return res.data;
    },
  });
};

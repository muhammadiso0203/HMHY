import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

interface RegisterStep2Payload {
    teacherId: string;
    phone: string;
    password: string;
}

export const useRegisterStep2 = () => {
    return useMutation({
        mutationFn: (payload: RegisterStep2Payload) => {
            const { teacherId, ...data } = payload;
            return request
                .post(`auth/teacher/register/step2/${teacherId}`, data)
                .then((res) => res.data);
        },
    });
};

export const useRegisterStep3 = () => {
  return useMutation({
    mutationFn: async (data: { teacherId: string; otpCode: string }) => {
      // POST so'rovi tanasida ma'lumotlarni yuboramiz
      const response = await request.post("auth/teacher/register/step3", {
        teacherId: data.teacherId, // Backend kutayotgan kalit nomi
        otpCode: data.otpCode,
      });
      return response.data;
    },
  });
};

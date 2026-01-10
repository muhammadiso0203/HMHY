import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { LoginResponse, LoginT } from "../../types";
import Cookies from "js-cookie";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginT) =>
      request
        .post<LoginResponse>("/auth/admin/sign-in", data)
        .then((res) => res.data),

    onSuccess: (data) => {
      const token = data.data.accessToken;

      Cookies.set("token", token, {
        expires: 1,
        sameSite: "strict",
      });
    },
  });
};

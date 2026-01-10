import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

request.interceptors.request.use((config) => {
  // logout endpoint bo‘lsa token qo‘shmaymiz (ixtiyoriy)
  if (config.url?.includes("/logout")) {
    return config;
  }

  const token = Cookies.get("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔥 AUTO LOGOUT
      Cookies.remove("token");
      Cookies.remove("role");

      // redirect (react-router bo‘lmasa ham ishlaydi)
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export { request };

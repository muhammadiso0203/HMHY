import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "http://13.201.56.55/api/v1",
});

/* ================= REQUEST INTERCEPTOR ================= */
request.interceptors.request.use((config) => {
  if (config.url?.includes("/logout")) {
    return config;
  }

  const adminToken = Cookies.get("token");
  const teacherToken = Cookies.get("access_token");

  config.headers = config.headers ?? {};

  // 👇 TEACHER endpointlar
  if (config.url?.startsWith("/teacher")) {
    if (teacherToken) {
      config.headers.Authorization = `Bearer ${teacherToken}`;
    }
  }

  // 👇 ADMIN endpointlar
  else if (config.url?.startsWith("/admin")) {
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  }

  return config;
});

/* ================= RESPONSE INTERCEPTOR ================= */
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;

      // 👇 Teacher logout
      if (path.startsWith("/teacher")) {
        Cookies.remove("access_token");
        window.location.href = "/teacher/login";
      }

      // 👇 Admin logout
      if (path.startsWith("/admin")) {
        Cookies.remove("token");
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export { request };

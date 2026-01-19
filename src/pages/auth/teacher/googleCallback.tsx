import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const TeacherGoogleCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");


    Cookies.set("access_token", token as string, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });

    navigate("/teacher/dashboard", { replace: true });
  }, [params, navigate]);

  return <div>Google orqali kirilmoqda...</div>;
};

export default TeacherGoogleCallback;

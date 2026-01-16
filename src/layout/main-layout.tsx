import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarLayout } from "./sidebar-layout";
import { Header } from "./header";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  role: "ADMIN" | "TEACHER" | "SUPER_ADMIN";
  exp: number;
}

const MainLayout = () => {
  const accessToken = Cookies.get("access_token");
  const token = Cookies.get("token");

  // 1. Ikkala token ham yo'q bo'lsa login'ga
  if (!accessToken && !token) {
    return <Navigate to="/" replace />;
  }

  let finalRole: "ADMIN" | "TEACHER" | "SUPER_ADMIN" | null = null;

  try {
    // 2. Teacher uchun access_token'ni tekshiramiz
    if (accessToken) {
      const decodedAccess = jwtDecode<TokenPayload>(accessToken);
      if (decodedAccess.role) {
        finalRole = decodedAccess.role;
      }
    }

    // 3. Agar hali ham role topilmagan bo'lsa (Admin uchun), token'ni tekshiramiz
    if (!finalRole && token) {
      const decodedToken = jwtDecode<TokenPayload>(token);
      if (decodedToken.role) {
        finalRole = decodedToken.role;
      }
    }

    // 4. Token muddati tekshiruvi (faqat role topilgan tokenni tekshiramiz)
    // Eslatma: Bu yerda har doim oxirgi topilgan finalRole'ga tegishli dekodlangan ma'lumotni olish kerak
    const activeToken = finalRole === "TEACHER" ? accessToken : token;
    if (activeToken) {
      const decoded = jwtDecode<TokenPayload>(activeToken);
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }
    }

  } catch (error) {
    console.error("Auth Error:", error);
    Cookies.remove("access_token");
    Cookies.remove("token");
    return <Navigate to="/" replace />;
  }

  // 5. Agar hech qaysi tokendan role chiqmasa
  if (!finalRole) {
    return <Navigate to="/" replace />;
  }

  const uiRole = finalRole.toLowerCase() as "admin" | "teacher" | "super_admin";
  console.log(uiRole);


  return (
    <SidebarProvider className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <SidebarLayout role={uiRole} />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
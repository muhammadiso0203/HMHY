import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarLayout } from "./sidebar-layout";
import { Header } from "./header";
import Cookies from "js-cookie";


const MainLayout = ({ role }: any) => {
  const teacherToken = Cookies.get("access_token");
  const adminToken = Cookies.get("token");

  if (role === "TEACHER" && !teacherToken) {
    console.log(role);
    return <Navigate to="/teacher/login" replace />;
    
  }

  if (role === "ADMIN" && !adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <SidebarProvider className="flex flex-col min-h-screen">
      <Header role={role} />
      <div className="flex flex-1">
        <SidebarLayout role={role} />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

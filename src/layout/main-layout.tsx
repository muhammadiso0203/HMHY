import { SidebarProvider } from "@/components/ui/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarLayout } from "./sidebar-layout";
import {Header} from "./header";
import Cookies from "js-cookie";

const MainLayout = () => {
  const token = Cookies.get("token") 
  if(!token){
    return <Navigate to={"/"} replace/>
  }
  return (
    <SidebarProvider className="flex flex-col">
      <Header />
      <div className="flex">
        <SidebarLayout />
        <div className="">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

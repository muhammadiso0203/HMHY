import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarLayout } from "./sidebar-layout";

const MainLayout = () => {
  return (
    <SidebarProvider >
      <div className="flex min-h-screen">
        <SidebarLayout/>

        <main className="flex-1">
          <div className="p-3 bg-white">
            <SidebarTrigger className="cursor-pointer" />
          </div>

          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

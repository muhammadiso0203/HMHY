import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarLayout } from "./sidebar-layout";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-100">
        <SidebarLayout />

        <main className="flex-1">
          <div className="p-3 border-b bg-white">
            <SidebarTrigger className="cursor-pointer" />
          </div>

          <div className="px-7.5 py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

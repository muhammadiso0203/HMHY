import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SidebarLayout } from "./sidebar-layout";
import Header from "./header";

const MainLayout = () => {
  return (
    <SidebarProvider>
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

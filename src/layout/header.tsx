import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router";
import { useLogout } from "@/pages/auth/admin/service/useLogout";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const Header = () => {
  const { mutate: logout } = useLogout();
  const token = Cookies.get("access_token") || Cookies.get("token");

  const decode = token ? jwtDecode<{ role: "admin" | "teacher" | "super_admin" }>(token) : null;
  const role = decode?.role || "GUEST";
  
  return (
    <header className="flex  h-14 items-center justify-between border-b border-gray-800 bg-gray-900 px-8 text-white">
      <div className="flex items-center gap-4">
        {/* Logotip */}
        <SidebarTrigger className="text-white hover:text-gray-300" />
        <div className="text-2xl font-bold tracking-wider text-cyan-400 glow">
          HMHY
        </div>
      </div>

      <div className="flex items-center gap-8">
        <Link
          to={"/app/admin/profile"}
          className="flex items-center gap-3 hover:bg-slate-700/60 transition rounded-[10px] p-1"
        >
          <span className="text-sm text-gray-400 flex items-center gap-2 font-semibold">
            <User className="w-5 h-5" />
          </span>
          <Button className="bg-teal-600 hover:bg-teal-600 font-normal text-[12px] w-23 cursor-pointer h-7">
            {role}
          </Button>
        </Link>
        <Button onClick={() => logout()}>
          <LogOut className="w-4 h-4 text-gray-300" />
        </Button>
      </div>
    </header>
  );
};

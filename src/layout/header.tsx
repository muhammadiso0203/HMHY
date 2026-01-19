import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "@/pages/auth/admin/service/useLogout";



export const Header = ({ role }: any) => {
  const { mutate: logout } = useLogout();

  let profilePath = `/${role.toLowerCase()}/profile`;

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 px-8 text-white">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:text-gray-300" />
        <div className="text-2xl font-bold tracking-wider text-cyan-400">
          HMHY
        </div>
      </div>

      <div className="flex items-center gap-8">
        <Link
          to={profilePath}
          className="flex items-center gap-3 hover:bg-slate-700/60 transition rounded-[10px] p-1"
        >
          <span className="text-sm text-gray-400 flex items-center gap-2 font-semibold">
            <User className="w-5 h-5" />
          </span>
          <Button className="bg-teal-600 font-normal text-[12px] h-7 px-3">
            {role.toLowerCase()}
          </Button>
        </Link>

        <Button onClick={() => logout()} variant="ghost">
          <LogOut className="w-4 h-4 text-gray-300" />
        </Button>
      </div>
    </header>
  );
};

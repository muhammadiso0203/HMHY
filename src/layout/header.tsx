import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

const Header = () => {
  return (
    <header className="flex w-full h-14 items-center justify-between border-b border-gray-800 bg-gray-900 px-8 text-white">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:text-gray-300" />
        {/* Logotip */}
        <div className="text-2xl font-bold tracking-wider text-cyan-400 glow">
          HMHY
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">~ superadmin</span>
        <Button className="bg-teal-600 font-medium hover:bg-teal-700">
          SUPERADMIN
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;

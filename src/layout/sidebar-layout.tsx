import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ActiveLink } from "@/components/active-link";
import { links } from "./layout-data";
import { cn } from "@/lib/utils";

export function SidebarLayout({role}: {role: "super_admin" | "admin" | "teacher"}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  console.log(role)

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-800 bg-[#1a232e]"
    >
      {/* Logo Section */}
      <SidebarHeader className="h-20 flex items-center justify-center bg-[#1a232e] border-b border-slate-800">
        <div className="relative flex items-center justify-center w-full">
          {!isCollapsed && (
            <div className="flex items-center font-black italic tracking-tighter animate-in fade-in slide-in-from-left duration-500">
              <span className="text-white text-3xl drop-shadow-md">HM</span>
              <span className="text-[#00d1b2] text-3xl ml-0.5 drop-shadow-[0_0_15px_#00d1b2]">
                HY
              </span>
            </div>
          )}

          {isCollapsed && (
            <div className="animate-in fade-in zoom-in-50 duration-500">
              <span
                className="text-[#00d1b2] text-4xl font-black italic tracking-tight"
                style={{ filter: "drop-shadow(0 0 20px #00d1b2)" }}
              >
                H
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#1a232e] pt-6">
        <SidebarGroupContent className="px-3.5">
          <SidebarMenu >
            {links[role].map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={isCollapsed ? item.label : undefined}
                  className={cn(
                    "relative w-full h-12 flex items-center rounded-[7px] font-normal transition-all duration-300 group",
                    "text-slate-400 hover:text-white hover:bg-[#2d3a4b]/70",
                    "data-[active=true]:text-white data-[active=true]:bg-[#2d3a4b]"
                  )}
                >
                  <ActiveLink
                    href={item.path}
                    className={cn(
                      "flex items-center justify-center w-full h-full",
                      isCollapsed
                        ? "justify-center"
                        : "justify-start gap-3 pl-4 pr-6"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#00d1b2] rounded-r-full opacity-0 transition-all duration-300",
                        "group-data-[active=true]:opacity-100 group-data-[active=true]:shadow-[4px_0_25px_#00d1b2]"
                      )}
                    />

                    <item.icon className="h-6 w-6 min-w-6 stroke-[1.5] transition-colors duration-300" />

                    {!isCollapsed && (
                      <span className="text-[15px] font-semibold whitespace-nowrap transition-all duration-300">
                        {item.label}
                      </span>
                    )}
                  </ActiveLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}

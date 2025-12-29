import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ActiveLink } from "@/components/active-link";
import { links } from "./layout-data";

export function SidebarLayout() {
  return (
    <Sidebar className="bg-[#0f172a] border-r border-slate-800">
      {/* HEADER */}
      <SidebarHeader className="h-16 flex items-center px-6 text-lg font-semibold">
      
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroupContent className="px-2 ">
          <SidebarMenu className="space-y-1">
            {links.admin.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <ActiveLink
                    href={item.path}
                    className="
                      flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium
                      transition
                      hover:bg-slate-800 hover:text-white
                      data-[active=true]:bg-slate-700
                      data-[active=true]:text-teal-400
                    "
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
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

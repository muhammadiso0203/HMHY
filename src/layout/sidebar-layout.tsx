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
    <Sidebar className="bg-[#0f172a] ">
      {/* HEADER */}
      <SidebarHeader className="h-20 justify-center flex text-white items-center px-6 text-4xl italic font-semibold bg-[#1e2939] border-b border-slate-700">
      HMHY
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="bg-[#1e2939]">
        <SidebarGroupContent className="px-2 py-4">
          <SidebarMenu>
            {links.admin.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <ActiveLink
                    href={item.path}
                    className="
                      flex items-center text-white gap-3 rounded-lg px-4 py-4.5 text-sm font-medium 
                      transition
                      hover:bg-slate-700 hover:text-white 
                      data-[active=true]:bg-slate-700
                      data-[active=true]:text-white
                    "
                  >
                    <item.icon className="h-6 w-6" />
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

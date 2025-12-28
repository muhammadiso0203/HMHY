import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
    <Sidebar className="bg-[#0f172a] text-slate-200 border-r border-slate-800">
      {/* HEADER (logo yo‘q, bo‘sh joy) */}
      <SidebarHeader className="h-16" />

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroupContent className="px-2">
          <SidebarMenu className="space-y-1">
            {links.admin.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <div
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition
                      text-slate-300
                      hover:bg-slate-800 hover:text-white
                      data-[active=true]:bg-slate-700
                      data-[active=true]:text-teal-400"
                  >
                    <ActiveLink href={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </ActiveLink>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}

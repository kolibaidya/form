import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ToolCase,
  ShoppingBasket,
  Smartphone,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="bg-sidebar border-r min-h-screen flex flex-col justify-between">
      <SidebarHeader className="px-4 py-4 flex items-center gap-2 text-xl font-semibold">
        <LayoutDashboard className="h-5 w-5" />
        Dashboard
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <ToolCase />
            Main
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/dashboard/products")}
              >
                <Link
                  to="/dashboard/products"
                  className="flex items-center gap-2"
                >
                  <ShoppingBasket />
                  Products
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/dashboard/phones")}
              >
                <Link
                  to="/dashboard/phones"
                  className="flex items-center gap-2"
                >
                  <Smartphone />
                  Phones
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex items-center gap-2">
        <Settings />
        settings
      </SidebarFooter>
    </Sidebar>
  );
}

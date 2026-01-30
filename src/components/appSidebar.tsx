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
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useSidebarStore } from "@/stores/sidebarStore";

export default function AppSidebar() {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuthStore();
  const { isOpen, closeSidebar } = useSidebarStore();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      ></div>

      <Sidebar
        className={`fixed z-50 h-full w-72 sm:w-64 bg-sidebar border-r transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarHeader className="px-4 py-3 flex items-center gap-2 text-base sm:text-xl font-semibold">
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </SidebarHeader>
        <SidebarContent className="px-2">
          {!isAuthenticated ? (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/login" onClick={closeSidebar}>
                    Login
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/register" onClick={closeSidebar}>
                    Register
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ) : (
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
                      onClick={closeSidebar}
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
                      onClick={closeSidebar}
                    >
                      <Smartphone />
                      Phones
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )}
        </SidebarContent>

        {isAuthenticated && (
          <SidebarFooter className="px-4 py-3 border-t bg-sidebar flex items-center gap-3">
            <LogOut className="h-4 w-4" />
            <button
              onClick={logout}
              className="text-sm sm:text-base font-medium hover:underline"
            >
              Logout
            </button>
          </SidebarFooter>
        )}
      </Sidebar>
    </>
  );
}

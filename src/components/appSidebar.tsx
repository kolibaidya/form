import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ShoppingBasket,
  Smartphone,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function AppSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isProductsActive = pathname.startsWith("/dashboard/products");
  const isPhonesActive = pathname.startsWith("/dashboard/phones");

  return (
    <Sidebar className="border-r border-zinc-200 bg-white">
      <SidebarHeader className="px-4 py-4 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <LayoutDashboard className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <span className="font-semibold text-zinc-900">Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        {!isAuthenticated ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link 
                  to="/login" 
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-zinc-600 transition-all duration-150 ease-out hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  Login
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link 
                  to="/register" 
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-zinc-600 transition-all duration-150 ease-out hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  Register
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarGroup>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/products"
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      isProductsActive 
                        ? "bg-indigo-50 text-indigo-700" 
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                  >
                    <ShoppingBasket className={`h-4 w-4 shrink-0 transition-colors duration-150 ${isProductsActive ? "text-indigo-600" : "text-zinc-400"}`} aria-hidden="true" />
                    <span className="truncate">Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/phones"
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                      isPhonesActive 
                        ? "bg-indigo-50 text-indigo-700" 
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                  >
                    <Smartphone className={`h-4 w-4 shrink-0 transition-colors duration-150 ${isPhonesActive ? "text-indigo-600" : "text-zinc-400"}`} aria-hidden="true" />
                    <span className="truncate">Phones</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      {isAuthenticated && (
        <SidebarFooter className="border-t border-zinc-100 px-3 py-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-zinc-600 transition-all duration-150 ease-out hover:bg-red-50 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
            <span className="truncate">Logout</span>
          </button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

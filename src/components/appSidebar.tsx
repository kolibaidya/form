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

  const menuBaseClasses =
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colours duration-200 hover:bg-slate-200 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400";

  const isProductsActive = pathname.startsWith("/dashboard/products");
  const isPhonesActive = pathname.startsWith("/dashboard/phones");

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5" />
          <span className="font-semibold">Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        {!isAuthenticated ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/login" className={menuBaseClasses}>
                  Login
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/register" className={menuBaseClasses}>
                  Register
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/products"
                    className={`${menuBaseClasses} ${
                      isProductsActive && "bg-slate-200 font-semibold"
                    }`}
                  >
                    <ShoppingBasket className="h-4 w-4" />
                    Products
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/phones"
                    className={`${menuBaseClasses} ${
                      isPhonesActive && "bg-slate-200 font-semibold"
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                    Phones
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      {isAuthenticated && (
        <SidebarFooter className="border-t px-4 py-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-red-100 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

import AppSidebar from "@/components/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <div className="md:hidden sticky top-0 z-50 px-4 py-2 border-b bg-white shadow-sm">
            <SidebarTrigger>
              <Menu className="h-5 w-5 text-gray-700 transition-colors duration-200 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" />
            </SidebarTrigger>
          </div>
          <main className="flex-1 p-6" aria-label="Main content area">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

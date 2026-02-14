import AppSidebar from "@/components/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-50">
        <AppSidebar />
        <div className="flex flex-col flex-1 w-full min-w-0 ">
          <div className="md:hidden sticky top-0 z-50 px-4 py-3 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <SidebarTrigger>
              <Menu className="h-5 w-5 text-zinc-600" />
            </SidebarTrigger>
          </div>
          <main
            className="flex-1 w-full overflow-x-hidden"
            aria-label="Main content area"
          >
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

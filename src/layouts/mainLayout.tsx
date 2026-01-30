import { Outlet } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/appSidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <div className="md:hidden p-2">
          <SidebarTrigger />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

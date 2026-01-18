import { AppSidebar } from "@/components/app-Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
        <AppSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

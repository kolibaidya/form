import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/appSidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="md:hidden p-2">
          <SidebarTrigger />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

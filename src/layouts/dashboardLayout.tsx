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
        <div className="md:hidden sticky top-0 z-50 px-4 py-2 bg-white shadow-sm">
          <SidebarTrigger />
        </div>
        <main
          className="flex-1 p-6 overflow-y-auto"
          aria-label="Dashboard content"
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

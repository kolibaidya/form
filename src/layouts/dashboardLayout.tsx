import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/appSidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-zinc-50">
      <AppSidebar />
      <div className="flex flex-col flex-1 w-full min-w-0 ">
        <Header />
        <div className="md:hidden sticky top-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-zinc-200">
          <SidebarTrigger />
        </div>
        <main
          className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden overflow-y-auto "
          aria-label="Dashboard content"
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

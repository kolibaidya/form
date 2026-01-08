import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-Sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-50 text-foreground">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger className="mb-4 inline-block" />
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}

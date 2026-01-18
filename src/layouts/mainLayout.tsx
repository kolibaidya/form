import Header from "@/components/header";
import Footer from "@/components/footer";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "@/layouts/mainLayout";
import DashboardLayout from "@/layouts/dashboardLayout";
import LoginPage from "@/pages/loginPage";
import RegisterPage from "@/pages/registerPage";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProductPage } from "@/pages/productPage";
import { PhonePage } from "@/pages/phonePage";
import { ProtectedRoute } from "@/routes/protectedRoute";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Navigate to="/register" replace />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="products" replace />} />
                <Route path="products" element={<ProductPage />} />
                <Route path="phones" element={<PhonePage />} />
              </Route>
            </Route>
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

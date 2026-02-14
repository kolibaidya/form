import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/mainLayout";
import DashboardLayout from "@/layouts/dashboardLayout";
import LoginPage from "@/pages/loginPage";
import RegisterPage from "@/pages/registerPage";
import ProtectedRoute from "./routes/protectedRoute";
import { SidebarProvider } from "./components/ui/sidebar";
import { lazy, Suspense } from "react";
import PageLoader from "./components/pageLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const LazyProductPage = lazy(() =>
  import("@/pages/productPage").then((module) => ({
    default: module.ProductPage,
  })),
);
const LazyPhonePage = lazy(() =>
  import("@/pages/phonePage").then((module) => ({ default: module.PhonePage })),
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SidebarProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Navigate to="/register" replace />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="products" replace />} />
                  <Route path="products" element={<LazyProductPage />} />
                  <Route path="phones" element={<LazyPhonePage />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </SidebarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

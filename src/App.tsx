import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainLayout from "@/layouts/mainLayout";
import DashboardLayout from "@/layouts/dashboardLayout";
import LoginPage from "@/pages/loginPage";
import RegisterPage from "@/pages/registerPage";
import { ProductPage } from "@/pages/productPage";
import { PhonePage } from "@/pages/phonePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/register" replace />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="phones" element={<PhonePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

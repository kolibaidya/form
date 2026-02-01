import DashboardLayout from "@/layouts/dashboardLayout";
import LoginPage from "@/pages/loginPage";
import RegisterPage from "@/pages/registerPage";
import { Navigate, Route } from "react-router-dom";

export default function AuthRoutes() {
  return (
    <Route element={<DashboardLayout />}>
      <Route index element={<Navigate to="register" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  );
}

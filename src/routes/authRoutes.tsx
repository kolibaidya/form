import MainLayout from "@/layouts/mainLayout";
import LoginPage from "@/pages/loginPage";
import RegisterPage from "@/pages/registerPage";
import { Navigate, Route } from "react-router";

export default function AuthRoutes() {
  return (
    <Route element={<MainLayout />}>
      <Route index element={<Navigate to="/register" replace />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>
  );
}

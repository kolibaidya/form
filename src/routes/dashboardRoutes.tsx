import DashboardLayout from "@/layouts/dashboardLayout";
import { PhonePage } from "@/pages/phonePage";
import { ProductPage } from "@/pages/productPage";
import { Navigate, Route } from "react-router-dom";

export default function DashboardRoutes() {
  return (
    <Route path="dashboard" element={<DashboardLayout />}>
      <Route index element={<Navigate to="products" replace />} />
      <Route path="products" element={<ProductPage />} />
      <Route path="phones" element={<PhonePage />} />
    </Route>
  );
}

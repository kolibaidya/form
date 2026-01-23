import { PhonePage } from "@/pages/phonePage";
import { ProductPage } from "@/pages/productPage";
import { Navigate, Route } from "react-router";
import ProtectedRoute from "./protectedRoute";

export default function DashboardRoutes() {
  return (
    <Route path="dashboard" element={<ProtectedRoute />}>
      <Route index element={<Navigate to="products" replace />} />
      <Route path="products" element={<ProductPage />} />
      <Route path="phones" element={<PhonePage />} />
    </Route>
  );
}

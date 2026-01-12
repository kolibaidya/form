import { BrowserRouter, Routes } from "react-router-dom";
import AuthRoutes from "./routes/authRoutes";
import DashboardRoutes from "./routes/dashboardRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <AuthRoutes />
        <DashboardRoutes />
      </Routes>
    </BrowserRouter>
  );
}

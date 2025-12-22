import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./features/auth/pages/loginPage";
import RegisterPage from "./features/auth/pages/registerPage";
import { ProductPage } from "./features/products/pages/productPage";
import { PhonePage } from "./pages/phonePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/phones" element={<PhonePage />} />
      </Routes>
    </Router>
  );
}

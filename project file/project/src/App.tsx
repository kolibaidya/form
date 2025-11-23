import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/loginPage";       // Correct import
import RegisterPage from "./pages/registerPage"; // Correct import
import ProductPage from "./pages/productPage";   // Correct import

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </Router>
);
}
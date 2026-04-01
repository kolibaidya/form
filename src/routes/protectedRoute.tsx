import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import PageLoader from "@/components/pageLoader";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  return (
    <>
      {isLoading && <PageLoader />}

      {!isLoading &&
        (isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />)}
    </>
  );
};

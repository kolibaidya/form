import RegisterPage from "@/features/auth/pages/registerPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

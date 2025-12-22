import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});
function DashboardHome() {
  return <div>Dashboard Home Page</div>;
}

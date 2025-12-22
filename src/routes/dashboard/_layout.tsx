import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_layout")({
  component: DashboardLayout,
});
function DashboardLayout() {
  return (
    <>
      <h2>Dashboard Layout</h2>
      <Outlet />
    </>
  );
}

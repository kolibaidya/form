import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div>
      <header>My App Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  ),
});

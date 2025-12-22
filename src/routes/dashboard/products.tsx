import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/products")({
  component: ProductPage,
});
function ProductPage() {
  return <h3>Products page</h3>;
}

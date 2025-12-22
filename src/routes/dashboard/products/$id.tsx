import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/products/$id")({
  component: ProductDetails,
});

function ProductDetails() {
  const { id } = Route.useParams();
  return <p>Product ID: {id}</p>;
}

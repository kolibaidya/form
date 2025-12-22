import { ProductPage } from "@/features/products/pages/productPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/products/")({
  component: ProductPage,
});

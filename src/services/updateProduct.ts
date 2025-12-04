import type { Product } from "@/components/types/product";

export const updateProduct = async (product: Product): Promise<Product> => {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

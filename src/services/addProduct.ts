import type { Product } from "@/components/types/product";

export const addProduct = async (product: Product): Promise<Product> => {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

import type { Product } from "@/models/product";
import type { ProductSchemaType } from "@/schema/productSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const baseUrl = "https://fakestoreapi.com/products";

export const useFetchProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(baseUrl);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });
};

export const useCreateProducts = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductSchemaType) => {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useEditProduct = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: ProductSchemaType;
    }) => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to edit product");
      return res.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

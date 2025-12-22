import type { ProductSchemaType } from "@/features/products/schema/productSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { product } from "../models/product";

const baseUrl = "https://fakestoreapi.com/products";

export const useFetchProducts = () => {
  return useQuery<product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(baseUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });
};

//  fetch single product
export const useFetchProduct = (id: number) =>
  useQuery<product>({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/${id}`);

      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    enabled: Number.isFinite(id),
  });

interface useEditProductProps {
  id: number;
  data: ProductSchemaType;
}

export const useCreateProducts = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductSchemaType) => {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to create product");
      }
      return res.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useEditProduct = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: useEditProductProps) => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          price: data.price,
          category: data.category,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to edit product");
      }
      return res.json();
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["products"],
      });
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
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

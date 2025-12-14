import type { Product } from "@/models/product";
import type { ProductSchemaType } from "@/schema/productSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";

const baseUrl = "https://fakestoreapi.com/products";
export const useFetchProducts = () => {
  return useQuery<Product[]>({
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

interface useEditProductProps {
  id: number;
  data: ProductSchemaType;
}

export const useCreateProducts = (
  setError: UseFormSetError<ProductSchemaType>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
    onSuccess: (newProduct: Product) => {
      QueryClient.setQueriesData<Product[]>({ queryKey: ["products"] }, (old) =>
        old ? [...old, newProduct] : [newProduct]
      );
      setOpen(false);
    },

    onError: (error) => {
      setError("root", {
        type: "server",
        message: (error as Error).message,
      });
    },
  });
};

export const useEditProduct = (
  setError: UseFormSetError<ProductSchemaType>
) => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: useEditProductProps) => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Title: data.title,
          Price: data.price,
          Category: data.category,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to edit product");
      }
    },
    onSuccess: (_, { id, data }) => {
      QueryClient.setQueriesData<Product[]>({ queryKey: ["products"] }, (old) =>
        old?.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
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
    onSuccess: (_, id) => {
      QueryClient.setQueriesData<Product[]>({ queryKey: ["products"] }, (old) =>
        old?.filter((p) => p.id !== id)
      );
    },
  });
};

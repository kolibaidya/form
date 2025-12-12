import type { ProductSchemaType } from "@/schema/productSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";

const baseUrl = "https://fakestoreapi.com";
export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });
};

interface useEditProductProps {
  id: string;
  data: ProductSchemaType;
}

export const useCreateProducts = (
  setError: UseFormSetError<ProductSchemaType>,
  setOpen: (open: boolean) => void
) => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductSchemaType) => {
      const res = await fetch(`${baseUrl}/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          Name: data.name,
          Title: data.title,
          Price: data.price,
          Category: data.category,
          Description: data.description,
        }),
      });
      if (!res.ok) {
        throw new Error("Invalid username or password");
      }
      const result = await res.json();
      localStorage.setItem("token", result.token);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
    },
  });
};

export const useEditProduct = (
  setError: UseFormSetError<ProductSchemaType>
) => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: useEditProductProps) => {
      const res = await fetch(`${baseUrl}/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          Name: data.name,
          Title: data.title,
          Price: data.price,
          Category: data.category,
          Description: data.description,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to edit product");
      }
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
    },
  });
};

export const useDeleteProduct = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${baseUrl}/product/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

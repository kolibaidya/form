import type { PhoneSchemaType } from "@/schema/phoneSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseFormSetError } from "react-hook-form";

const baseUrl = "https://crudcrud.com/api/9a04c33a8e434334856644cbd1dd4710";
export const useFetchPhones = () => {
  return useQuery({
    queryKey: ["phones"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/phone`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });
};

interface useEditPhoneProps {
  id: string;
  data: PhoneSchemaType;
}

export const useCreatePhones = (
  setError: UseFormSetError<PhoneSchemaType>,
  setOpen: (open: boolean) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PhoneSchemaType) => {
      const res = await fetch(`${baseUrl}/phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Brand: data.brand,
          Name: data.name,
          ReleaseDate: data.releaseDate,
        }),
      });
      if (!res.ok) {
        throw new Error("Invalid username or password");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phones"] });
      setOpen(false);
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
    },
  });
};

export const useEditPhone = (setError: UseFormSetError<PhoneSchemaType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: useEditPhoneProps) => {
      const res = await fetch(`${baseUrl}/phone/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Brand: data.brand,
          Name: data.name,
          ReleaseDate: data.releaseDate,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to edit product");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phones"] });
    },
    onError: (error) => {
      setError("root", { type: "server", message: (error as Error).message });
    },
  });
};

export const useDeletePhone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${baseUrl}/phone/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phones"] });
    },
  });
};

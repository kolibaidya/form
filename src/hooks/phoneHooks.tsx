import type { PhoneSchemaType } from "@/schema/phoneSchema";
import type { Phone } from "@/models/phone";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const baseUrl = "http://localhost:3000/api/phones";

export const useFetchPhones = () => {
  return useQuery<Phone[]>({
export const useFetchPhones = () => {
  return useQuery<Phone[]>({
    queryKey: ["phones"],
    queryFn: async () => {
      const res = await fetch(baseUrl);
      if (!res.ok) throw new Error("Failed to fetch phones");
      return res.json();
    },
  });
};
};

export const useCreatePhones = (
  setError: UseFormSetError<PhoneSchemaType>,
  setOpen: (open: boolean) => void,
  reset: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payLoad: PhoneSchemaType) => {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payLoad),
      });
      if (!res.ok) throw new Error("Failed to create phone");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phones"] });
    },
  });
};

export const useEditPhone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PhoneSchemaType }) => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update phone");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["phones"],
      });
    },
  });
};

export const useDeletePhone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete phone");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["phones"],
      });
    },
  });
};

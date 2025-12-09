import axios from "axios";
import type { product } from "@/components/types/product";
import { useQuery } from "@tanstack/react-query";

const baseProductUrl = "https://fakestoreapi.com/products";
export const useFetchProducts = () => {
  return useQuery<product[]>({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await axios.get<product[]>(baseProductUrl);
      return response.data;
    },
  });
};

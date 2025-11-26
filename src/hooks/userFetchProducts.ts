import type { product } from "@/components/types/product";
import { useQuery } from "@tanstack/react-query";

const fetchproducts = async (): Promise<product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data as product[];
};

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchproducts,
  });
};

import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./productKeys";
import { getProducts } from "@/services/getProduct";
import type { Product } from "@/components/types/product";

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: productKeys.all,
    queryFn: getProducts,
  });

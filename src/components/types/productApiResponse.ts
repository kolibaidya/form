import type { Product } from "./product";

export type ProductApiResponse = {
  data: Product[];
  total: number;
};

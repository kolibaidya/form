import type { Product } from "@/components/types/product";

export type DeleteButtonProps = {
  product: Product;
  onDelete?: (product: Product) => void;
};

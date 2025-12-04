import type { Product } from "@/components/types/product";

export type EditButtonProps = {
  product: Product;
  onEdit?: (product: Product) => void;
};

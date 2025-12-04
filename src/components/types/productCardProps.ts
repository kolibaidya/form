import type { Product } from "@/components/types/product";

export type ProductCardProps = {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

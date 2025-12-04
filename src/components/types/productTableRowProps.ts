import type { Product } from "@/components/types/product";

export type ProductTableRowProps = {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

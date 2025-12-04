import type { Product } from "@/components/types/product";

export type productsGridProps = {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

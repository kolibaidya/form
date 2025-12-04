import type { Product } from "@/components/types/product";

export type productActionsProps = {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

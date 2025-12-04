import type { Product } from "@/components/types/product";

export type ProductFeedProps = {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

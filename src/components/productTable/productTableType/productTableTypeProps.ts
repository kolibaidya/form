import type { Product } from "@/components/types/product";

export type ProductTableProps = {
  data: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

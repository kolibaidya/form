import type { Product } from "./product";

export type ProductActions = {
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
};

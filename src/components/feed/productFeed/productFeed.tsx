import { ProductGrid } from "@/components/feed/productFeed/productGrid";
import type { ProductFeedProps } from "../feedTypes.ts/productFeedProps";

export const ProductFeed = ({ onEdit, onDelete }: ProductFeedProps) => {
  return <ProductGrid onEdit={onEdit} onDelete={onDelete} />;
};

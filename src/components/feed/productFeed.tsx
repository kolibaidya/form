import type { Product } from "@/models/product";
import { ProductTable } from "../table/productTable";

interface ProductFeedProps {
  products: Product[];
}

export const ProductFeed = ({ products }: ProductFeedProps) => {
  return <ProductTable products={products} />;
};

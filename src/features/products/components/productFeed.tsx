import { ProductTable } from "@/features/products/components/productTable";
import type { product } from "../models/product";

interface ProductFeedProps {
  products: product[];
}

export const ProductFeed = ({ products }: ProductFeedProps) => {
  return <ProductTable products={products} />;
};

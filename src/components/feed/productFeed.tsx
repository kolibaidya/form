import type { product } from "../models/product";
import { ProductTable } from "../table/productTable";

interface ProductFeedProps {
  products: product[];
}

export const ProductFeed = ({ products }: ProductFeedProps) => {
  return <ProductTable product={products} />;
};

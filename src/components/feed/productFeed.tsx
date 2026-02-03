import type { Product } from "@/models/product";
import ProductCard from "../card/productCard";

interface ProductFeedProps {
  products: Product[];
}

export const ProductFeed = ({ products }: ProductFeedProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

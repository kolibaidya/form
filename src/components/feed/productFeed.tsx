import type { Product } from "@/models/product";
import ProductCard from "../card/productCard";

interface ProductFeedProps {
  products: Product[];
}

export const ProductFeed = ({ products }: ProductFeedProps) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 auto-rows-fr"
      role="list"
      aria-label="Product Feed"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

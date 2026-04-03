import type { Product } from "@/models/product";
import { ProductCard } from "@/components/card/productCard";

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
      {products.length === 0 && (
        <p className="text-sm text-center text-zinc-500 mt-6">
          No products found.
        </p>
      )}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

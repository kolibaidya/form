import type { Product } from "@/models/product";
import ProductCard from "../card/productCard";

interface ProductFeedProps {
  products: Product[];
}

export const ProductFeed = ({ products }: ProductFeedProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

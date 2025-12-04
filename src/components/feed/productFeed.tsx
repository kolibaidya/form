import ProductCard from "@/components/card/productCard";
import type { Product } from "../types/product";

type ProductFeedProps = {
  products: Product[];
};

export default function ProductFeed({ products }: ProductFeedProps) {
  return (
    <div className="flex gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

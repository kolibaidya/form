import type { product } from "@/components/types/product";
import ProductCard from "@/components/card/productCard";

type ProductFeedProps = {
  products: product[];
};

export default function ProductFeed({ products }: ProductFeedProps) {
  return (
    <div className="flex gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

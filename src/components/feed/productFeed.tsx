import ProductCard from "../card/productCard";
import { type product } from "../../models/product";

interface ProductFeedProps {
  products: product[];
}

export default function ProductFeed({ products }: ProductFeedProps) {
  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

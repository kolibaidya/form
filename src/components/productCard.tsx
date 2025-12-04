import type { ProductCardProps } from "./types/productCardProps";
export default function productCard({ product }: ProductCardProps) {
  return (
    <div>
      <h2>{product.name}</h2>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <h4>{product.description}</h4>
      <h2>{product.category}</h2>
    </div>
  );
}

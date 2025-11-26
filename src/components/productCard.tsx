import type { product } from "@/components/types/product";

type productCardprops = {
  product: product;
};

export default function productCard({ product }: productCardprops) {
  return (
    <div key={product.id}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.title} style={{ width: "150px" }} />
      <p>${product.price}</p>
      <h4>{product.description}</h4>
      <h2>{product.category}</h2>
    </div>
  );
}

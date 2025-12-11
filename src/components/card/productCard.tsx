import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { product } from "../../models/product";

interface productCardProps {
  product: product;
}

export default function ProductCard({ product }: productCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>price{product.price}</p>
        <p>{product.description}</p>
        <p>{product.category}</p>
      </CardContent>
    </Card>
  );
}

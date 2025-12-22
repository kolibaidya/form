import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { product } from "../models/product";

interface productCardProps {
  product: product;
}

export default function ProductCard({ product }: productCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>price{product.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{product.category}</p>
      </CardContent>
    </Card>
  );
}

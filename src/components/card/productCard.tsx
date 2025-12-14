import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/models/product";

interface productCardProps {
  product: Product;
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import type { Product } from "@/models/product";
import { useDialog } from "react-dialog-async";
import { EditProductDialog } from "../dialogs/editProductDialog";
import { DeleteProductDialog } from "../dialogs/deleteProductDialog";

interface productCardProps {
  product: Product;
}

export default function ProductCard({ product }: productCardProps) {
  const editProductDialog = useDialog(EditProductDialog);
  const deleteProductDialog = useDialog(DeleteProductDialog);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-sm sm:text-base md:text-lg font-semibold">
          {product.title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-gray-600">
          price: ${product.price}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs sm:text-sm truncate text-gray-700">
          {product.category}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() =>
              editProductDialog.open({
                id: product.id,
                product,
              })
            }
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="flex-1"
            onClick={() =>
              deleteProductDialog.open({
                id: product.id,
              })
            }
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

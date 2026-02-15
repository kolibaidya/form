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
import { Edit, Trash2 } from "lucide-react";

interface productCardProps {
  product: Product;
}

export default function ProductCard({ product }: productCardProps) {
  const editProductDialog = useDialog(EditProductDialog);
  const deleteProductDialog = useDialog(DeleteProductDialog);

  const handleEdit = () => {
    editProductDialog.open({
      id: product.id,
      product,
    });
  };

  const handleDelete = () => {
    deleteProductDialog.open({
      id: product.id,
    });
  };

  return (
    <Card className="rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 group">
      <CardHeader className="space-y-2 pb-2">
        <CardTitle className="text-lg font-semibold text-zinc-900 leading-snug line-clamp-2 tracking-tight">
          {product.title}
        </CardTitle>
        <CardDescription className="text-xl font-bold text-zinc-900 tabular-nums">
          ${product.price.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-6">
        <p className="text-sm text-zinc-500 mb-6 capitalize tracking-wide">
          {product.category}
        </p>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-10 border-zinc-300 text-zinc-700 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-400 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            onClick={handleEdit}
          >
            <Edit
              className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            />
            Edit
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-10 border-red-200 text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={handleDelete}
          >
            <Trash2
              className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

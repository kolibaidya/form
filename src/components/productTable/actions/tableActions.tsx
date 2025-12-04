import type { Product } from "@/components/types/product";
import { EditButton } from "@/components/productTable/buttons/editButton";
import { DeleteButton } from "@/components/productTable/buttons/deleteButton";

type TableActionsProps = {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

export const TableActions = ({
  product,
  onEdit,
  onDelete,
}: TableActionsProps) => (
  <td className="px-4 py-2 flex gap-2">
    {onEdit && <EditButton product={product} onEdit={onEdit} />}
    {onDelete && <DeleteButton product={product} onDelete={onDelete} />}
  </td>
);

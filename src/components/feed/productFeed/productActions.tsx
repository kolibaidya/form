import type { productActionsProps } from "../feedTypes.ts/productActionsProps";

export const ProductActions = ({
  product,
  onEdit,
  onDelete,
}: productActionsProps) => (
  <div className="flex gap-2 mt-2">
    {onEdit && (
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => onEdit(product)}
      >
        Edit
      </button>
    )}
    {onDelete && (
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => onDelete(product)}
      >
        Delete
      </button>
    )}
  </div>
);

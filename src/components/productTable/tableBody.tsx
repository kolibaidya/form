import { TableRow } from "./productTableRow";
import type { ProductTableProps } from "./productTableType/productTableTypeProps";

export const TableBody = ({ data, onEdit, onDelete }: ProductTableProps) => (
  <tbody className="divide-y divide-gray-200">
    {data.map((product, index) => (
      <TableRow
        key={index}
        product={product}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </tbody>
);

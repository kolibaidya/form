import type { product } from "../models/product";
import type { ColumnDef } from "@tanstack/react-table";

export const productTableColumnDefinitions = (): ColumnDef<product>[] => [
  {
    accessorKey: "title",
    header: "Title",
    size: 400,
    minSize: 250,
    cell: ({ row }) => (
      <div className="capitalize truncate max-w-[400px]" title={row.getValue("title")}>
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 150,
    minSize: 100,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">${row.original.price}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 200,
    minSize: 150,
    cell: ({ row }) => (
      <div className="capitalize">{row.original.category}</div>
    ),
  },
];

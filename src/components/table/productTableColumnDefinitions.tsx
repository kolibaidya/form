import type { product } from "../models/product";
import type { ColumnDef } from "@tanstack/react-table";

export const productTableColumnDefinitions = (): ColumnDef<product>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${row.getValue("price")}`,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
];

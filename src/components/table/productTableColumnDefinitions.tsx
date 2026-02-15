import type { Product } from "@/models/product";
import type { ColumnDef } from "@tanstack/react-table";

export const productTableColumnDefinitions = (): ColumnDef<Product>[] => [
  {
    accessorKey: "title",
    header: "Title",
    size: 400,
    minSize: 250,
    cell: ({ row }) => (
      <div className="flex flex-col max-w-[400px]">
        <span
          className="front-medium text-zinc-900 truncate"
          title="{row.original.title}"
        >
          {row.original.title}
        </span>

        <span className="text-xs text-zinc-500 mt-1">
          Product ID: {row.original.id}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 150,
    minSize: 100,
    cell: ({ row }) => (
      <span className="font-semibold text-zinc-900 tabular-nums">
        ${row.original.price}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 200,
    minSize: 150,
    cell: ({ row }) => (
      <div className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 capitalize">
        {row.original.category}
      </div>
    ),
  },
];

import type { Phone } from "@/models/phone";
import type { ColumnDef } from "@tanstack/react-table";

export const phoneTableColumnDefinitions = (): ColumnDef<Phone>[] => [
  {
    accessorKey: "Name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("Name")}</div>,
  },
  {
    accessorKey: "Brand",
    header: "Brand",
  },
  {
    accessorKey: "ReleaseDate",
    header: "Release Date",
    cell: ({ row }) => <div>{row.getValue("ReleaseDate")}</div>,
  },
];

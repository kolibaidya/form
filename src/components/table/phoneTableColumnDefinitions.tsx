import type { Phone } from "@/models/phone";
import type { ColumnDef } from "@tanstack/react-table";

export const phoneTableColumnDefinitions = (): ColumnDef<Phone>[] => [
  {
    accessorKey: "Brand",
    header: "Brand",
    size: 400,
    minSize: 250,
    cell: ({ row }) => {
      const brand = row.getValue("Brand") as string;
      return (
        <div className="capitalize truncate max-w-[400px]" title={brand}>
          {brand}
        </div>
      );
    },
  },
  {
    accessorKey: "Name",
    header: "Name",
    size: 150,
    minSize: 100,
    cell: ({ row }) => {
      const name = row.getValue("Name") as string;
      return <span className="font-medium tabular-nums">{name}</span>;
    },
  },
  {
    accessorKey: "ReleaseDate",
    header: "Release Date",
    size: 200,
    minSize: 150,
    cell: ({ row }) => {
      const data = row.getValue("ReleaseDate") as string;
      return <div className="capitalize">{data}</div>;
    },
  },
];

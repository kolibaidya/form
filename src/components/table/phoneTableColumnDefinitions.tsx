import type { Phone } from "@/models/phone";
import type { ColumnDef } from "@tanstack/react-table";

export const phoneTableColumnDefinitions: ColumnDef<Phone>[] = [
  {
    accessorKey: "Brand",
    header: "Brand",
    size: 400,
    minSize: 250,
    cell: ({ getValue }) => {
      const brand = getValue<string>();
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
    cell: ({ getValue }) => {
      const name = getValue<string>();
      return <span className="font-medium tabular-nums">{name}</span>;
    },
  },
  {
    accessorKey: "ReleaseDate",
    header: "Release Date",
    size: 200,
    minSize: 150,
    cell: ({ getValue }) => {
      const releaseDate = getValue<string>();
      return <div className="capitalize">{releaseDate}</div>;
    },
  },
];

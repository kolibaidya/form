import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { TableActions } from "@/components/productTable/actions/tableActions";
import type { Product } from "@/components/types/product";
import type { ProductTableProps } from "./productTableType/productTableTypeProps";
import { TitleCall } from "./calls/titleCall";
import { CategoryCall } from "./calls/categoryCall";
import { PriceCall } from "./calls/priceCall";
import { DescriptionCall } from "./calls/descriptionCall";

export function ProductTable({ data, onEdit, onDelete }: ProductTableProps) {
  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <TitleCall product={row.original} />,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <CategoryCall product={row.original} />,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => <PriceCall product={row.original} />,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <DescriptionCall product={row.original} />,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <TableActions
            product={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (_row, index) => index.toString(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup, groupIndex) => (
          <TableRow key={groupIndex}>
            {headerGroup.headers.map((header, headerIndex) => (
              <TableHead key={headerIndex}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.getVisibleCells().map((cell, cellIndex) => (
              <TableCell key={cellIndex}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
       
    </Table>
  );
}

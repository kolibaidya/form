import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type VisibilityState,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

export type product = {
  name: string;
  title: string;
  price: number;
  description: string;
  category: string;
};

const data: product[] = [
  {
    name: "laptop",
    title: "Lorem ipsum dolor sit amet.",
    price: 109.95,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "electronics",
  },
  {
    name: "Slim Fit T-Shirts",
    title: "Lorem ipsum dolor sit amet.",
    price: 22.75,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "women's clothing",
  },
  {
    name: "Mens Cotton Jacket",
    title: "Lorem ipsum dolor sit amet.",
    price: 15.23,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "women's clothing",
  },
  {
    name: "Mens Casual Slim Fit",
    title: "Lorem ipsum dolor sit amet.",
    price: 18.95,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "men's clothing",
  },
  {
    name: "Chain Bracelet",
    title: "Lorem ipsum dolor sit amet.",
    price: 22.95,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "men's clothing",
  },
  {
    name: "Solid Gold Petite Micropave",
    title: "Lorem ipsum dolor sit amet.",
    price: 80.65,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "Stainless Steel jewelery",
  },
  {
    name: "White Gold Plated Princess",
    title: "Lorem ipsum dolor sit amet.",
    price: 66.95,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "Stainless Steel jewelery",
  },
  {
    name: "Plated Stainless Steel Double",
    title: "Lorem ipsum dolor sit amet.",
    price: 23.77,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "reliability electronics.",
  },
  {
    name: "External Hard Drive - USB 3.0",
    title: "Lorem ipsum dolor sit amet.",
    price: 12.55,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "reliability electronics.",
  },
  {
    name: "SanDisk SSD PLUS",
    title: "Lorem ipsum dolor sit amet.",
    price: 25.23,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "reliability electronics.",
  },
  {
    name: "Silicon Power",
    title: "Lorem ipsum dolor sit amet.",
    price: 11.22,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "reliability electronics.",
  },
  {
    name: "External Hard Drive",
    title: "Lorem ipsum dolor sit amet.",
    price: 15.0,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "reliability electronics.",
  },
  {
    name: "Acer SB220Q bi 21.5 inches Full HD",
    title: "Lorem ipsum dolor sit amet.",
    price: 23.45,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "reliability electronics.",
  },
  {
    name: "Curved Gaming Monitor",
    title: "Lorem ipsum dolor sit amet.",
    price: 26.78,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "hertz electronics",
  },
  {
    name: "Snowboard Jacket Winter Coats",
    title: "Lorem ipsum dolor sit amet.",
    price: 58.34,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "reduce input lag electronics",
  },
  {
    name: "Faux Leather Moto Biker Jacket",
    title: "Lorem ipsum dolor sit amet.",
    price: 45.98,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "women's clothing",
  },
  {
    name: "Rain Jacket Women",
    title: "Lorem ipsum dolor sit amet.",
    price: 22.54,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "women's clothing",
  },
  {
    name: "MBJ Women's Solid Short",
    title: "Lorem ipsum dolor sit amet.",
    price: 59.3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "women's clothing",
  },
  {
    name: "Opna Women's Short Sleeve Moisture",
    title: "Lorem ipsum dolor sit amet.",
    price: 34.67,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "women's clothing",
  },
  {
    name: "DANVOUY Womens T Shirt Casual Cotton Short",
    title: "Lorem ipsum dolor sit amet.",
    price: 60.25,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, beatae.",
    category: "feminine silhouette and Added Comfort",
  },
];
export const columns: ColumnDef<product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.name)}
            >
              Copy Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product</DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(val) => column.toggleVisibility(!!val)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

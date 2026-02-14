import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useDialog } from "react-dialog-async";
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Phone } from "@/models/phone";
import { EditPhoneDialog } from "../dialogs/EditPhoneDialog";
import { DeletePhoneDialog } from "../dialogs/DeletePhoneDialog";

const phoneTableColumnDefinitions = () => [
  { header: "Brand", accessorKey: "Brand" },
  { header: "Name", accessorKey: "Name" },
  { header: "Release Date", accessorKey: "ReleaseDate" },
];
interface PhoneTableProps {
  phones: Phone[];
}

export const PhoneTable = ({ phones }: PhoneTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const editPhoneDialog = useDialog(EditPhoneDialog);
  const deletePhoneDialog = useDialog(DeletePhoneDialog);

  const table = useReactTable<Phone>({
    data: phones,
    columns: phoneTableColumnDefinitions(),
    autoResetAll: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-zinc-200 bg-zinc-50/50">
        <Input
          placeholder="Filter by brand..."
          value={(table.getColumn("Brand")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Brand")?.setFilterValue(event.target.value)
          }
          className="max-w-sm h-10 border-zinc-300 focus-visible:ring-indigo-500"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-zinc-200 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-12 px-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider bg-zinc-50/50"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
                <TableHead className="h-12 px-4 text-right text-xs font-semibold text-zinc-600 uppercase tracking-wider bg-zinc-50/50">
                  Actions
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={phoneTableColumnDefinitions().length + 1}
                  className="h-32 text-center text-zinc-500"
                >
                  No phones found.
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.original._id}
                className={`border-b border-zinc-100 transition-colors duration-150 ease-out hover:bg-zinc-50/80 ${
                  index % 2 === 0 ? "bg-white" : "bg-zinc-50/30"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 text-sm text-zinc-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-3 text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-150 ease-out cursor-pointer"
                      onClick={() =>
                        editPhoneDialog.open({
                          _id: row.original._id,
                          phone: row.original,
                        })
                      }
                    >
                      <Edit className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-3 text-zinc-600 hover:text-red-600 hover:bg-red-50 transition-all duration-150 ease-out cursor-pointer"
                      onClick={() =>
                        deletePhoneDialog.open({ _id: row.original._id })
                      }
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" aria-hidden="true" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            ;
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-4 py-4 border-t border-zinc-200 bg-zinc-50/50">
        <div className="text-sm text-zinc-500">
          Showing{" "}
          <span className="font-medium text-zinc-900">
            {pagination.pageIndex * pagination.pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-zinc-900">
            {Math.min(
              (pagination.pageIndex + 1) * pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}
          </span>{" "}
          of{" "}
          <span className="font-medium text-zinc-900">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50 cursor-pointer"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50 cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

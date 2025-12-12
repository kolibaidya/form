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
import type { Phone } from "@/models/phone";
import { phoneTableColumnDefinitions } from "./phoneTableColumnDefinitions";
import { CreatePhoneDialog } from "../dialogs/CreatePhoneDialog";
import { useDialog } from "react-dialog-async";
import { DeletePhoneDialog } from "../dialogs/DeletePhoneDialog";
import { EditPhoneDialog } from "../dialogs/EditPhoneDialog";

interface PhoneTableProps {
  phones: Phone[];
}

export const PhoneTable = ({ phones }: PhoneTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const editPhoneDialog = useDialog(EditPhoneDialog);
  const deletePhoneDialog = useDialog(DeletePhoneDialog);

  const table = useReactTable({
    data: phones,
    columns: phoneTableColumnDefinitions(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("Name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <CreatePhoneDialog />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!table.getRowModel().rows?.length && (
              <TableRow>
                <TableCell
                  colSpan={phoneTableColumnDefinitions.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}

            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                <TableCell className="flex space-x-2">
                  <Button
                    onClick={() => {
                      editPhoneDialog.open({
                        id: row.original._id,
                        phone: {
                          brand: row.original.Brand,
                          name: row.original.Name,
                          releaseDate: row.original.ReleaseDate,
                          root: null,
                        },
                      });
                    }}
                  >
                    Edit Phone
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => {
                      deletePhoneDialog.open({ id: row.original._id });
                    }}
                  >
                    Delete Phone
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
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
};

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Filters, pokemonTypes } from "./Filters";
import type { Pokemon, Type } from "@/interfaces";

interface DataTableProps<TValue> {
  columns: ColumnDef<Pokemon, TValue>[];
  data: Pokemon[];
}

export function DataTable<TValue>({ columns, data }: DataTableProps<TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedTypes, setSelectedTypes] = useState<Type[]>([...pokemonTypes]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  useEffect(() => {
    table.getColumn("types")?.setFilterValue(selectedTypes);
  }, [table, selectedTypes]);

  return (
    <div className="w-full overflow-x-auto text-center">
      <Filters selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      <div className="inline-block rounded-md border max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="block space-x-2 py-4">
        <Button title="Previous" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
        <Button title="Next" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
      </div>
    </div>
  );
}

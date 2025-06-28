import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";
import { Column } from "@tanstack/react-table";
import type { Pokemon } from "@/interfaces";

interface SortableHeaderProps {
  label: string;
  column: Column<Pokemon, unknown>;
}

export const SortableHeader = ({ label, column }: SortableHeaderProps) => {
  const isSorted = column.getIsSorted();
  const icon =
    isSorted === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : isSorted === "desc" ? (
      <ArrowDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4" />
    );

  return (
    <button
      onClick={() => column.toggleSorting(isSorted === "asc")}
      className="flex items-center justify-center w-full gap-2 text-sm font-medium cursor-pointer hover:text-gray-500 duration-200"
    >
      {label}
      {icon}
    </button>
  );
};

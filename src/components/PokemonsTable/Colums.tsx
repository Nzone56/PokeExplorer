import type { Pokemon } from "@/interfaces";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/Badge";
import { SortableHeader } from "./SortableHeader";

export const filterFn = (row: Row<Pokemon>, id: string, value: string[]) => {
  const pokemon = row.original;
  const types = pokemon.types.map((type) => type.toLowerCase());
  return types.some((type) => value.includes(type));
};

type OnDetailsClick = (pokemon: Pokemon) => void;

export const getColumns = (onDetailsClick: OnDetailsClick): ColumnDef<Pokemon>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader label="Name" column={column} />,
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-2 min-w-[150px] px-1">
        <span className="capitalize">{row.original.name}</span>
        <span className="text-gray-500">#{row.original.id.toString().padStart(3, "0")}</span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt={row.original.name}
        width={96}
        height={96}
        className="w-16 h-auto max-h-16 object-contain mx-auto"
      />
    ),
  },
  {
    accessorFn: (row) => {
      const [first, second] = row.types;
      return `${first ?? ""}-${second ?? ""}`;
    },
    accessorKey: "types",
    enableColumnFilter: true,
    filterFn,
    header: ({ column }) => <SortableHeader label="Types" column={column} />,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2 flex-wrap min-w-[175px]">
        {row.original.types.map((type, index) => (
          <Badge key={index} type={type} />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "weight",
    header: ({ column }) => <SortableHeader label="Weight" column={column} />,
    cell: ({ row }) => `${row.original.weight / 10} kg`,
  },
  {
    accessorKey: "height",
    header: ({ column }) => <SortableHeader label="Weight" column={column} />,
    cell: ({ row }) => `${row.original.height / 10} m`,
  },
  {
    accessorKey: "base_hp",
    header: ({ column }) => <SortableHeader label="Base health" column={column} />,
  },
  {
    accessorKey: "base_experience",
    header: ({ column }) => <SortableHeader label="Base experience" column={column} />,
  },
  {
    accessorKey: "attack",
    header: ({ column }) => <SortableHeader label="Attack" column={column} />,
  },
  {
    accessorKey: "defense",
    header: ({ column }) => <SortableHeader label="Defense" column={column} />,
  },
  {
    accessorKey: "special_attack",
    header: ({ column }) => <SortableHeader label="Special Attack" column={column} />,
  },
  {
    accessorKey: "special_defense",
    header: ({ column }) => <SortableHeader label="Special Defense" column={column} />,
  },
  {
    accessorKey: "speed",
    header: ({ column }) => <SortableHeader label="Speed" column={column} />,
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => (
      <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => onDetailsClick(row.original)}>
        View Details
      </span>
    ),
  },
];

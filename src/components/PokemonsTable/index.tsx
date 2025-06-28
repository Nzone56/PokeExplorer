"use client";

import { DataTable } from "./DataTable";
import { getColumns } from "./Colums";
import { Pokemon } from "@/interfaces";

type PokemonTableProps = {
  pokemons: Pokemon[];
  handleSelectPokemon: (pokemon: Pokemon) => void;
};
export const PokemonsTable = ({ pokemons, handleSelectPokemon }: PokemonTableProps) => {
  return (
    <div className="container mx-auto p-10">
      <DataTable<unknown> columns={getColumns(handleSelectPokemon)} data={pokemons} />
    </div>
  );
};

import { Pokemon } from "@/interfaces";
import Image from "next/image";
import React from "react";

type PokemonGridProps = {
  pokemons: Pokemon[];
  handleSelectPokemon: (pokemon: Pokemon) => void;
};

export const PokemonsGrid = ({ pokemons, handleSelectPokemon }: PokemonGridProps) => {
  return (
    <div className="w-full p-8 max-w-7xl mx-auto">
      <div className="grid gap-8 p-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(125px, 1fr))" }}>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-gray-800 shadow-md rounded-lg overflow-hidden hover:bg-gray-900 transition-colors duration-300 cursor-pointer p-4"
            onClick={() => handleSelectPokemon(pokemon)}
          >
            <span className="text font-semibold px-2 py-1 rounded">#{pokemon.id}</span>

            <div className="w-full aspect-square">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                className="object-contain p-4 w-full"
                width={96}
                height={96}
              />
            </div>

            <div className="text-center py-2 text-lg font-medium capitalize">{pokemon.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

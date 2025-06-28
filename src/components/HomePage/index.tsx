"use client";
import { Header } from "@/components/Header";
import React, { useMemo, useState } from "react";
import { ArrangePokemonData } from "@/helpers/ArrangePokemonData";
import { useFetch } from "@/hooks/useFetch";
import type { PokeAPIResponse, Pokemon, PokemonData, PokemonPreview } from "@/interfaces";
import { PokemonsTable } from "../PokemonsTable";
import { PokemonsGrid } from "../PokemonsGrid";
import { PokemonModal } from "../PokemonModal";

export const HomePage = () => {
  const [view, setView] = useState("table");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const { data: listData, loading: loadingList } = useFetch<PokeAPIResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const pokemonDetailUrls = useMemo(() => {
    if (!listData) return [];
    return listData.results.map((pokemon: PokemonPreview) => pokemon.url);
  }, [listData]);

  const { data: details, loading: loadingDetails } = useFetch<PokemonData[]>(pokemonDetailUrls);

  const pokemons = useMemo(() => {
    if (!details) return [];
    return details.map(ArrangePokemonData);
  }, [details]);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header view={view} setView={setView} />
      {loadingList || loadingDetails || !pokemons.length ? (
        <div className="text-center text-white text-4xl m-16">Loading...</div>
      ) : view === "table" ? (
        <PokemonsTable pokemons={pokemons} handleSelectPokemon={handleSelectPokemon} />
      ) : (
        <PokemonsGrid pokemons={pokemons} handleSelectPokemon={handleSelectPokemon} />
      )}
      {openModal && selectedPokemon ? (
        <PokemonModal open={openModal} onOpenChange={setOpenModal} pokemon={selectedPokemon} pokemons={pokemons} />
      ) : null}
    </div>
  );
};

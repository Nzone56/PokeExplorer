import type { Pokemon, PokemonData, PokemonType, Type } from "@/interfaces";

export const ArrangePokemonData = (data: PokemonData): Pokemon => {
  const types = data.types.map((type: PokemonType) => type.type.name) as Type[];

  const stats = data.stats.map((stat) => ({
    name: stat.stat.name,
    base_stat: stat.base_stat,
  }));

  return {
    id: data.id,
    image: data.sprites.front_default,
    name: data.name,
    types: types,
    weight: data.weight,
    height: data.height,
    base_experience: data.base_experience,
    base_hp: stats.find((stat) => stat.name === "hp")?.base_stat || 0,
    attack: stats.find((stat) => stat.name === "attack")?.base_stat || 0,
    defense: stats.find((stat) => stat.name === "defense")?.base_stat || 0,
    special_attack: stats.find((stat) => stat.name === "special-attack")?.base_stat || 0,
    special_defense: stats.find((stat) => stat.name === "special-defense")?.base_stat || 0,
    speed: stats.find((stat) => stat.name === "special-defense")?.base_stat || 0,
  };
};

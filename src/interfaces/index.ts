import { pokemonTypes } from "@/components/PokemonsTable/Filters";

export interface PokeAPIResponse {
  count: number;
  next: string;
  previous: null;
  results: PokemonPreview[];
}

export interface PokemonPreview {
  name: string;
  url: string;
}

export type Type = (typeof pokemonTypes)[number];

export interface PokemonType {
  slot: number;
  type: TypeDetails;
}

export interface TypeDetails {
  name: string;
  url: string;
}

export type Stat = "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed";
export type StatKey =
  | "base_hp"
  | "base_experience"
  | "attack"
  | "defense"
  | "special_attack"
  | "special_defense"
  | "speed";

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: StatDetails;
}

export interface StatDetails {
  name: Stat;
  url: string;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
}

export interface PokemonData {
  id: number;
  sprites: PokemonSprites;
  name: string;
  types: PokemonType[];
  weight: number;
  height: number;
  base_experience: number;
  stats: PokemonStat[];
}

export interface Pokemon {
  id: number;
  image: string;
  name: string;
  types: Type[];
  weight: number;
  height: number;
  base_hp: number;
  base_experience: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

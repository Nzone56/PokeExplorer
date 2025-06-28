import type { Type } from "@/interfaces";
import React from "react";

export const typeColors: Record<Type, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const Badge = ({ type }: { type: Type }) => {
  return (
    <span
      className="capitalize inline-flex items-center px-2.5 py-0.5 text-xs xl:px-3 xl:py-1 xl:text-sm rounded-md font-medium"
      style={{ backgroundColor: typeColors[type], color: "#fff" }}
    >
      {type}
    </span>
  );
};

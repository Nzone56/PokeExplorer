import { Type } from "@/interfaces";
import React, { useState } from "react";

export const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

type FiltersProps = {
  selectedTypes: Type[];
  setSelectedTypes: (types: Type[]) => void;
};

export const Filters = ({ selectedTypes, setSelectedTypes }: FiltersProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleType = (pokemonType: Type) => {
    if (selectedTypes.includes(pokemonType)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== pokemonType));
    } else {
      setSelectedTypes([...selectedTypes, pokemonType]);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="relative block max-w-32 mx-auto mb-4 ">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="max-w-32 cursor-pointer inline-flex justify-center w-full rounded-md border text-white border-gray-500 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium hover:bg-gray-900  transition-colors duration-200"
        >
          Filter Types
        </button>
      </div>

      {showDropdown && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 text-white">
          <div className="py-1 max-h-64 overflow-y-auto">
            {pokemonTypes.map((type) => (
              <label
                key={type}
                className="capitalize flex items-center px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-950 "
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/Badge";
import { Pokemon, StatKey } from "@/interfaces";

type ModalProps = {
  pokemon: Pokemon;
  pokemons: Pokemon[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const statsDiccionary: Record<string, StatKey> = {
  "Base Health": "base_hp",
  "Base XP": "base_experience",
  Attack: "attack",
  Defense: "defense",
  "Sp. Atk": "special_attack",
  "Sp. Def": "special_defense",
  Speed: "speed",
};

export const PokemonModal = ({ pokemon, open, onOpenChange, pokemons }: ModalProps) => {
  const getStatColor = (value: number, stat: StatKey) => {
    const averageStatValue = pokemons.reduce((acc, p) => acc + p[stat], 0) / pokemons.length;
    if (value > averageStatValue) return "text-green-500";
    if (value < averageStatValue) return "text-red-500";
    return "text-white";
  };

  const Stat = ({ label, value }: { label: string; value: number | string }) => (
    <div className="flex flex-col items-center bg-muted/40 p-2 rounded-md">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span
        className={`font-semibold v ${
          label === "Height" || label === "Weight" ? "text-white" : getStatColor(Number(value), statsDiccionary[label])
        }`}
      >
        {value}
      </span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-xl rounded-2xl p-6">
        <DialogHeader className="mb-4 text-center">
          <DialogTitle className="text-2xl font-bold capitalize flex items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <span className="capitalize">{pokemon.name}</span>
              <span className="text-muted-foreground text-sm leading-none">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={150}
            height={150}
            className="rounded-full border border-muted shadow-md"
          />

          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <Badge key={type} type={type} />
            ))}
          </div>

          <div className={`grid grid-cols-2 gap-4 w-full text-sm mt-4`}>
            <Stat label="Height" value={`${pokemon.height / 10} m`} />
            <Stat label="Weight" value={`${pokemon.weight / 10} kg`} />
            <Stat label="Base Health" value={pokemon.base_hp} />
            <Stat label="Base XP" value={pokemon.base_experience} />
            <Stat label="Attack" value={pokemon.attack} />
            <Stat label="Defense" value={pokemon.defense} />
            <Stat label="Sp. Atk" value={pokemon.special_attack} />
            <Stat label="Sp. Def" value={pokemon.special_defense} />
            <Stat label="Speed" value={pokemon.speed} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

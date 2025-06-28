import React from "react";

type HeaderProps = { view: string; setView: (view: string) => void };

export const Header = ({ view, setView }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full py-4 px-8 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Poke Explorer</h1>
      <div className="flex overflow-hidden border border-gray-600 rounded-xl">
        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 transition-colors cursor-pointer ${
            view === "table" ? "bg-color-background text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Table
        </button>
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-2 transition-colors cursor-pointer ${
            view === "grid" ? "bg-color-background text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          Grid
        </button>
      </div>
    </div>
  );
};

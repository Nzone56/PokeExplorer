import React from "react";
type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({ title, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className="px-4 py-2 border-2 border-gray-500 hover:gray-700 bg-transparent text-gray-200 rounded cursor-pointer hover:text-white transition-colors duration-200 disabled:text-muted disabled:cursor-not-allowed disabled:border-muted"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

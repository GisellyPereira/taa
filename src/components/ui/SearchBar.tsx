"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { FormEvent } from "react";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export function SearchBar({
  placeholder = "Buscar",
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(value ?? "");
  }

  return (
    <form
      className="flex items-center gap-2 h-[33px] min-w-[134px] px-4 rounded-[var(--radius-sm)] bg-primary text-text-inverse transition focus-within:shadow-[0_0_0_2px_var(--color-accent)]"
      role="search"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="grid place-items-center text-text-inverse"
        aria-label="Buscar"
      >
        <MagnifyingGlassIcon size={16} />
      </button>
      <input
        type="search"
        className="flex-1 w-full bg-transparent border-none outline-none text-text-inverse text-xs placeholder:text-text-inverse placeholder:opacity-[0.85] [&::-webkit-search-cancel-button]:appearance-none"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </form>
  );
}

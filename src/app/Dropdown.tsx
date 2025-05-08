import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { PokeballIcon } from "./icons/pokeball";
import { ALL_POKEMON, Pokemon, PokeDrinkData } from "./constants";
import Image from "next/image";

const NO_RESULTS = "No results 😔";
const NO_POKEMON = [{ id: 0, name: NO_RESULTS }]

function displayName(p: Pokemon) {
  if (!p) return "";

  if (p.name === NO_RESULTS) return p.name;

  const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);
  return p.id + ": " + name;
}

export default function Dropdown({selectedPokemon, setSelectedPokemon}: {selectedPokemon: Pokemon, setSelectedPokemon: (p: Pokemon) => void}) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? ALL_POKEMON
      : ALL_POKEMON.filter((p) => {
          return (
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.id.toString().includes(query) ||
            displayName(p).toLowerCase().includes(query.toLowerCase())
          );
        });

  return (
    <div className="flex">
      <Combobox
        value={selectedPokemon}
        virtual={
          filtered.length > 0
            ? { options: filtered }
            : { options: NO_POKEMON }
        }
        onChange={(value) => {
          if (value !== null) {
            setSelectedPokemon(value);
          }
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full border-gray-700 border-2 rounded-lg py-1.5 pr-8 pl-3 text-black text-5xl text-shadow-3d-yellow",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-none bg-white"
            )}
            displayValue={(p: Pokemon) => {
              if (!p) return "";
              return displayName(p);
            }}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 cursor-pointer">
            <Image
              src="/down_arrow.png"
              alt="chevron down"
              width={24}
              height={24}
              />
            
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-(--input-width) pixel-corners border border-black/5 bg-white p-1 [--anchor-gap:--spacing(1)] empty:invisible",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0 h-60 overflow-y-auto drop-shadow-2xl font-pixel text-3xl"
          )}
        >
          {({ option: p }) => (
            <ComboboxOption
              disabled={p.name === NO_RESULTS}
              value={p}
              className={
                p.name == NO_RESULTS
                  ? `w-full h-full flex justify-center items-center cursor-default py-2 -ml-4`
                  : `group w-full flex cursor-pointer items-center pixel-corners pl-2 py-1.5 select-none data-focus:bg-black/10`
              }
            >
              <PokeballIcon className="invisible size-7 pr-1 group-data-selected:visible" />
              <span>{displayName(p)}</span>
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

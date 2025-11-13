import React from "react";
import { Dropdown } from "../common/Dropdown";

interface CharacterFiltersProps {
  characters: any[];
  selectedHomeworld: string;
  setSelectedHomeworld: (value: string) => void;
  selectedSpecies: string;
  setSelectedSpecies: (value: string) => void;
  selectedFilm: string;
  setSelectedFilm: (value: string) => void;
}

export const CharacterFilters: React.FC<CharacterFiltersProps> = ({
  characters,
  selectedHomeworld,
  setSelectedHomeworld,
  selectedSpecies,
  setSelectedSpecies,
  selectedFilm,
  setSelectedFilm,
}) => {
  const homeworlds = Array.from(
    new Set(characters.map((c) => c.homeworld?.name))
  ).filter(Boolean);

  const species = Array.from(new Set(characters.map((c) => c.species))).filter(
    Boolean
  );

  const films = Array.from(
    new Set(characters.flatMap((c) => c.films || []))
  ).filter(Boolean);

  const filters = [
    {
      label: "Homeworld",
      options: homeworlds,
      value: selectedHomeworld,
      onChange: setSelectedHomeworld,
      allLabel: "All Homeworlds",
    },
    {
      label: "Species",
      options: species,
      value: selectedSpecies,
      onChange: setSelectedSpecies,
      allLabel: "All Species",
    },
    {
      label: "Films",
      options: films,
      value: selectedFilm,
      onChange: setSelectedFilm,
      allLabel: "All Films",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {filters.map((filter) => (
        <Dropdown
          key={filter.label}
          label={filter.label}
          options={filter.options}
          value={filter.value}
          onChange={filter.onChange}
          allLabel={filter.allLabel}
        />
      ))}
    </div>
  );
};

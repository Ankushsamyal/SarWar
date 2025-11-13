import React from "react";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <select
          value={selectedHomeworld}
          onChange={(e) => setSelectedHomeworld(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 rounded"
        >
          <option value="all">All Homeworlds</option>
          {homeworlds.map((hw) => (
            <option key={hw} value={hw}>
              {hw}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={selectedSpecies}
          onChange={(e) => setSelectedSpecies(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 rounded"
        >
          <option value="all">All Species</option>
          {species.map((sp) => (
            <option key={sp} value={sp}>
              {sp}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={selectedFilm}
          onChange={(e) => setSelectedFilm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 rounded"
        >
          <option value="all">All Films</option>
          {films.map((film) => (
            <option key={film} value={film}>
              {film}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

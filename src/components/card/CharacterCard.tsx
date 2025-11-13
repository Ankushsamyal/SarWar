import { useState } from "react";
import { CharacterModal } from "./CharacterModel";
import { Character } from "../../types/Character";
import { getBgColorBySpecies, getCharacterImageByName } from "../../utils";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ${getBgColorBySpecies(
          character.species
        )}`}
      >
        <div className="aspect-[1.5/2] overflow-hidden">
          <img
            src={getCharacterImageByName(character.name)}
            alt={character.name}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-white">{character.name}</h3>
            <span className="text-xl">✓</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            {character.species}
          </p>

          <div className="flex items-center gap-8 pt-4 border-t border-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">👤</span>
              <span className="text-white font-semibold">
                {character.gender}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">📋</span>
              <span className="text-white font-semibold">
                {character.mass} kg
              </span>
            </div>
          </div>
        </div>
      </div>

      <CharacterModal
        character={character}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

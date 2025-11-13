import { Character } from "../../types/Character";
import { getBgColorBySpecies, getCharacterImageByName } from "../../utils";

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterModal({
  character,
  isOpen,
  onClose,
}: CharacterModalProps) {
  if (!isOpen || !character) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-start md:items-center justify-center p-4">
        <div
          className={`rounded-2xl p-6 max-w-4xl w-full mx-4 bg-gray-900 flex flex-col md:flex-row gap-6 ${getBgColorBySpecies(
            character.species
          )}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="md:w-1/3 flex-shrink-0">
            <img
              src={getCharacterImageByName(character.name)}
              alt={character.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="md:w-2/3 flex flex-col space-y-4">
            <div className="flex-grow">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {character.name}
              </h2>
              <p className="text-yellow-400 font-semibold">
                <span className="text-white-400 text-xs uppercase mr-1">
                  Height:
                </span>
                {character.height}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="text-white-400 text-xs uppercase mr-1">
                  Species:
                </span>
                {character.species}
              </p>

              <div className="flex flex-col sm:flex-row gap-8 mt-4 text-sm leading-relaxed">
                {/* List of Films */}
                <div className="w-full sm:w-1/2">
                  <span className="text-red-300 text-xs uppercase font-semibold">
                    List of Films:
                  </span>
                  <div className="flex flex-col mt-1 space-y-1">
                    {character.films.map((film: string, index: number) => (
                      <span
                        className="text-gray-400 transition-colors"
                        key={index}
                      >
                        {film}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Homeworld Details */}
                <div className="w-full sm:w-1/2">
                  <span className="text-blue-300 text-xs uppercase font-semibold">
                    Homeworld Details:
                  </span>
                  <div className="flex flex-col mt-1 space-y-1 text-gray-300">
                    <span>
                      <strong>Name:</strong> {character.homeworld.name}
                    </span>
                    <span>
                      <strong>Terrain:</strong> {character.homeworld.terrain}
                    </span>
                    <span>
                      <strong>Climate:</strong> {character.homeworld.climate}
                    </span>
                    <span>
                      <strong>Population:</strong>{" "}
                      {character.homeworld.population}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-xs uppercase">Birth Year</p>
                  <p className="text-2xl font-bold text-white">
                    {character.birth_year}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-xs uppercase">Date Added</p>
                  <p className="text-2xl font-bold text-white">
                    {character.created}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-auto w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

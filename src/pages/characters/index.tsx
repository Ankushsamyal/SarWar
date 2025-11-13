import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchCharacters } from "../../store/slice/charactersSlice";
import { SearchBar } from "../../components/search/searchTextfield";
import { Pagination } from "../../components/Pagination";
import { CharacterCard } from "../../components/card/CharacterCard";
import ErrorPage from "../error";
import { API_FAILED } from "../../constant/appConstant";
import { CharactersPageSkeleton } from "../../components/card/CharacterCardSkeleton";

const ITEMS_PER_PAGE = 8;

export function CharactersPage() {
  const dispatch = useAppDispatch();
  const { characters, error, loading } = useAppSelector(
    (state) => state.characters
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const filteredCharacters = useMemo(() => {
    return characters.filter((char: any) =>
      char.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [characters, searchQuery]);

  const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCharacters = filteredCharacters.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (error) {
    return <ErrorPage error={API_FAILED} />;
  }
  if (loading) {
    return <CharactersPageSkeleton />;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold">Star Wars Characters</h1>
          <p className="text-gray-400 text-lg">
            Explore the iconic characters of the Star Wars universe
          </p>
        </div>

        {/* Search bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <>
          {paginatedCharacters.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No characters found
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedCharacters.map((character: any) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center pt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </>
      </div>
    </main>
  );
}

export default CharactersPage;

export function CharacterCardSkeleton() {
  return (
    <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-xl animate-pulse bg-gray-800">
      {/* Image placeholder */}
      <div className="aspect-[1.5/2] bg-gray-700 rounded-3xl" />

      <div className="p-6 space-y-4">
        {/* Name placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-32 bg-gray-600 rounded" />
          <div className="h-5 w-5 bg-gray-600 rounded-full" />
        </div>

        {/* Species placeholder */}
        <div className="h-4 w-20 bg-gray-600 rounded" />

        {/* Divider */}
        <div className="border-t border-gray-700 pt-4 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-600 rounded-full" />
            <div className="h-4 w-16 bg-gray-600 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-600 rounded-full" />
            <div className="h-4 w-16 bg-gray-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const CharactersPageSkeleton: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="text-center space-y-3">
          <div className="h-10 w-2/3 bg-gray-800 rounded mx-auto" />
          <div className="h-4 w-1/2 bg-gray-800 rounded mx-auto" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="max-w-md mx-auto">
          <div className="h-12 bg-gray-800 rounded-md" />
        </div>

        {/* Character Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-lg border border-gray-800 space-y-4"
            >
              <div className="h-48 w-full bg-gray-800 rounded" />
              <div className="h-4 w-3/4 bg-gray-800 rounded" />
              <div className="h-4 w-1/2 bg-gray-800 rounded" />
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center pt-8 space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-8 w-8 bg-gray-800 rounded-md" />
          ))}
        </div>
      </div>
    </main>
  );
};

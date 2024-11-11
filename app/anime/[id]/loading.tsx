export default function AnimeLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side Skeleton */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="aspect-[2/3] bg-gray-200 rounded-lg animate-pulse" />
          <div className="mt-6 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Right Side Skeleton */}
        <div className="md:w-2/3 lg:w-3/4">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4" />
          
          <div className="flex flex-wrap gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>

          <div className="space-y-2 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 
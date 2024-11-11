export default function SearchLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-[2/3] bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    </main>
  );
} 
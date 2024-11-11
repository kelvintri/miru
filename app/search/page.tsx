import { searchAnime } from '@/app/lib/jikan'
import AnimeCard from '@/app/components/anime-card'
import { AnimeResponse } from '../types';

interface SearchPageProps {
  searchParams: { q: string; page?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page = '1' } = searchParams
  const { data } = await searchAnime(q, parseInt(page))

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: {q}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((anime: AnimeResponse, index: number) => (
          <AnimeCard 
            key={`${anime.mal_id}-${index}`} 
            anime={{
              ...anime,
              year: anime.year ?? 0
            }} 
          />
        ))}
      </div>

      {(!data || data.length === 0) && (
        <p className="text-center text-gray-500 mt-8">
          No results found for "{q}"
        </p>
      )}
    </main>
  )
}

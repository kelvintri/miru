import Link from 'next/link'
import AnimeCard from './anime-card'
import { type AnimeResponse } from '@/app/types/index'

interface AnimeSectionProps {
  title: string
  viewAllLink?: string
  anime: AnimeResponse[] | undefined
  layout?: 'grid' | 'list'
}

export default function AnimeSection({ 
  title, 
  viewAllLink, 
  anime = [], 
  layout = 'grid' 
}: AnimeSectionProps) {
  if (!anime || anime.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {viewAllLink && (
          <Link 
            href={viewAllLink}
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        )}
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {anime.map((item, index) => (
            <AnimeCard 
              key={item.mal_id} 
              anime={{
                ...item,
                year: item.year ?? 0  // Provide fallback value when year is undefined
              }} 
              priority={index === 0}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {anime.map((item, index) => (
            <Link 
              key={item.mal_id}
              href={`/anime/${item.mal_id}`}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50"
            >
              <span className="text-2xl font-bold text-gray-400 w-8">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Score: {item.score} • {item.members?.toLocaleString()} members
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
} 
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'

interface AnimeCardProps {
  anime: {
    mal_id: number
    title: string
    images: {
      webp: {
        image_url: string
      }
    }
    score: number
    year: number
  }
  priority?: boolean
}

export default function AnimeCard({ anime, priority = false }: AnimeCardProps) {
  return (
    <Link 
      href={`/anime/${anime.mal_id}`}
      className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105"
    >
      <div className="aspect-[2/3] relative">
        <Image
          src={anime.images.webp.image_url}
          alt={anime.title}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-4 text-white h-full flex flex-col justify-center items-center text-center">
            <h3 className="font-semibold line-clamp-2 mb-2">{anime.title}</h3>
            <div className="flex items-center gap-2">
              {anime.score > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-sm">{anime.score.toFixed(1)}</span>
                </div>
              )}
              {anime.year > 0 && (
                <span className="text-sm text-gray-300">({anime.year})</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
          <h3 className="text-white text-sm text-center line-clamp-1">
            {anime.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}

import { getAnimeById } from '@/app/lib/jikan';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Calendar, Clock, Play } from 'lucide-react';

export const revalidate = 86400; // 24 hours

interface AnimePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnimePage({ params }: AnimePageProps) {
  const { id } = await params;
  
  try {
    const { data: anime } = await getAnimeById(parseInt(id));

    if (!anime) {
      notFound();
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Cover Image */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
              <Image
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Anime Stats */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Score: {anime.score || 'N/A'}</span>
                {anime.scored_by && (
                  <span className="text-gray-500 text-sm">
                    ({anime.scored_by.toLocaleString()} votes)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>{anime.season} {anime.year || 'TBA'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{anime.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-gray-500" />
                <span>{anime.status}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Anime Details */}
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <h2 className="text-xl text-gray-500 mb-4">{anime.title_english}</h2>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres?.map((genre: { mal_id: number; name: string }) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {anime.synopsis || 'No synopsis available.'}
              </p>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Studios */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Studios</h3>
                <div className="space-y-1">
                  {anime.studios?.map((studio: { mal_id: number; name: string }) => (
                    <div key={studio.mal_id}>{studio.name}</div>
                  ))}
                </div>
              </div>

              {/* Information */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Information</h3>
                <div className="space-y-2">
                  <div>Episodes: {anime.episodes || 'TBA'}</div>
                  <div>Source: {anime.source}</div>
                  <div>Rating: {anime.rating}</div>
                  {anime.broadcast?.day && anime.broadcast?.time && (
                    <div>
                      Broadcast: {anime.broadcast.day} at {anime.broadcast.time} (JST)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching anime:', error);
    notFound();
  }
} 
import { getAnimeById, getAnimeCharacters, getAnimeStaff, getAnimeRecommendations } from '@/app/lib/jikan';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { AnimeResponse } from '@/app/types';
import CharacterCard from '@/app/components/character-card';
import StaffCard from '@/app/components/staff-card';
import AnimeCard from '@/app/components/anime-card';

export const revalidate = 86400; // 24 hours

interface AnimePageProps {
  params: {
    id: string;
  };
}

export default async function AnimePage({ params }: AnimePageProps) {
  const { id } = params;
  
  try {
    const [
      { data: anime },
      { data: characters },
      { data: staff },
      { data: recommendations }
    ] = await Promise.all([
      getAnimeById(parseInt(id)),
      getAnimeCharacters(parseInt(id)),
      getAnimeStaff(parseInt(id)),
      getAnimeRecommendations(parseInt(id))
    ]);

    if (!anime) {
      notFound();
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Cover Image & Info */}
          <div className="md:w-1/3 lg:w-1/4 space-y-6">
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

            {/* Information List */}
            <div className="space-y-4">
              <InfoItem label="Format" value={anime.type} />
              <InfoItem label="Episodes" value={anime.episodes?.toString() || 'N/A'} />
              <InfoItem label="Episode Duration" value={anime.duration} />
              <InfoItem label="Status" value={anime.status} />
              <InfoItem 
                label="Start Date" 
                value={formatDate(anime.aired.prop.from)} 
              />
              <InfoItem 
                label="End Date" 
                value={formatDate(anime.aired.prop.to)} 
              />
              <InfoItem 
                label="Season" 
                value={anime.season && anime.year ? `${capitalize(anime.season)} ${anime.year}` : 'N/A'} 
              />
              <InfoItem 
                label="Average Score" 
                value={anime.score ? `${(anime.score * 10).toFixed(0)}%` : 'N/A'} 
              />
              <InfoItem 
                label="Scored By" 
                value={formatNumber(anime.scored_by)} 
              />
              <InfoItem 
                label="Rank" 
                value={anime.rank ? `#${anime.rank}` : 'N/A'} 
              />
              <InfoItem 
                label="Popularity" 
                value={`#${anime.popularity}`} 
              />
              <InfoItem 
                label="Members" 
                value={formatNumber(anime.members)} 
              />
              <InfoItem 
                label="Favorites" 
                value={formatNumber(anime.favorites)} 
              />
              <InfoItem label="Source" value={anime.source} />
              <InfoItem 
                label="Studios" 
                value={anime.studios.map(studio => studio.name).join(', ') || 'N/A'} 
              />
              <InfoItem label="Rating" value={anime.rating} />
            </div>
          </div>

          {/* Right Side - Title, Genres, Synopsis */}
          <div className="md:w-2/3 lg:w-3/4">
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <h2 className="text-xl text-muted-foreground mb-4">{anime.title_english}</h2>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
              <p className="leading-relaxed whitespace-pre-line">
                {anime.synopsis || 'No synopsis available.'}
              </p>
            </div>

            <div className="space-y-12 mt-12">
              {/* Characters Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-6">Characters & Voice Actors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {characters?.slice(0, 6).map((character) => (
                    <CharacterCard key={character.character.mal_id} character={character} />
                  ))}
                </div>
              </section>

              {/* Staff Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-6">Staff</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staff?.slice(0, 4).map((person) => (
                    <StaffCard key={person.person.mal_id} staff={person} />
                  ))}
                </div>
              </section>

              {/* Recommendations Section */}
              <section>
                <h3 className="text-2xl font-semibold mb-6">Recommendations</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {recommendations?.slice(0, 12).map((rec) => (
                    <AnimeCard 
                      key={rec.entry.mal_id} 
                      anime={{
                        mal_id: rec.entry.mal_id,
                        title: rec.entry.title,
                        images: rec.entry.images,
                        score: 0,
                        year: 0
                      }} 
                    />
                  ))}
                </div>
              </section>
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

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="space-y-1">
      <h4 className="text-muted-foreground">{label}</h4>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function formatDate(date: { year: number; month: number; day: number } | null): string {
  if (!date || !date.year) return 'N/A';
  return new Date(date.year, date.month - 1, date.day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
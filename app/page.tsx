import { 
  getTrendingAnime, 
  getPopularAnime, 
  getUpcomingAnime, 
  getAllTimePopular 
} from '@/app/lib/jikan';
import SearchBar from '@/app/components/search-bar';
import AnimeSection from '@/app/components/anime-section';

export const revalidate = 1800;

export default async function Home() {
  try {
    const [
      trendingResponse,
      popularResponse,
      upcomingResponse,
      allTimeResponse
    ] = await Promise.allSettled([
      getTrendingAnime(),
      getPopularAnime(),
      getUpcomingAnime(),
      getAllTimePopular()
    ]);

    // Helper function to safely get data from responses
    const getResponseData = (response: PromiseSettledResult<any>) => {
      if (response.status === 'fulfilled') {
        return response.value?.data ?? [];
      }
      console.error('Failed to fetch:', response.status === 'rejected' ? response.reason : 'Unknown error');
      return [];
    };

    return (
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to MIRU</h1>
          <SearchBar />
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <AnimeSection 
              title="Trending Now" 
              viewAllLink="/trending"
              anime={getResponseData(trendingResponse)} 
            />
            
            <AnimeSection 
              title="Popular This Season" 
              viewAllLink="/popular"
              anime={getResponseData(popularResponse)} 
            />
            
            <AnimeSection 
              title="Upcoming Next Season" 
              viewAllLink="/upcoming"
              anime={getResponseData(upcomingResponse)} 
            />
          </div>

          <div className="lg:w-1/4">
            <AnimeSection 
              title="All Time Popular" 
              viewAllLink="/top-anime"
              anime={getResponseData(allTimeResponse)}
              layout="list"
            />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Home page error:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to MIRU</h1>
          <SearchBar />
        </section>
        <div className="text-center text-gray-500 py-12">
          Unable to load anime data. Please try again later.
        </div>
      </main>
    );
  }
}

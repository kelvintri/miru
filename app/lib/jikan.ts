const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: { revalidate?: number } = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        next: {
          revalidate: options.revalidate ?? 3600
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait longer between each retry (1s, 2s, 3s)
      await delay((i + 1) * 1000);
    }
  }
}

export async function searchAnime(query: string, page: number = 1) {
  try {
    const response = await fetch(
      `${JIKAN_API_BASE}/anime?q=${query}&page=${page}&sfw=true`,
      { cache: 'no-store' }
    );
    return response.json();
  } catch (error) {
    console.error('Search anime error:', error);
    return { data: [] };
  }
}

export async function getTrendingAnime(limit: number = 6) {
  return fetchWithRetry(
    `${JIKAN_API_BASE}/top/anime?filter=airing&limit=${limit}`,
    { revalidate: 1800 }
  );
}

export async function getPopularAnime(limit: number = 6) {
  return fetchWithRetry(
    `${JIKAN_API_BASE}/seasons/now?limit=${limit}`,
    { revalidate: 3600 }
  );
}

export async function getUpcomingAnime(limit: number = 6) {
  return fetchWithRetry(
    `${JIKAN_API_BASE}/top/anime?filter=upcoming&limit=${limit}`,
    { revalidate: 86400 }
  );
}

export async function getAllTimePopular(limit: number = 10) {
  return fetchWithRetry(
    `${JIKAN_API_BASE}/top/anime?filter=favorite&limit=${limit}`,
    { revalidate: 86400 }
  );
}

export async function getAnimeById(id: number) {
  return fetchWithRetry(
    `${JIKAN_API_BASE}/anime/${id}/full`,
    { revalidate: 86400 }
  );
}
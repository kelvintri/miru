export interface AnimeResponse {
  mal_id: number
  title: string
  images: {
    webp: {
      image_url: string
      small_image_url: string
    }
  }
  score: number
  year?: number
  members?: number
} 
'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { searchAnime } from '@/app/lib/jikan'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 3) {
        setIsLoading(true)
        try {
          const { data } = await searchAnime(query)
          setResults(data.slice(0, 5))
          setShowResults(true)
        } catch (error) {
          console.error('Error searching anime:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setShowResults(false)
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search for an anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-background rounded-lg shadow-lg border">
          {results.map((anime) => (
            <Link
              key={anime.mal_id}
              href={`/anime/${anime.mal_id}`}
              className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
              onClick={() => setShowResults(false)}
            >
              <Image
                src={anime.images.webp.small_image_url}
                alt={anime.title}
                width={40}
                height={60}
                className="rounded object-cover"
              />
              <div>
                <h4 className="font-medium line-clamp-1">{anime.title}</h4>
                {anime.year && (
                  <p className="text-sm text-muted-foreground">{anime.year}</p>
                )}
              </div>
            </Link>
          ))}
          
          {query.length >= 3 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="block p-3 text-center text-sm text-primary hover:bg-muted transition-colors border-t"
              onClick={() => setShowResults(false)}
            >
              View all results
            </Link>
          )}
        </div>
      )}
    </div>
  )
} 
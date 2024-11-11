import Image from 'next/image'
import Link from 'next/link'
import { Character } from '@/app/types'

export default function CharacterCard({ character }: { character: Character }) {
  const japaneseVA = character.voice_actors.find(va => va.language === 'Japanese');

  return (
    <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border">
      {/* Character Side */}
      <div className="flex gap-3 flex-1">
        <div className="aspect-[3/4] relative w-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={character.character.images.webp.image_url}
            alt={character.character.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <Link 
            href={`/character/${character.character.mal_id}`}
            className="font-medium hover:underline"
          >
            {character.character.name}
          </Link>
          <p className="text-sm text-muted-foreground">{character.role}</p>
        </div>
      </div>

      {/* Voice Actor Side */}
      {japaneseVA && (
        <div className="flex gap-3 flex-1 justify-end text-right">
          <div>
            <Link 
              href={`/people/${japaneseVA.person.mal_id}`}
              className="font-medium hover:underline"
            >
              {japaneseVA.person.name}
            </Link>
            <p className="text-sm text-muted-foreground">Japanese</p>
          </div>
          <div className="aspect-[3/4] relative w-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={japaneseVA.person.images?.jpg.image_url || ''}
              alt={japaneseVA.person.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        </div>
      )}
    </div>
  )
} 
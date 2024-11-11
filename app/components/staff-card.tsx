import Image from 'next/image'
import Link from 'next/link'
import { Staff } from '@/app/types'

export default function StaffCard({ staff }: { staff: Staff }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border">
      {/* Staff Member Side */}
      <div className="flex gap-3 flex-1">
        <div className="aspect-[3/4] relative w-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={staff.person.images.jpg.image_url}
            alt={staff.person.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <Link 
            href={`/people/${staff.person.mal_id}`}
            className="font-medium hover:underline"
          >
            {staff.person.name}
          </Link>
          <p className="text-sm text-muted-foreground">{staff.positions[0]}</p>
        </div>
      </div>
    </div>
  )
} 
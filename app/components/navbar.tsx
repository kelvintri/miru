'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { useAuth } from '@/app/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from '@/app/lib/supabase/config'

export default function Navbar() {
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const username = user?.user_metadata?.username || ''

  const navLinks = [
    { href: '/trending', label: 'Trending' },
    { href: '/popular', label: 'Popular' },
    { href: '/upcoming', label: 'Upcoming' },
    { href: '/top-anime', label: 'Top Anime' },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold">
            MIRU
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-blue-600 ${
                  pathname === link.href ? 'text-blue-600' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <>
              <Link href="/watchlist">
                <Button variant="ghost">Watchlist</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user.user_metadata.avatar_url} />
                    <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

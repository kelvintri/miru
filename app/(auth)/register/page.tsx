'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: signUpError } = await createClient().auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })

      if (signUpError) throw signUpError

      // Create user profile in your database
      const { error: profileError } = await createClient()
        .from('profiles')
        .insert([
          {
            email,
            username,
          },
        ])

      if (profileError) throw profileError

      router.push('/login')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-2">Username</label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2">Password</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
      </form>
    </div>
  )
} 
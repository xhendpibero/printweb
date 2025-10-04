import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { User, AuthSession } from '@/shared/types'
import { getSession, signOut as authSignOut } from '@/lib/auth'

interface UseAuthReturn {
  user: User | null
  session: AuthSession | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  refetch: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchSession = async () => {
    try {
      setIsLoading(true)
      const currentSession = await getSession()
      setSession(currentSession)
    } catch (error) {
      console.error('Failed to fetch session:', error)
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await authSignOut()
      setSession(null)
      router.push('/auth/login')
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return {
    user: session?.user || null,
    session,
    isLoading,
    isAuthenticated: !!session,
    signOut,
    refetch: fetchSession
  }
}

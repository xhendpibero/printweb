// Simple auth utilities for client panel
import type { User } from '@/shared/types'

// Mock user data for development
const MOCK_USER: User = {
  id: 'user-1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=ffffff&size=128',
  role: 'customer',
  createdAt: '2024-01-01T00:00:00Z'
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

// Mock session for development
const MOCK_SESSION: AuthSession = {
  user: MOCK_USER,
  token: 'mock-jwt-token',
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
}

// Simple in-memory auth state for development
let currentSession: AuthSession | null = null

/**
 * Sign in user (mock implementation)
 */
export async function signIn(email?: string, password?: string): Promise<AuthSession> {
  // TODO: Replace with actual authentication logic
  // For now, just return mock session
  currentSession = MOCK_SESSION
  
  // Store in localStorage for persistence across page reloads
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-session', JSON.stringify(currentSession))
  }
  
  return currentSession
}

/**
 * Get current session (mock implementation)
 * In production, this would validate JWT token from cookies/localStorage
 */
export async function getSession(): Promise<AuthSession | null> {
  // Check in-memory session first
  if (currentSession) {
    return currentSession
  }
  
  // Check localStorage for persisted session
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('auth-session')
    if (stored) {
      try {
        const session = JSON.parse(stored) as AuthSession
        // Check if session is still valid
        const now = new Date()
        const expiresAt = new Date(session.expiresAt)
        
        if (now < expiresAt) {
          currentSession = session
          return session
        } else {
          // Session expired, remove it
          localStorage.removeItem('auth-session')
        }
      } catch (error) {
        // Invalid stored session, remove it
        localStorage.removeItem('auth-session')
      }
    }
  }
  
  return null
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  if (!session) return false
  
  const now = new Date()
  const expiresAt = new Date(session.expiresAt)
  
  return now < expiresAt
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user || null
}

/**
 * Sign out user
 */
export async function signOut(): Promise<void> {
  // Clear in-memory session
  currentSession = null
  
  // Clear localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-session')
  }
  
  console.log('User signed out')
}

/**
 * Check if user has specific role
 */
export function hasRole(user: User, role: User['role']): boolean {
  return user.role === role
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User): boolean {
  return hasRole(user, 'admin')
}

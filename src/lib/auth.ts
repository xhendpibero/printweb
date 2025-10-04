// Simple auth utilities for client panel
import type { User } from '@/shared/types'

// Mock user data for development
const MOCK_USER: User = {
  id: 'user-1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
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

/**
 * Get current session (mock implementation)
 * In production, this would validate JWT token from cookies/localStorage
 */
export async function getSession(): Promise<AuthSession | null> {
  // TODO: Replace with actual authentication logic
  // For now, return mock session for development
  return MOCK_SESSION
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
  // TODO: Implement actual sign out logic
  // Clear cookies, localStorage, etc.
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

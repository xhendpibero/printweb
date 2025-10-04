'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PanelSidebar } from './PanelSidebar'
import { PanelHeader } from './PanelHeader'
import { useAuth } from '../hooks/useAuth'

interface PanelLayoutProps {
  children: React.ReactNode
  locale: string
}

export function PanelLayout({ children, locale }: PanelLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page if not authenticated
      // For now, redirect to home page since we don't have login yet
      router.push(`/${locale}`)
    }
  }, [isAuthenticated, isLoading, router, locale])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // Don't render panel if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <PanelSidebar locale={locale} />
      
      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Header */}
        <PanelHeader />
        
        {/* Page content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

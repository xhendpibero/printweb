// Example of how to use the separated components in another header

import { UserAvatarDropdown, NotificationsDropdown } from '@/features/panel/components'
import { useAuth } from '@/features/panel/hooks/useAuth'

// Example: Simple header for a different section
export function SimpleHeader() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">My App</h1>
        
        <div className="flex items-center gap-4">
          <NotificationsDropdown />
          <UserAvatarDropdown 
            user={user} 
            onSignOut={signOut}
            showName={false}  // Hide name for compact header
            size="sm"         // Smaller size
          />
        </div>
      </div>
    </header>
  )
}

// Example: Header with custom styling
export function CustomHeader() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-indigo-100 text-sm">Manage your account</p>
        </div>
        
        <div className="flex items-center gap-6">
          <NotificationsDropdown />
          <UserAvatarDropdown 
            user={user} 
            onSignOut={signOut}
            showName={true}
            size="lg"
            className="text-white" // Custom styling
          />
        </div>
      </div>
    </header>
  )
}

// Example: Mobile-first header
export function MobileHeader() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatarDropdown 
            user={user} 
            onSignOut={signOut}
            showName={false}
            size="sm"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <NotificationsDropdown />
      </div>
    </header>
  )
}

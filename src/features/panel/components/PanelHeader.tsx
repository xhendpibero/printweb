'use client'

import { Menu } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { UserAvatarDropdown } from './UserAvatarDropdown'
import { NotificationsDropdown } from './NotificationsDropdown'

export function PanelHeader() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => {
          // TODO: Implement mobile sidebar toggle
        }}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Welcome message */}
        <div className="flex flex-1 items-center">
          <div className="text-sm text-gray-500">
            Welcome back, {user.firstName}! 👋
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <NotificationsDropdown />

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

          {/* User Avatar Dropdown */}
          <UserAvatarDropdown 
            user={user} 
            onSignOut={signOut}
            showName={true}
            size="md"
          />
        </div>
      </div>
    </div>
  )
}

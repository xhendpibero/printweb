'use client'

import { useState } from 'react'
import { User, LogOut, Settings, UserCircle, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import type { User as UserType } from '@/shared/types'

interface UserAvatarDropdownProps {
  user: UserType
  onSignOut: () => void
  showName?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function UserAvatarDropdown({ 
  user, 
  onSignOut, 
  showName = true, 
  size = 'md',
  className = '' 
}: UserAvatarDropdownProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Mock user avatar - in real app this would come from user.avatar or similar
  const userAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((user?.firstName || '') + ' ' + (user?.lastName || ''))}&background=6366f1&color=ffffff&size=128`

  // Size configurations
  const sizeConfig = {
    sm: {
      avatar: 'h-6 w-6',
      avatarLarge: 'h-8 w-8',
      text: 'text-xs',
      padding: 'p-1'
    },
    md: {
      avatar: 'h-8 w-8',
      avatarLarge: 'h-10 w-10',
      text: 'text-sm',
      padding: 'p-1.5'
    },
    lg: {
      avatar: 'h-10 w-10',
      avatarLarge: 'h-12 w-12',
      text: 'text-base',
      padding: 'p-2'
    }
  }

  const config = sizeConfig[size]

  return (
    <>
      {/* Backdrop */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      <div className={`relative ${className}`}>
        <button
          type="button"
          className={`-m-1.5 flex items-center ${config.padding} hover:bg-gray-50 rounded-lg transition-colors`}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <span className="sr-only">Open user menu</span>
          
          {/* User Avatar */}
          <img
            className={`${config.avatar} rounded-full object-cover ring-2 ring-white`}
            src={userAvatar}
            alt={`${user?.firstName} ${user?.lastName}`}
            onError={(e) => {
              // Fallback to icon if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          
          {/* Fallback icon (hidden by default) */}
          <div className={`${config.avatar} rounded-full bg-indigo-100 items-center justify-center hidden`}>
            <User className="h-4 w-4 text-indigo-600" />
          </div>

          {/* User name and chevron */}
          {showName && (
            <span className="hidden lg:flex lg:items-center">
              <span className={`ml-3 ${config.text} font-semibold leading-6 text-gray-900`}>
                {user?.firstName} {user?.lastName}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
            </span>
          )}
        </button>

        {/* Dropdown menu */}
        {showUserMenu && (
          <div className="absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
            {/* User info header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  className={`${config.avatarLarge} rounded-full object-cover`}
                  src={userAvatar}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setShowUserMenu(false)}
              >
                <UserCircle className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings className="h-4 w-4" />
                Account Settings
              </Link>
            </div>

            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => {
                  onSignOut()
                  setShowUserMenu(false)
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

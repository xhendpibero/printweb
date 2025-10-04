'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import Link from 'next/link'

interface Notification {
  id: string
  title: string
  time: string
  type: 'info' | 'success' | 'warning' | 'error'
  read?: boolean
}

interface NotificationsDropdownProps {
  notifications?: Notification[]
  unreadCount?: number
  className?: string
}

// Mock notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Your order #ORD-2024-001 has been shipped',
    time: '2 hours ago',
    type: 'info',
    read: false
  },
  {
    id: '2',
    title: 'New cashback earned: 15.75 PLN',
    time: '1 day ago',
    type: 'success',
    read: false
  },
  {
    id: '3',
    title: 'Welcome to Gold membership tier!',
    time: '3 days ago',
    type: 'success',
    read: true
  }
]

export function NotificationsDropdown({ 
  notifications = MOCK_NOTIFICATIONS, 
  unreadCount = 3,
  className = '' 
}: NotificationsDropdownProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      case 'info':
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <>
      {/* Backdrop */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowNotifications(false)}
        />
      )}

      <div className={`relative ${className}`}>
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Notifications dropdown */}
        {showNotifications && (
          <div className="absolute right-0 z-40 mt-2 w-80 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-gray-500">{unreadCount} unread</span>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 ${
                      !notification.read ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 ${getNotificationColor(notification.type)} rounded-full mt-2 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No notifications</p>
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-gray-100">
              <Link 
                href="/messages" 
                className="text-sm text-indigo-600 hover:text-indigo-500"
                onClick={() => setShowNotifications(false)}
              >
                View all messages →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

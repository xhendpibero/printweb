'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Percent, 
  Coins, 
  MapPin, 
  Users, 
  MessageSquare, 
  Settings 
} from 'lucide-react'
import { PANEL_NAV_ITEMS } from '@/shared/constants'
import { usePanelNavigationTranslations } from '@/shared/hooks'
import { cn } from '@/shared/utils'

interface PanelSidebarProps {
  locale: string
}

// Icon mapping
const ICON_MAP = {
  LayoutDashboard,
  Package,
  FileText,
  Percent,
  Coins,
  MapPin,
  Users,
  MessageSquare,
  Settings
} as const

export function PanelSidebar({ locale }: PanelSidebarProps) {
  const pathname = usePathname()
  const t = usePanelNavigationTranslations()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Link href={`/${locale}`}>
            <h1 className="text-xl font-bold text-indigo-600">
              Drukarnia Graften
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {PANEL_NAV_ITEMS.map((item) => {
                  const href = `/${locale}/(panel)${item.href}`
                  const isActive = pathname === href
                  const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP]

                  return (
                    <li key={item.id}>
                      <Link
                        href={href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors',
                          isActive
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-5 w-5 shrink-0',
                            isActive
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-indigo-600'
                          )}
                        />
                        {t(item.labelKey.split('.')[1])}
                        {item.badge && (
                          <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

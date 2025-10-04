// Panel-specific constants
import type { NavItem, OrderStatus, PaymentStatus } from '@/shared/types'

// Navigation configuration
export const PANEL_NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    labelKey: 'navigation.dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard'
  },
  {
    id: 'orders',
    labelKey: 'navigation.orders',
    href: '/orders',
    icon: 'Package'
  },
  {
    id: 'invoices',
    labelKey: 'navigation.invoices',
    href: '/invoices',
    icon: 'FileText'
  },
  {
    id: 'discounts',
    labelKey: 'navigation.discounts',
    href: '/discounts',
    icon: 'Percent'
  },
  {
    id: 'cashback',
    labelKey: 'navigation.cashback',
    href: '/cashback',
    icon: 'Coins'
  },
  {
    id: 'addresses',
    labelKey: 'navigation.addresses',
    href: '/addresses',
    icon: 'MapPin'
  },
  {
    id: 'organization',
    labelKey: 'navigation.organization',
    href: '/organization',
    icon: 'Users'
  },
  {
    id: 'messages',
    labelKey: 'navigation.messages',
    href: '/messages',
    icon: 'MessageSquare'
  },
  {
    id: 'settings',
    labelKey: 'navigation.settings',
    href: '/settings',
    icon: 'Settings'
  }
] as const

// Order status configuration
export const ORDER_STATUS_CONFIG: Record<OrderStatus, { 
  color: string
  bgColor: string
  labelKey: string
}> = {
  draft: {
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    labelKey: 'orders.status.draft'
  },
  pending: {
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    labelKey: 'orders.status.pending'
  },
  confirmed: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    labelKey: 'orders.status.confirmed'
  },
  in_production: {
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    labelKey: 'orders.status.inProduction'
  },
  shipped: {
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    labelKey: 'orders.status.shipped'
  },
  delivered: {
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    labelKey: 'orders.status.delivered'
  },
  cancelled: {
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    labelKey: 'orders.status.cancelled'
  }
} as const

// Payment status configuration
export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, {
  color: string
  bgColor: string
  labelKey: string
}> = {
  pending: {
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    labelKey: 'orders.payment.pending'
  },
  paid: {
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    labelKey: 'orders.payment.paid'
  },
  failed: {
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    labelKey: 'orders.payment.failed'
  },
  refunded: {
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    labelKey: 'orders.payment.refunded'
  },
  partial: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    labelKey: 'orders.payment.partial'
  }
} as const

// Pagination defaults
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100
} as const

// Query configuration
export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  RETRY_COUNT: 3,
  DEBOUNCE_DELAY: 300
} as const

// File upload limits
export const PANEL_UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
  MAX_FILES_PER_MESSAGE: 5
} as const

// Settings tabs
export const SETTINGS_TABS = [
  {
    id: 'account',
    labelKey: 'settings.tabs.account',
    href: '/settings/account'
  },
  {
    id: 'password',
    labelKey: 'settings.tabs.password',
    href: '/settings/password'
  },
  {
    id: 'transfer',
    labelKey: 'settings.tabs.transfer',
    href: '/settings/transfer'
  },
  {
    id: 'marketing',
    labelKey: 'settings.tabs.marketing',
    href: '/settings/marketing'
  },
  {
    id: 'ftp',
    labelKey: 'settings.tabs.ftp',
    href: '/settings/ftp'
  }
] as const

// Organization roles
export const ORG_ROLES = [
  {
    id: 'admin',
    labelKey: 'organization.roles.admin',
    description: 'organization.roles.adminDesc'
  },
  {
    id: 'manager',
    labelKey: 'organization.roles.manager',
    description: 'organization.roles.managerDesc'
  },
  {
    id: 'member',
    labelKey: 'organization.roles.member',
    description: 'organization.roles.memberDesc'
  }
] as const

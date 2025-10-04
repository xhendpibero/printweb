import type { CashbackBalance, CashbackHistoryItem } from '@/shared/types'

// Mock cashback balance data
export const MOCK_CASHBACK_BALANCES: CashbackBalance[] = [
  {
    currency: 'PLN',
    available: 127.50,
    blocked: 22.30,
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    currency: 'EUR',
    available: 34.75,
    blocked: 0,
    updatedAt: '2024-01-20T15:30:00Z'
  }
]

// Mock cashback history data
export const MOCK_CASHBACK_HISTORY: CashbackHistoryItem[] = [
  {
    id: 'cb-001',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    type: 'earn',
    amount: 15.75,
    currency: 'PLN',
    note: 'Cashback from order #ORD-2024-001 (5% on 315.00 PLN)',
    orderId: 'order-001'
  },
  {
    id: 'cb-002',
    createdAt: '2024-01-18T14:20:00Z',
    updatedAt: '2024-01-18T14:20:00Z',
    type: 'redeem',
    amount: -25.00,
    currency: 'PLN',
    note: 'Redeemed for order #ORD-2024-003',
    orderId: 'order-003'
  },
  {
    id: 'cb-003',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    type: 'earn',
    amount: 12.40,
    currency: 'PLN',
    note: 'Cashback from order #ORD-2024-002 (4% on 310.00 PLN)',
    orderId: 'order-002'
  },
  {
    id: 'cb-004',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    type: 'earn',
    amount: 8.90,
    currency: 'EUR',
    note: 'Cashback from order #ORD-2024-004 (3% on 296.67 EUR)',
    orderId: 'order-004'
  },
  {
    id: 'cb-005',
    createdAt: '2024-01-10T11:30:00Z',
    updatedAt: '2024-01-10T11:30:00Z',
    type: 'adjust',
    amount: 5.00,
    currency: 'PLN',
    note: 'Bonus cashback for reaching Gold membership tier'
  },
  {
    id: 'cb-006',
    createdAt: '2024-01-08T13:20:00Z',
    updatedAt: '2024-01-08T13:20:00Z',
    type: 'earn',
    amount: 22.30,
    currency: 'PLN',
    note: 'Cashback from order #ORD-2024-005 (6% on 371.67 PLN)',
    orderId: 'order-005'
  },
  {
    id: 'cb-007',
    createdAt: '2024-01-05T10:10:00Z',
    updatedAt: '2024-01-05T10:10:00Z',
    type: 'block',
    amount: -22.30,
    currency: 'PLN',
    note: 'Temporarily blocked pending order verification #ORD-2024-005',
    orderId: 'order-005'
  },
  {
    id: 'cb-008',
    createdAt: '2024-01-05T08:45:00Z',
    updatedAt: '2024-01-05T08:45:00Z',
    type: 'unblock',
    amount: 22.30,
    currency: 'PLN',
    note: 'Unblocked after order verification completed #ORD-2024-005',
    orderId: 'order-005'
  },
  {
    id: 'cb-009',
    createdAt: '2024-01-03T15:25:00Z',
    updatedAt: '2024-01-03T15:25:00Z',
    type: 'earn',
    amount: 18.50,
    currency: 'EUR',
    note: 'Cashback from order #ORD-2024-006 (5% on 370.00 EUR)',
    orderId: 'order-006'
  },
  {
    id: 'cb-010',
    createdAt: '2023-12-28T12:00:00Z',
    updatedAt: '2023-12-28T12:00:00Z',
    type: 'redeem',
    amount: -15.00,
    currency: 'EUR',
    note: 'Redeemed for order #ORD-2023-099',
    orderId: 'order-099'
  }
]

// Helper functions
export function getCashbackBalance(currency: 'PLN' | 'EUR'): CashbackBalance | undefined {
  return MOCK_CASHBACK_BALANCES.find(balance => balance.currency === currency)
}

export function getTotalBalance(currency: 'PLN' | 'EUR'): number {
  const balance = getCashbackBalance(currency)
  return balance ? balance.available + balance.blocked : 0
}

export function filterCashbackHistory(
  history: CashbackHistoryItem[], 
  filters: {
    type?: CashbackHistoryItem['type']
    currency?: 'PLN' | 'EUR'
    page?: number
    pageSize?: number
  }
): CashbackHistoryItem[] {
  let filtered = [...history]

  // Filter by type
  if (filters.type) {
    filtered = filtered.filter(item => item.type === filters.type)
  }

  // Filter by currency
  if (filters.currency) {
    filtered = filtered.filter(item => item.currency === filters.currency)
  }

  // Sort by date (newest first)
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Apply pagination
  const startIndex = ((filters.page || 1) - 1) * (filters.pageSize || 20)
  const endIndex = startIndex + (filters.pageSize || 20)
  
  return filtered.slice(startIndex, endIndex)
}

export function formatCashbackAmount(amount: number, currency: string): string {
  const sign = amount >= 0 ? '+' : ''
  return `${sign}${amount.toFixed(2)} ${currency}`
}

export function getCashbackTypeColor(type: CashbackHistoryItem['type']): string {
  switch (type) {
    case 'earn':
      return 'text-green-600 bg-green-50'
    case 'redeem':
      return 'text-blue-600 bg-blue-50'
    case 'adjust':
      return 'text-purple-600 bg-purple-50'
    case 'block':
      return 'text-orange-600 bg-orange-50'
    case 'unblock':
      return 'text-gray-600 bg-gray-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

export function formatCashbackDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return 'Yesterday'
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}

// Minimum redemption amounts per currency
export const MIN_REDEMPTION_AMOUNTS = {
  PLN: 10.00,
  EUR: 5.00
} as const

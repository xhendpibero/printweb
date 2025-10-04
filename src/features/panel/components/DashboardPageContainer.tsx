'use client'

import Link from 'next/link'
import { Package, Clock, DollarSign, Percent, MessageSquare } from 'lucide-react'
import { useDashboardTranslations } from '@/shared/hooks'
import { formatMoney } from '@/shared/utils'

// Mock dashboard data
const MOCK_STATS = {
  totalOrders: 45,
  pendingOrders: 3,
  totalSpent: 12450.80,
  activeDiscounts: 2,
  unreadMessages: 1
}

const MOCK_RECENT_ORDERS = [
  {
    id: 'order-1',
    orderNumber: 'ORD-2024-001',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'in_production' as const,
    grossTotal: 450.00,
    currency: 'PLN' as const,
    itemsCount: 3
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-2024-002',
    createdAt: '2024-01-14T14:20:00Z',
    status: 'shipped' as const,
    grossTotal: 280.50,
    currency: 'PLN' as const,
    itemsCount: 1
  }
]

export function DashboardPageContainer() {
  const t = useDashboardTranslations()

  const stats = [
    {
      name: t('stats.totalOrders'),
      value: MOCK_STATS.totalOrders.toString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: t('stats.pendingOrders'),
      value: MOCK_STATS.pendingOrders.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: t('stats.totalSpent'),
      value: formatMoney(MOCK_STATS.totalSpent, 'PLN'),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: t('stats.activeDiscounts'),
      value: MOCK_STATS.activeDiscounts.toString(),
      icon: Percent,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: t('stats.unreadMessages'),
      value: MOCK_STATS.unreadMessages.toString(),
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`inline-flex items-center justify-center p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent orders */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {t('recentOrders.title')}
            </h3>
            <Link
              href="/orders"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('recentOrders.viewAll')}
            </Link>
          </div>

          {MOCK_RECENT_ORDERS.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {t('recentOrders.empty')}
            </p>
          ) : (
            <div className="space-y-3">
              {MOCK_RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.itemsCount} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatMoney(order.grossTotal, order.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Search, Filter, Package } from 'lucide-react'
import { useOrdersTranslations, usePanelCommonTranslations } from '@/shared/hooks'
import { ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG } from '@/shared/constants'
import { formatMoney } from '@/shared/utils'
import type { Order, OrderFilters } from '@/shared/types'

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'ORD-2024-001',
    status: 'in_production' as const,
    paymentStatus: 'paid' as const,
    grossTotal: 450.00,
    netTotal: 365.85,
    currency: 'PLN' as const,
    itemsCount: 3,
    purchaserName: 'John Doe',
    purchaserEmail: 'john.doe@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    shippingMethod: 'Standard Delivery'
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-2024-002',
    status: 'shipped' as const,
    paymentStatus: 'paid' as const,
    grossTotal: 280.50,
    netTotal: 228.05,
    currency: 'PLN' as const,
    itemsCount: 1,
    purchaserName: 'Jane Smith',
    purchaserEmail: 'jane.smith@example.com',
    createdAt: '2024-01-14T14:20:00Z',
    shippingMethod: 'Express Delivery'
  },
  {
    id: 'order-3',
    orderNumber: 'ORD-2024-003',
    status: 'pending' as const,
    paymentStatus: 'pending' as const,
    grossTotal: 125.00,
    netTotal: 101.63,
    currency: 'PLN' as const,
    itemsCount: 2,
    purchaserName: 'Bob Johnson',
    purchaserEmail: 'bob.johnson@example.com',
    createdAt: '2024-01-13T09:15:00Z',
    shippingMethod: 'Standard Delivery'
  }
]

export function OrdersPageContainer() {
  const t = useOrdersTranslations()
  const tc = usePanelCommonTranslations()
  
  const [filters, setFilters] = useState<OrderFilters>({
    search: '',
    page: 1,
    pageSize: 20
  })
  const [showFilters, setShowFilters] = useState(false)

  // Mock filtered orders (in real app, this would be from API)
  const filteredOrders = MOCK_ORDERS.filter(order => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.purchaserName?.toLowerCase().includes(searchLower) ||
        order.purchaserEmail?.toLowerCase().includes(searchLower)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('filters.search')}
                value={filters.search || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            {tc('filter')}
          </button>
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Date filters would go here */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('filters.dateFrom')}
              </label>
              <input
                type="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('filters.dateTo')}
              </label>
              <input
                type="date"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                onClick={() => setFilters({ search: '', page: 1, pageSize: 20 })}
                className="mt-6 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t('filters.clearFilters')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders list */}
      <div className="bg-white shadow rounded-lg">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('empty')}</h3>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const statusConfig = ORDER_STATUS_CONFIG[order.status]
                  const paymentConfig = PAYMENT_STATUS_CONFIG[order.paymentStatus]

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.orderNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.itemsCount} items
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.purchaserName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.purchaserEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
                          {t(`status.${order.status}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${paymentConfig.bgColor} ${paymentConfig.color}`}>
                          {t(`payment.${order.paymentStatus}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatMoney(order.grossTotal, order.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt!).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          {t('actions.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination would go here */}
    </div>
  )
}

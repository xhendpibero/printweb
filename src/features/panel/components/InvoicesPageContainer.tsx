'use client'

import { useState } from 'react'
import { Search, Filter, FileText, Download, Calendar } from 'lucide-react'
import { useInvoicesTranslations, usePanelCommonTranslations } from '@/shared/hooks'
import { formatMoney } from '@/shared/utils'
import type { Invoice, InvoiceFilters } from '@/shared/types'
import { MOCK_INVOICES, filterMockInvoices } from '@/mocks/data/invoices.mock'
import { InvoicesDownloadPanel, EInvoiceConsent } from './invoices'

// Status configuration for styling
const INVOICE_STATUS_CONFIG: Record<Invoice['status'], {
  color: string
  bgColor: string
}> = {
  paid: {
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  unpaid: {
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  overdue: {
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  canceled: {
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  }
}

export function InvoicesPageContainer() {
  const t = useInvoicesTranslations()
  const tc = usePanelCommonTranslations()
  
  const [filters, setFilters] = useState<InvoiceFilters>({
    search: '',
    period: 'any',
    page: 1,
    pageSize: 20
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showDownloadPanel, setShowDownloadPanel] = useState(false)

  // Mock filtered invoices (in real app, this would be from API)
  const filteredInvoices = filterMockInvoices(MOCK_INVOICES, {
    search: filters.search,
    status: filters.status,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
    period: filters.period
  })

  const handleDownload = (invoice: Invoice) => {
    // Mock download - in real app, this would trigger actual download
    console.log('Downloading invoice:', invoice.invoiceNumber)
    // window.open(invoice.downloadUrl, '_blank')
  }

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

          {/* Period filter */}
          <div className="sm:w-48">
            <select
              value={filters.period || 'any'}
              onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value as InvoiceFilters['period'] }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="any">{t('periods.any')}</option>
              <option value="last30">{t('periods.last30')}</option>
              <option value="thisMonth">{t('periods.thisMonth')}</option>
              <option value="lastMonth">{t('periods.lastMonth')}</option>
              <option value="custom">{t('periods.custom')}</option>
            </select>
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            {tc('filter')}
          </button>

          {/* Download period button */}
          <button
            onClick={() => setShowDownloadPanel(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            <Calendar className="h-4 w-4" />
            {t('actions.downloadPeriod')}
          </button>
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('filters.dateFrom')}
              </label>
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('filters.dateTo')}
              </label>
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                onClick={() => setFilters({ search: '', period: 'any', page: 1, pageSize: 20 })}
                className="mt-6 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {t('filters.clearFilters')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invoices list */}
      <div className="bg-white shadow rounded-lg">
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('empty')}</h3>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => {
                  const statusConfig = INVOICE_STATUS_CONFIG[invoice.status]

                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {invoice.orderNumber || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>
                          {t(`status.${invoice.status}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatMoney(invoice.grossTotal, invoice.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invoice.issueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDownload(invoice)}
                          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-900"
                        >
                          <Download className="h-4 w-4" />
                          {t('actions.download')}
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

      {/* E-Invoice Consent */}
      <EInvoiceConsent />

      {/* Download Panel Modal */}
      <InvoicesDownloadPanel
        isOpen={showDownloadPanel}
        onClose={() => setShowDownloadPanel(false)}
      />
    </div>
  )
}

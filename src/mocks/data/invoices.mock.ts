import type { Invoice, EInvoiceConsent } from '@/shared/types'

// Mock invoice data for development
export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV/2024/001',
    orderId: 'order-1',
    orderNumber: 'ORD-2024-001',
    issueDate: '2024-01-15T00:00:00Z',
    dueDate: '2024-01-29T00:00:00Z',
    paidDate: '2024-01-20T10:30:00Z',
    status: 'paid',
    grossTotal: 450.00,
    netTotal: 365.85,
    vatAmount: 84.15,
    currency: 'PLN',
    downloadUrl: '/api/invoices/inv-001/download',
    xmlUrl: '/api/invoices/inv-001/xml',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV/2024/002',
    orderId: 'order-2',
    orderNumber: 'ORD-2024-002',
    issueDate: '2024-01-14T00:00:00Z',
    dueDate: '2024-01-28T00:00:00Z',
    paidDate: '2024-01-16T14:20:00Z',
    status: 'paid',
    grossTotal: 280.50,
    netTotal: 228.05,
    vatAmount: 52.45,
    currency: 'PLN',
    downloadUrl: '/api/invoices/inv-002/download',
    xmlUrl: '/api/invoices/inv-002/xml',
    createdAt: '2024-01-14T00:00:00Z'
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV/2024/003',
    orderId: 'order-3',
    orderNumber: 'ORD-2024-003',
    issueDate: '2024-01-13T00:00:00Z',
    dueDate: '2024-01-27T00:00:00Z',
    status: 'unpaid',
    grossTotal: 125.00,
    netTotal: 101.63,
    vatAmount: 23.37,
    currency: 'PLN',
    downloadUrl: '/api/invoices/inv-003/download',
    createdAt: '2024-01-13T00:00:00Z'
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV/2024/004',
    orderId: 'order-4',
    orderNumber: 'ORD-2024-004',
    issueDate: '2023-12-20T00:00:00Z',
    dueDate: '2024-01-03T00:00:00Z',
    status: 'overdue',
    grossTotal: 750.00,
    netTotal: 609.76,
    vatAmount: 140.24,
    currency: 'PLN',
    downloadUrl: '/api/invoices/inv-004/download',
    createdAt: '2023-12-20T00:00:00Z'
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV/2024/005',
    orderId: 'order-5',
    orderNumber: 'ORD-2024-005',
    issueDate: '2024-01-10T00:00:00Z',
    dueDate: '2024-01-24T00:00:00Z',
    status: 'canceled',
    grossTotal: 320.00,
    netTotal: 260.16,
    vatAmount: 59.84,
    currency: 'PLN',
    downloadUrl: '/api/invoices/inv-005/download',
    createdAt: '2024-01-10T00:00:00Z'
  }
]

// Mock e-invoice consent
export const MOCK_E_INVOICE_CONSENT: EInvoiceConsent = {
  enabled: true,
  updatedAt: '2024-01-01T12:00:00Z'
}

// Helper to filter mock invoices
export function filterMockInvoices(invoices: Invoice[], filters: {
  search?: string
  status?: string[]
  dateFrom?: string
  dateTo?: string
  period?: string
}) {
  return invoices.filter(invoice => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matches = 
        invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
        invoice.orderNumber?.toLowerCase().includes(searchLower)
      
      if (!matches) return false
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(invoice.status)) return false
    }

    // Date filters
    const invoiceDate = new Date(invoice.issueDate)
    
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      if (invoiceDate < fromDate) return false
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      if (invoiceDate > toDate) return false
    }

    // Period filter
    if (filters.period && filters.period !== 'any') {
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      
      switch (filters.period) {
        case 'last30':
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          if (invoiceDate < thirtyDaysAgo) return false
          break
        case 'thisMonth':
          if (invoiceDate.getMonth() !== currentMonth || invoiceDate.getFullYear() !== currentYear) {
            return false
          }
          break
        case 'lastMonth':
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
          const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
          if (invoiceDate.getMonth() !== lastMonth || invoiceDate.getFullYear() !== lastMonthYear) {
            return false
          }
          break
      }
    }

    return true
  })
}

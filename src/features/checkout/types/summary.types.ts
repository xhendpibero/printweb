import type { Address } from '@/shared/types'

// Summary specific types
export interface OrderSummaryData {
  items: SummaryOrderItem[]
  shipping: {
    address: Address
    method: string
    cost: number
    estimatedDelivery: string
  }
  payment: {
    method: string
    invoice: {
      type: 'individual' | 'company'
      name: string
      email: string
      address: Address
      company?: string
      taxId?: string
    }
  }
  totals: {
    subtotal: number
    shipping: number
    tax: number
    total: number
    currency: 'PLN' | 'EUR'
  }
}

export interface SummaryOrderItem {
  itemId: string
  productName: string
  slug: string
  quantity: number
  configuration: string
  unitPrice: number
  totalPrice: number
  thumbnail?: string
  hasFiles: boolean
}

export interface OrderReviewSectionProps {
  items: SummaryOrderItem[]
  currency: 'PLN' | 'EUR'
}

export interface ShippingReviewProps {
  address: Address
  method: string
  cost: number
  estimatedDelivery: string
  currency: 'PLN' | 'EUR'
}

export interface PaymentReviewProps {
  method: string
  invoice: OrderSummaryData['payment']['invoice']
}

export interface OrderTotalsProps {
  totals: OrderSummaryData['totals']
}

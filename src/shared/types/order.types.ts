import type { BaseEntity, Currency, Address } from './common.types'

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface Order extends BaseEntity {
  orderNumber: string
  userId?: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  taxAmount: number
  totalAmount: number
  currency: Currency
  shippingAddress: Address
  billingAddress: Address
  paymentStatus: PaymentStatus
  paymentMethod?: string
}

export interface OrderItem {
  id: string
  productId: string
  configuration: Record<string, unknown>
  quantity: number
  unitPrice: number
  totalPrice: number
  productionFiles?: string[]
}

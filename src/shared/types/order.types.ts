import type { BaseEntity, Currency, Address } from './common.types'

export type OrderStatus = 
  | 'draft' 
  | 'pending' 
  | 'confirmed' 
  | 'in_production' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled'

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded' 
  | 'partial'

export interface Order extends BaseEntity {
  orderNumber: string
  userId?: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  grossTotal: number
  netTotal: number
  currency: Currency
  discountPercent?: number
  itemsCount: number
  purchaserName?: string
  purchaserEmail?: string
  shippingAddress?: Address
  billingAddress?: Address
  notes?: string
  estimatedDelivery?: string
  shippingMethod?: string
  items?: OrderItem[]
  subtotal?: number
  shippingCost?: number
  taxAmount?: number
  totalAmount?: number
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

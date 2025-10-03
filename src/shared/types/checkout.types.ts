import type { Currency, Address } from './common.types'

export type CheckoutStep = 'cart' | 'upload' | 'shipment' | 'payment' | 'summary'

export interface FileUploadState {
  [itemId: string]: File[]
}

export interface ShippingOption {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: number
  available: boolean
}

export interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
  available: boolean
  processingFee?: number
}

export interface InvoiceData {
  type: 'individual' | 'company'
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  taxId?: string
  address: Address
}

export interface OrderSummary {
  items: CheckoutItem[]
  shipping: ShippingOption
  payment: PaymentMethod
  invoice: InvoiceData
  calculations: OrderCalculations
  files: FileUploadState
}

export interface CheckoutItem {
  itemId: string
  productName: string
  slug: string
  quantity: number
  configuration: string
  unitPrice: number
  totalPrice: number
  thumbnail?: string
  files: File[]
}

export interface OrderCalculations {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  currency: Currency
}

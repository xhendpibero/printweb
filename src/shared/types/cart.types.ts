import type { Currency } from './common.types'

export interface CartItem {
  itemId: string
  slug: string
  quantity: number
  configuration: CartItemConfiguration
  priceVersion: number
  configFingerprint: string
  thumbnail?: string
  shippingOption?: string
  orderName?: string
}

export interface CartItemConfiguration {
  format: string
  paper: string
  colors: string
  finishings: string[]
}

export interface CartState {
  items: CartItem[]
  shippingOption?: string
  currency: Currency
}

export interface CartCalculations {
  printingNet: number
  deliveryNet: number
  totalNet: number
  totalGross: number
  vatAmount: number
  itemCount: number
}

export interface DiscountCode {
  code: string
  message: string
  discountAmount?: number
  discountPercent?: number
  isValid: boolean
}

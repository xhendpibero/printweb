import type { Product } from '@/shared/types'

// Product configuration specific types
export interface ProductConfigurationState {
  format: string
  paper: string
  colors: string
  finishings: string[]
  quantity: number
  projectPreparation: string
}

export interface ProductPricing {
  printingCost: number
  deliveryCost: number
  netPrice: number
  currency: 'PLN' | 'EUR'
}

export interface ProductSummary {
  productName: string
  quantity: number
  configuration: ProductConfigurationState
  pricing: ProductPricing
  delivery: {
    estimatedDate: string
    orderDeadline: string
  }
}

export interface ConfiguratorProps {
  configuration: ProductConfigurationState
  onConfigurationChange: (updates: Partial<ProductConfigurationState>) => void
  product: Product
}

export interface ProductPageData {
  product: Product
  isLoading: boolean
  error?: string
}

export interface AddToCartData {
  slug: string
  quantity: number
  configuration: ProductConfigurationState
  priceVersion: number
  configFingerprint: string
  thumbnail?: string
}

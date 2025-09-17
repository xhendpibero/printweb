// Core types for the drukarnia-graften-pl platform

export interface CartItem {
  itemId: string
  slug: string
  quantity: number
  configuration: {
    format: string
    paper: string
    colors: string
    finishings: string[]
  }
  priceVersion: number
  configFingerprint: string
  thumbnail?: string
  shippingOption?: string
}

export interface CartState {
  items: CartItem[]
  shippingOption?: string
  currency: 'EUR' | 'PLN'
}

export interface Product {
  id: string
  name: string
  description?: string
  slug: string
  basePrice: number
  category: Category
  configurator?: Configurator
  images: string[]
  status: 'active' | 'inactive'
  productType?: ProductType
}

export enum ProductType {
  FLYERS = 'flyers',
  BUSINESS_CARDS = 'business-cards',
  CATALOGS = 'catalogs',
  BOOKS = 'books',
  POSTERS = 'posters',
  CALENDARS = 'calendars',
  LARGE_FORMAT = 'large-format',
  LABELS_STICKERS = 'labels-stickers',
  NOTEPADS = 'notepads',
  PRESENTATION_FOLDERS = 'presentation-folders',
  PLANO_SHEETS = 'plano-sheets',
  ENVELOPES = 'envelopes',
  PROMOTIONAL_ITEMS = 'promotional-items',
  NOTEBOOKS = 'notebooks',
  OTHER = 'other',
  SAMPLES = 'samples',
  PENS = 'pens'
}

export interface ProductConfiguration {
  format?: string
  paper?: string
  colors?: string
  finishings: SelectedFinishing[]
  quantity: number
  projectPreparation?: string
}

export interface SelectedFinishing {
  id: string
  name: string
  side: 'front' | 'both'
}

export interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
  sortOrder: number
}

export interface Configurator {
  id: string
  name: string
  fields: ConfiguratorField[]
  pricingRules: PricingRule[]
  validationRules: ValidationRule[]
}

export interface ConfiguratorField {
  id: string
  type: 'select' | 'text' | 'number' | 'file' | 'checkbox' | 'radio' | 'range'
  name: string
  label: string
  required: boolean
  options?: ConfiguratorOption[]
  validation?: Record<string, any>
}

export interface ConfiguratorOption {
  id: string
  label: string
  value: string
  priceModifier?: number
  imageUrl?: string
}

export interface PricingRule {
  id: string
  condition: Record<string, any>
  modifier: number
  type: 'percentage' | 'fixed'
}

export interface ValidationRule {
  id: string
  field: string
  rule: string
  message: string
}

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: 'customer' | 'admin' | 'editor' | 'production'
}

export interface Order {
  id: string
  orderNumber: string
  userId?: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  taxAmount: number
  totalAmount: number
  currency: 'EUR' | 'PLN'
  shippingAddress: Address
  billingAddress: Address
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  configuration: Record<string, any>
  quantity: number
  unitPrice: number
  totalPrice: number
  productionFiles?: string[]
}

export interface Address {
  firstName: string
  lastName: string
  company?: string
  street: string
  city: string
  postalCode: string
  country: string
  phone?: string
}

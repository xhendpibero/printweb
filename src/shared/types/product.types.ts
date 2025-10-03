import type { BaseEntity, Currency } from './common.types'

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

export interface Product extends BaseEntity {
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

export interface Category extends BaseEntity {
  name: string
  slug: string
  parentId?: string
  sortOrder: number
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

export interface Configurator extends BaseEntity {
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
  validation?: Record<string, unknown>
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
  condition: Record<string, unknown>
  modifier: number
  type: 'percentage' | 'fixed'
}

export interface ValidationRule {
  id: string
  field: string
  rule: string
  message: string
}

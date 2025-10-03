// Cart-related constants
export const CART_STORAGE_KEY = 'drukarnia-cart'

// Cart limits
export const CART_LIMITS = {
  MAX_ITEMS: 50,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 10000,
  MAX_ITEM_NAME_LENGTH: 100
} as const

// Currency exchange rates (mock - should come from API)
export const EXCHANGE_RATES = {
  PLN_TO_EUR: 0.22,
  EUR_TO_PLN: 4.5
} as const

// VAT rates
export const VAT_RATES = {
  STANDARD: 0.23, // 23% VAT in Poland
  REDUCED: 0.08,  // 8% VAT for some products
  ZERO: 0.00      // 0% VAT for exports
} as const

// Discount codes (mock data)
export const SAMPLE_DISCOUNT_CODES = [
  {
    code: 'WELCOME10',
    message: '10% discount for new customers',
    discountPercent: 10,
    minAmount: 100
  },
  {
    code: 'BULK20',
    message: '20% discount for bulk orders',
    discountPercent: 20,
    minAmount: 500
  },
  {
    code: 'STUDENT15',
    message: '15% student discount',
    discountPercent: 15,
    minAmount: 50
  }
] as const

// Cart item configuration display
export const CONFIGURATION_DISPLAY_ORDER = [
  'format',
  'paper',
  'colors',
  'finishings',
  'projectPreparation'
] as const

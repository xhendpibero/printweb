// Application-wide constants
export const APP_NAME = 'Drukarnia Graften'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Professional printing services platform'

// Supported locales
export const SUPPORTED_LOCALES = ['en', 'pl'] as const
export const DEFAULT_LOCALE = 'pl'

// Supported currencies
export const SUPPORTED_CURRENCIES = ['PLN', 'EUR'] as const
export const DEFAULT_CURRENCY = 'PLN'

// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
export const API_TIMEOUT = 10000 // 10 seconds

// File upload limits
export const MAX_FILE_SIZE_MB = 50
export const MAX_FILES_PER_ITEM = 10
export const ALLOWED_FILE_TYPES = ['pdf', 'ai', 'eps', 'jpg', 'jpeg', 'png', 'tiff', 'psd']

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Cache TTL (in milliseconds)
export const CACHE_TTL = {
  SHORT: 5 * 60 * 1000,    // 5 minutes
  MEDIUM: 30 * 60 * 1000,  // 30 minutes
  LONG: 24 * 60 * 60 * 1000 // 24 hours
}

// Toast notification durations
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  INFO: 4000,
  WARNING: 4000
}

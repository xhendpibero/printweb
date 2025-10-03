// Checkout flow constants
export const CHECKOUT_STEPS = ['cart', 'upload', 'shipment', 'payment', 'summary'] as const

export const CHECKOUT_STEP_LABELS = {
  cart: 'Cart',
  upload: 'Upload Files',
  shipment: 'Shipping',
  payment: 'Payment',
  summary: 'Review'
} as const

// File upload validation
export const UPLOAD_VALIDATION = {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB in bytes
  ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'],
  ALLOWED_EXTENSIONS: ['pdf', 'jpg', 'jpeg', 'png', 'tiff', 'ai', 'eps', 'psd'],
  MIN_RESOLUTION: 300, // DPI
  MAX_FILES_PER_ITEM: 5
}

// Shipping options
export const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: '3-5 business days',
    price: 15.00,
    estimatedDays: 4
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: '1-2 business days',
    price: 25.00,
    estimatedDays: 1
  },
  {
    id: 'pickup',
    name: 'Pickup at Location',
    description: 'Pick up from our facility',
    price: 0.00,
    estimatedDays: 1
  }
] as const

// Payment methods
export const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: '💳',
    processingFee: 0
  },
  {
    id: 'blik',
    name: 'BLIK',
    description: 'Mobile payment system',
    icon: '📱',
    processingFee: 0
  },
  {
    id: 'transfer',
    name: 'Bank Transfer',
    description: 'Traditional wire transfer',
    icon: '🏛️',
    processingFee: 0
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: '🅿️',
    processingFee: 2.9
  }
] as const

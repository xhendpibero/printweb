import type { ProductConfigurationState, ProductPricing, AddToCartData } from '../types'

/**
 * Calculate product pricing based on configuration
 */
export function calculateProductPricing(
  quantity: number,
  configuration: ProductConfigurationState,
  basePrice: number = 0.12
): ProductPricing {
  let unitPrice = basePrice

  // Format-based pricing adjustments
  if (configuration.format.includes('A3')) {
    unitPrice *= 1.5
  } else if (configuration.format.includes('A5')) {
    unitPrice *= 0.8
  }

  // Paper-based pricing adjustments
  if (configuration.paper.includes('350g')) {
    unitPrice *= 1.3
  } else if (configuration.paper.includes('130g')) {
    unitPrice *= 0.9
  }

  // Color-based pricing adjustments
  if (configuration.colors.includes('4+4')) {
    unitPrice *= 1.2
  } else if (configuration.colors.includes('4+0')) {
    unitPrice *= 1.0
  }

  // Finishing-based pricing adjustments
  configuration.finishings.forEach(finishing => {
    if (finishing.includes('UV')) {
      unitPrice *= 1.15
    }
    if (finishing.includes('Lamination')) {
      unitPrice *= 1.1
    }
  })

  const printingCost = quantity * unitPrice
  const deliveryCost = 15.00

  return {
    printingCost,
    deliveryCost,
    netPrice: printingCost + deliveryCost,
    currency: 'PLN'
  }
}

/**
 * Generate configuration fingerprint for caching/comparison
 */
export function generateConfigFingerprint(
  slug: string,
  configuration: ProductConfigurationState
): string {
  const configString = [
    slug,
    configuration.format,
    configuration.paper,
    configuration.colors,
    configuration.finishings.sort().join(','),
    configuration.projectPreparation
  ].join('|')

  // Simple hash function
  let hash = 0
  for (let i = 0; i < configString.length; i++) {
    const char = configString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36)
}

/**
 * Create cart item data from product configuration
 */
export function createAddToCartData(
  slug: string,
  configuration: ProductConfigurationState,
  thumbnail?: string
): AddToCartData {
  return {
    slug,
    quantity: configuration.quantity,
    configuration,
    priceVersion: 1,
    configFingerprint: generateConfigFingerprint(slug, configuration),
    thumbnail
  }
}

/**
 * Get estimated delivery date
 */
export function getEstimatedDelivery(): {
  estimatedDate: string
  orderDeadline: string
} {
  const today = new Date()
  const deliveryDate = new Date(today)
  deliveryDate.setDate(today.getDate() + 4) // 4 business days

  const deadline = new Date(today)
  deadline.setHours(18, 0, 0, 0) // 6 PM today

  return {
    estimatedDate: deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric'
    }),
    orderDeadline: today.getHours() < 18 
      ? 'Order today until 18:00'
      : 'Order tomorrow until 18:00'
  }
}

/**
 * Validate product configuration
 */
export function validateConfiguration(configuration: ProductConfigurationState): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!configuration.format) {
    errors.push('Please select a format')
  }

  if (!configuration.paper) {
    errors.push('Please select paper type')
  }

  if (!configuration.colors) {
    errors.push('Please select color options')
  }

  if (configuration.quantity < 1) {
    errors.push('Quantity must be at least 1')
  }

  if (configuration.quantity > 10000) {
    errors.push('Maximum quantity is 10,000')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Get default configuration for a product
 */
export function getDefaultConfiguration(): ProductConfigurationState {
  return {
    format: '',
    paper: '',
    colors: '',
    finishings: [],
    quantity: 1000,
    projectPreparation: ''
  }
}

import type { CartItem, CartCalculations } from '@/shared/types'
import { calculateVAT, calculateGross } from '@/shared/utils'
import { VAT_RATES } from '@/shared/constants'

/**
 * Calculate cart totals including VAT
 */
export function calculateCartTotals(
  items: CartItem[], 
  shippingCost: number = 15.00
): CartCalculations {
  const printingNet = items.reduce((sum, item) => {
    // Mock pricing calculation - in real app would use proper pricing engine
    const itemPrice = item.quantity * 0.12 // Mock: 0.12 PLN per unit
    return sum + itemPrice
  }, 0)
  
  const deliveryNet = shippingCost
  const totalNet = printingNet + deliveryNet
  const vatAmount = calculateVAT(totalNet, VAT_RATES.STANDARD)
  const totalGross = calculateGross(totalNet, VAT_RATES.STANDARD)
  
  return {
    printingNet,
    deliveryNet,
    totalNet,
    totalGross,
    vatAmount,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
  }
}

/**
 * Generate cart item configuration display string
 */
export function formatCartItemConfiguration(item: CartItem): string {
  const parts = [
    item.configuration.format,
    item.configuration.paper,
    item.configuration.colors
  ]
  
  if (item.configuration.finishings.length > 0) {
    parts.push(item.configuration.finishings.join(', '))
  }
  
  return parts.join(' • ')
}

/**
 * Generate unique cart item fingerprint for comparison
 */
export function generateCartItemFingerprint(
  slug: string,
  configuration: CartItem['configuration']
): string {
  const configString = [
    slug,
    configuration.format,
    configuration.paper,
    configuration.colors,
    configuration.finishings.sort().join(',')
  ].join('|')
  
  // Simple hash function for fingerprint
  let hash = 0
  for (let i = 0; i < configString.length; i++) {
    const char = configString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36)
}

/**
 * Check if two cart items can be merged (same product and configuration)
 */
export function canMergeCartItems(item1: CartItem, item2: CartItem): boolean {
  return item1.slug === item2.slug && 
         item1.configFingerprint === item2.configFingerprint
}

/**
 * Validate cart item quantity
 */
export function validateCartItemQuantity(quantity: number): {
  isValid: boolean
  error?: string
} {
  if (quantity < 1) {
    return { isValid: false, error: 'Quantity must be at least 1' }
  }
  
  if (quantity > 10000) {
    return { isValid: false, error: 'Quantity cannot exceed 10,000' }
  }
  
  return { isValid: true }
}

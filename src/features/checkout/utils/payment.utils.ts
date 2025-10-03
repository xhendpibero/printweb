import type { InvoiceFormData, PaymentMethod } from '../types'
import { isValidEmail, isValidPhone, isValidTaxId, isRequired } from '@/shared/utils'
import { validateAddress } from './shipment.utils'

/**
 * Validate invoice form data
 */
export function validateInvoiceForm(data: InvoiceFormData): {
  isValid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}

  // Basic fields validation
  if (!isRequired(data.firstName)) {
    errors.firstName = 'First name is required'
  }

  if (!isRequired(data.lastName)) {
    errors.lastName = 'Last name is required'
  }

  if (!isRequired(data.email)) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format'
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone number format'
  }

  // Company-specific validation
  if (data.type === 'company') {
    if (!isRequired(data.company)) {
      errors.company = 'Company name is required'
    }

    if (!isRequired(data.taxId)) {
      errors.taxId = 'Tax ID is required'
    } else if (data.taxId && !isValidTaxId(data.taxId)) {
      errors.taxId = 'Invalid tax ID format'
    }
  }

  // Address validation
  const addressValidation = validateAddress(data.address)
  if (!addressValidation.isValid) {
    Object.keys(addressValidation.errors).forEach(key => {
      errors[`address.${key}`] = addressValidation.errors[key]
    })
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Calculate payment processing fee
 */
export function calculateProcessingFee(
  amount: number,
  paymentMethod: PaymentMethod
): number {
  if (!paymentMethod.processingFee) return 0
  
  // Processing fee as percentage
  return (amount * paymentMethod.processingFee) / 100
}

/**
 * Get payment method display info
 */
export function getPaymentMethodInfo(method: PaymentMethod): {
  displayName: string
  description: string
  trustLevel: 'high' | 'medium' | 'low'
} {
  const trustLevels: Record<string, 'high' | 'medium' | 'low'> = {
    card: 'high',
    blik: 'high',
    payu: 'high',
    transfer: 'medium',
    paypal: 'high',
    cod: 'low'
  }

  return {
    displayName: method.name,
    description: method.description,
    trustLevel: trustLevels[method.id] || 'medium'
  }
}

/**
 * Check if payment method supports instant payment
 */
export function isInstantPayment(methodId: string): boolean {
  const instantMethods = ['card', 'blik', 'payu', 'paypal']
  return instantMethods.includes(methodId)
}

/**
 * Get estimated processing time for payment method
 */
export function getProcessingTime(methodId: string): string {
  const processingTimes: Record<string, string> = {
    card: 'Instant',
    blik: 'Instant',
    payu: 'Instant',
    paypal: 'Instant',
    transfer: '1-2 business days',
    cod: 'On delivery'
  }

  return processingTimes[methodId] || 'Unknown'
}

/**
 * Format invoice data for display
 */
export function formatInvoiceDisplay(data: InvoiceFormData): string {
  const parts = [
    `${data.firstName} ${data.lastName}`,
    data.company,
    data.address.street,
    `${data.address.postalCode} ${data.address.city}`,
    data.address.country
  ].filter(Boolean)

  return parts.join(', ')
}

/**
 * Generate invoice number (mock implementation)
 */
export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  
  return `INV-${year}${month}-${random}`
}

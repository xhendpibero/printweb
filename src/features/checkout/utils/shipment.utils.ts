import type { Address } from '@/shared/types'
import type { ShippingMethod, AddressFormData } from '../types'
import { isValidPhone, isValidPostalCode, isRequired } from '@/shared/utils'

/**
 * Validate address form data
 */
export function validateAddress(data: AddressFormData): {
  isValid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}

  if (!isRequired(data.firstName)) {
    errors.firstName = 'First name is required'
  }

  if (!isRequired(data.lastName)) {
    errors.lastName = 'Last name is required'
  }

  if (!isRequired(data.street)) {
    errors.street = 'Street address is required'
  }

  if (!isRequired(data.city)) {
    errors.city = 'City is required'
  }

  if (!isRequired(data.postalCode)) {
    errors.postalCode = 'Postal code is required'
  } else if (!isValidPostalCode(data.postalCode)) {
    errors.postalCode = 'Invalid postal code format (use XX-XXX)'
  }

  if (!isRequired(data.country)) {
    errors.country = 'Country is required'
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone number format'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Convert AddressFormData to Address
 */
export function createAddressFromForm(data: AddressFormData): Address {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    company: data.company,
    street: data.street,
    city: data.city,
    postalCode: data.postalCode,
    country: data.country,
    phone: data.phone
  }
}

/**
 * Format address for display
 */
export function formatAddressDisplay(address: Address): string {
  const parts = [
    `${address.firstName} ${address.lastName}`,
    address.company,
    address.street,
    `${address.postalCode} ${address.city}`,
    address.country
  ].filter(Boolean)

  return parts.join(', ')
}

/**
 * Calculate shipping cost based on method and destination
 */
export function calculateShippingCost(
  method: ShippingMethod,
  destination: Address,
  weight: number = 1
): number {
  let cost = method.price

  // Add international surcharge
  if (destination.country !== 'Poland') {
    cost += 20
  }

  // Add weight surcharge for heavy packages
  if (weight > 2) {
    cost += (weight - 2) * 5
  }

  return cost
}

/**
 * Get estimated delivery date
 */
export function getEstimatedDeliveryDate(method: ShippingMethod): string {
  const today = new Date()
  const deliveryDate = new Date(today)
  deliveryDate.setDate(today.getDate() + method.estimatedDays)

  return deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Check if address is complete
 */
export function isAddressComplete(address: Partial<Address>): boolean {
  const requiredFields: (keyof Address)[] = [
    'firstName',
    'lastName',
    'street',
    'city',
    'postalCode',
    'country'
  ]

  return requiredFields.every(field => isRequired(address[field] as string))
}

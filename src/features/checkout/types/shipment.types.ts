import type { Address } from '@/shared/types'

// Shipment specific types
export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: number
  available: boolean
}

export interface AddressFormData {
  firstName: string
  lastName: string
  company?: string
  street: string
  city: string
  postalCode: string
  country: string
  phone?: string
}

export interface ShipmentFormProps {
  addresses: Address[]
  selectedAddressId: string
  onAddressSelect: (addressId: string) => void
  onAddAddress: (address: AddressFormData) => void
}

export interface AddressCardProps {
  address: Address
  isSelected: boolean
  onSelect: () => void
}

export interface ShippingMethodCardProps {
  method: ShippingMethod
  isSelected: boolean
  onSelect: () => void
}

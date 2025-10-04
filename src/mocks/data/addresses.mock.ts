import type { UserAddress, AddressFilters } from '@/shared/types'

// Mock address data for development
export const MOCK_ADDRESSES: UserAddress[] = [
  {
    id: 'addr-001',
    type: 'shipping',
    name: 'Home Address',
    firstName: 'John',
    lastName: 'Doe',
    country: 'Poland',
    street: 'ul. Przykładowa',
    buildingNumber: '123',
    apartmentNumber: '45',
    postalCode: '00-001',
    city: 'Warsaw',
    phoneCountryCode: '+48',
    phoneNumber: '123456789',
    email: 'john.doe@example.com',
    isDefault: true,
    deliveryMethod: 'courier',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'addr-002',
    type: 'shipping',
    name: 'Office Address',
    firstName: 'John',
    lastName: 'Doe',
    companyName: 'Acme Corp',
    taxId: '1234567890',
    country: 'Poland',
    street: 'ul. Biznesowa',
    buildingNumber: '456',
    apartmentNumber: '12A',
    postalCode: '02-001',
    city: 'Warsaw',
    phoneCountryCode: '+48',
    phoneNumber: '987654321',
    email: 'office@acme.com',
    isDefault: false,
    deliveryMethod: 'inpost',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 'addr-003',
    type: 'invoice',
    name: 'Company Invoice',
    firstName: 'John',
    lastName: 'Doe',
    companyName: 'Acme Corp',
    taxId: '1234567890',
    country: 'Poland',
    street: 'ul. Biznesowa',
    buildingNumber: '456',
    postalCode: '02-001',
    city: 'Warsaw',
    isDefault: true,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 'addr-004',
    type: 'shipping',
    name: 'Parents House',
    firstName: 'John',
    lastName: 'Doe',
    country: 'Poland',
    street: 'ul. Rodzinna',
    buildingNumber: '789',
    postalCode: '30-001',
    city: 'Krakow',
    phoneCountryCode: '+48',
    phoneNumber: '555666777',
    isDefault: false,
    deliveryMethod: 'dpd_pickup',
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'addr-005',
    type: 'invoice',
    name: 'Personal Invoice',
    firstName: 'John',
    lastName: 'Doe',
    country: 'Poland',
    street: 'ul. Przykładowa',
    buildingNumber: '123',
    apartmentNumber: '45',
    postalCode: '00-001',
    city: 'Warsaw',
    isDefault: false,
    createdAt: '2024-01-01T00:00:00Z'
  }
]

// Helper to filter mock addresses
export function filterMockAddresses(addresses: UserAddress[], filters: AddressFilters) {
  return addresses.filter(address => {
    // Type filter
    if (filters.type && address.type !== filters.type) {
      return false
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matches = 
        address.name.toLowerCase().includes(searchLower) ||
        address.firstName.toLowerCase().includes(searchLower) ||
        address.lastName.toLowerCase().includes(searchLower) ||
        address.companyName?.toLowerCase().includes(searchLower) ||
        address.street.toLowerCase().includes(searchLower) ||
        address.city.toLowerCase().includes(searchLower) ||
        address.postalCode.toLowerCase().includes(searchLower)
      
      if (!matches) return false
    }

    return true
  })
}

// Helper to format address for display
export function formatAddressDisplay(address: UserAddress): string {
  const parts = [
    address.street,
    address.buildingNumber,
    address.apartmentNumber && `/${address.apartmentNumber}`,
    `${address.postalCode} ${address.city}`,
    address.companyName && `(${address.companyName})`
  ].filter(Boolean)
  
  return parts.join(' ')
}

// Helper to get default address by type
export function getDefaultAddress(addresses: UserAddress[], type: UserAddress['type']): UserAddress | undefined {
  return addresses.find(addr => addr.type === type && addr.isDefault)
}

// Backward compatibility export for existing checkout components
export const mockAddresses = MOCK_ADDRESSES
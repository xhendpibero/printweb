import type { Address } from '@/shared/types'

export const mockAddresses: Address[] = [
  {
    firstName: 'Jan',
    lastName: 'Kowalski',
    company: 'Tech Solutions Sp. z o.o.',
    street: 'ul. Marszałkowska 123/45',
    city: 'Warszawa',
    postalCode: '00-001',
    country: 'Poland',
    phone: '+48 123 456 789'
  },
  {
    firstName: 'Anna',
    lastName: 'Nowak',
    street: 'ul. Floriańska 15',
    city: 'Kraków',
    postalCode: '31-021',
    country: 'Poland',
    phone: '+48 987 654 321'
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    company: 'International Corp.',
    street: '123 Business Street',
    city: 'Berlin',
    postalCode: '10115',
    country: 'Germany',
    phone: '+49 30 12345678'
  }
]

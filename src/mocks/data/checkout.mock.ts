import type { CheckoutItem, ShippingOption, PaymentMethod, InvoiceData } from '../../shared/types'

export const mockCheckoutItems: CheckoutItem[] = [
  {
    itemId: 'item-1',
    productName: 'Business Cards Standard',
    slug: 'business-cards-standard',
    quantity: 1000,
    configuration: 'Standard (85x55mm) • Coated 350g/m² • 4+4 (Full Color) • UV Coating',
    unitPrice: 0.12,
    totalPrice: 120.00,
    thumbnail: '/images/products/business-cards-1.webp',
    files: []
  },
  {
    itemId: 'item-2',
    productName: 'Flyers A5',
    slug: 'flyers-a5',
    quantity: 500,
    configuration: 'A5 (148x210mm) • Uncoated 130g/m² • 4+0 (Color Front)',
    unitPrice: 0.35,
    totalPrice: 175.00,
    thumbnail: '/images/products/flyers-1.jpg',
    files: []
  }
]

export const mockShippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    description: '3-5 business days',
    price: 15.00,
    estimatedDays: 4,
    available: true
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: '1-2 business days',
    price: 25.00,
    estimatedDays: 1,
    available: true
  },
  {
    id: 'pickup',
    name: 'Pickup at Location',
    description: 'Pick up from our facility',
    price: 0.00,
    estimatedDays: 1,
    available: true
  }
]

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: '💳',
    available: true
  },
  {
    id: 'blik',
    name: 'BLIK',
    description: 'Mobile payment system',
    icon: '📱',
    available: true
  },
  {
    id: 'transfer',
    name: 'Bank Transfer',
    description: 'Traditional wire transfer',
    icon: '🏛️',
    available: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: '🅿️',
    available: true,
    processingFee: 2.9
  }
]

export const mockInvoiceData: InvoiceData = {
  type: 'individual',
  firstName: 'Jan',
  lastName: 'Kowalski',
  email: 'jan.kowalski@example.com',
  phone: '+48 123 456 789',
  address: {
    firstName: 'Jan',
    lastName: 'Kowalski',
    street: 'ul. Przykładowa 123',
    city: 'Warszawa',
    postalCode: '00-001',
    country: 'Poland',
    phone: '+48 123 456 789'
  }
}

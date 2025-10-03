import type { CartItem } from '../../shared/types'

export const mockCartItems: CartItem[] = [
  {
    itemId: 'item-1',
    slug: 'business-cards-standard',
    quantity: 1000,
    configuration: {
      format: 'Standard (85x55mm)',
      paper: 'Coated 350g/m²',
      colors: '4+4 (Full Color)',
      finishings: ['UV Coating']
    },
    priceVersion: 1,
    configFingerprint: 'bc-std-350-4c-uv',
    thumbnail: '/images/products/business-cards-1.webp',
    shippingOption: 'EXPRESS',
    orderName: 'Business Cards - Marketing Team'
  },
  {
    itemId: 'item-2',
    slug: 'flyers-a5',
    quantity: 500,
    configuration: {
      format: 'A5 (148x210mm)',
      paper: 'Uncoated 130g/m²',
      colors: '4+0 (Color Front)',
      finishings: []
    },
    priceVersion: 1,
    configFingerprint: 'fly-a5-130-4c',
    thumbnail: '/images/products/flyers-1.jpg'
  },
  {
    itemId: 'item-3',
    slug: 'poster-a3',
    quantity: 50,
    configuration: {
      format: 'A3 (297x420mm)',
      paper: 'Coated 200g/m²',
      colors: '4+0 (Color Front)',
      finishings: ['Lamination']
    },
    priceVersion: 1,
    configFingerprint: 'pos-a3-200-4c-lam',
    thumbnail: '/public/products/poster.webp',
    orderName: 'Event Posters'
  }
]

export const mockEmptyCart: CartItem[] = []

import type { CartItem } from '@/types'

// Demo items used to prefill the cart for UI development.
// These are only added by the CartDemoSeed component when the cart is empty.
export const SAMPLE_CART_ITEMS: Array<Omit<CartItem, 'itemId'>> = [
  {
    slug: 'pocket-calendars',
    quantity: 250,
    configuration: {
      format: '85 x 55 mm',
      paper: 'matte 350g',
      colors: '4/4',
      finishings: ['glossy foil both sides'],
    },
    priceVersion: 1,
    configFingerprint: 'pocket-85x55-350g-4_4-glossy',
    thumbnail: '/products/wizytowki-standardowe.webp',
    shippingOption: 'standard',
  },
  {
    slug: 'saddle-stitched-catalogs',
    quantity: 1000,
    configuration: {
      format: 'A4 - 210 x 297 mm',
      paper: 'cover gloss 130g, inner gloss 130g',
      colors: '4/4',
      finishings: ['long edge saddle stitch', '4 + 4 pages'],
    },
    priceVersion: 1,
    configFingerprint: 'catalog-a4-130g-4_4-stitch',
    thumbnail: '/products/etykiety-do-aplikacji-recznej.webp',
    shippingOption: 'standard',
  },
]


import type { DiscountProgram, Promotion } from '@/shared/types'

// Mock discount program data
export const MOCK_DISCOUNT_PROGRAM: DiscountProgram = {
  programId: 'loyalty-gold',
  name: 'Gold Member',
  currentDiscountPct: 15,
  nextTier: {
    name: 'Platinum Member',
    threshold: 5000,
    discountPct: 20
  }
}

// Mock promotions data
export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-001',
    name: 'New Year Special',
    description: 'Get 25% off on all business cards and flyers during January',
    startsAt: '2024-01-01T00:00:00Z',
    endsAt: '2024-01-31T23:59:59Z',
    status: 'active',
    conditions: [
      'Minimum order value: 100 PLN',
      'Valid for business cards and flyers only',
      'Cannot be combined with other offers'
    ]
  },
  {
    id: 'promo-002',
    name: 'Bulk Order Discount',
    description: 'Extra 10% off when ordering 1000+ items',
    startsAt: '2024-01-01T00:00:00Z',
    endsAt: '2024-12-31T23:59:59Z',
    status: 'active',
    conditions: [
      'Minimum quantity: 1000 items',
      'Applies to all products',
      'Stackable with membership discounts'
    ]
  },
  {
    id: 'promo-003',
    name: 'Valentine\'s Day Special',
    description: 'Special pricing on wedding invitations and greeting cards',
    startsAt: '2024-02-01T00:00:00Z',
    endsAt: '2024-02-14T23:59:59Z',
    status: 'upcoming',
    conditions: [
      'Valid for wedding invitations and greeting cards',
      '20% off regular prices',
      'Free shipping on orders over 200 PLN'
    ]
  },
  {
    id: 'promo-004',
    name: 'Christmas Campaign',
    description: 'Holiday season special offers on all greeting cards',
    startsAt: '2023-12-01T00:00:00Z',
    endsAt: '2023-12-31T23:59:59Z',
    status: 'expired',
    conditions: [
      'Valid for greeting cards only',
      '30% off regular prices',
      'Limited time offer'
    ]
  }
]

// Mock user spending data for next tier calculation
export const MOCK_USER_SPENDING = {
  currentYearSpending: 3250, // PLN
  nextTierThreshold: 5000 // PLN
}

// Helper to get active promotions
export function getActivePromotions(promotions: Promotion[]): Promotion[] {
  return promotions.filter(promo => promo.status === 'active')
}

// Helper to get upcoming promotions
export function getUpcomingPromotions(promotions: Promotion[]): Promotion[] {
  return promotions.filter(promo => promo.status === 'upcoming')
}

// Helper to calculate amount needed for next tier
export function getAmountToNextTier(currentSpending: number, nextTierThreshold: number): number {
  return Math.max(0, nextTierThreshold - currentSpending)
}

// Helper to format promotion status
export function getPromotionStatusColor(status: Promotion['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'expired':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Helper to check if promotion is valid now
export function isPromotionValid(promotion: Promotion): boolean {
  const now = new Date()
  const startDate = new Date(promotion.startsAt)
  const endDate = new Date(promotion.endsAt)
  
  return now >= startDate && now <= endDate
}

'use client'

import { useState } from 'react'
import { Percent, Gift, Tag, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useDiscountsTranslations } from '@/shared/hooks'
import type { CouponRedeemResponse } from '@/shared/types'
import { 
  MOCK_DISCOUNT_PROGRAM, 
  MOCK_PROMOTIONS, 
  MOCK_USER_SPENDING,
  getActivePromotions,
  getUpcomingPromotions,
  getAmountToNextTier,
  getPromotionStatusColor
} from '@/mocks/data/discounts.mock'

export function DiscountsPageContainer() {
  const t = useDiscountsTranslations()
  
  const [couponCode, setCouponCode] = useState('')
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const activePromotions = getActivePromotions(MOCK_PROMOTIONS)
  const upcomingPromotions = getUpcomingPromotions(MOCK_PROMOTIONS)
  const amountToNextTier = getAmountToNextTier(MOCK_USER_SPENDING.currentYearSpending, MOCK_USER_SPENDING.nextTierThreshold)

  const handleRedeemCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!couponCode.trim()) return

    setIsRedeeming(true)
    setCouponMessage(null)

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock response based on coupon code
      const mockResponse: CouponRedeemResponse = couponCode.toLowerCase() === 'save10' 
        ? { accepted: true, message: 'Coupon applied successfully!', discountPct: 10, promotionId: 'coupon-save10' }
        : { accepted: false, message: 'Invalid coupon code' }

      if (mockResponse.accepted) {
        setCouponMessage({ type: 'success', text: mockResponse.message })
        setCouponCode('')
      } else {
        setCouponMessage({ type: 'error', text: mockResponse.message })
      }
    } catch {
      setCouponMessage({ type: 'error', text: 'Failed to redeem coupon. Please try again.' })
    } finally {
      setIsRedeeming(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />
      case 'upcoming':
        return <Clock className="h-4 w-4" />
      case 'expired':
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-2 text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Discount Program */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Percent className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold">{t('program.title')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Discount */}
              <div>
                <div className="text-3xl font-bold mb-1">
                  {MOCK_DISCOUNT_PROGRAM.currentDiscountPct}%
                </div>
                <div className="text-indigo-100 mb-3">{t('program.currentDiscount')}</div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-sm text-indigo-100 mb-1">{MOCK_DISCOUNT_PROGRAM.name}</div>
                  <div className="text-white font-medium">Active on all orders</div>
                </div>
              </div>

              {/* Next Tier */}
              {MOCK_DISCOUNT_PROGRAM.nextTier && (
                <div>
                  <div className="text-3xl font-bold mb-1">
                    {MOCK_DISCOUNT_PROGRAM.nextTier.discountPct}%
                  </div>
                  <div className="text-indigo-100 mb-3">{t('program.nextTier')}</div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-sm text-indigo-100 mb-1">{MOCK_DISCOUNT_PROGRAM.nextTier.name}</div>
                    <div className="text-white font-medium">
                      {t('program.spend')} {amountToNextTier} PLN {t('program.more')} {t('program.toNextTier')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Promotions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">{t('promotions.title')}</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">{t('promotions.subtitle')}</p>
            </div>

            <div className="p-6">
              {activePromotions.length > 0 ? (
                <div className="space-y-4">
                  {activePromotions.map((promotion) => (
                    <div key={promotion.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{promotion.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{promotion.description}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPromotionStatusColor(promotion.status)}`}>
                          {getStatusIcon(promotion.status)}
                          {t(`promotions.${promotion.status}`)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {t('promotions.validUntil')} {formatDate(promotion.endsAt)}
                        </div>
                      </div>

                      {promotion.conditions && promotion.conditions.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-2">{t('promotions.conditions')}:</div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {promotion.conditions.map((condition, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>{condition}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Gift className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">{t('promotions.empty')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Promotions */}
          {upcomingPromotions.length > 0 && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Promotions</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {upcomingPromotions.map((promotion) => (
                    <div key={promotion.id} className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{promotion.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{promotion.description}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPromotionStatusColor(promotion.status)}`}>
                          {getStatusIcon(promotion.status)}
                          {t(`promotions.${promotion.status}`)}
                        </span>
                      </div>

                      <div className="text-sm text-gray-500">
                        Starts {formatDate(promotion.startsAt)} - Ends {formatDate(promotion.endsAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Coupon Redemption */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg sticky top-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-medium text-gray-900">{t('coupon.title')}</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">{t('coupon.subtitle')}</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleRedeemCoupon} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={t('coupon.placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={isRedeeming}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!couponCode.trim() || isRedeeming}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRedeeming ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      {t('coupon.redeeming')}
                    </>
                  ) : (
                    <>
                      <Tag className="h-4 w-4" />
                      {t('coupon.redeem')}
                    </>
                  )}
                </button>

                {couponMessage && (
                  <div className={`p-3 rounded-md text-sm ${
                    couponMessage.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {couponMessage.text}
                  </div>
                )}
              </form>

              {/* Helpful tip */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <strong>Tip:</strong> Try coupon code &quot;SAVE10&quot; for a 10% discount!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

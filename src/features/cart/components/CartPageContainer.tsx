'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCartTranslations } from '@/shared/hooks'
import { useCartStore } from '@/stores/cart-store'
import { CartList } from '@/components/cart/CartList'
import { CartSummary } from '@/components/cart/CartSummary'
import { CartDemoSeed } from '@/components/cart/CartDemoSeed'

export function CartPageContainer() {
  const params = useParams()
  const locale = params.locale as string
  const t = useCartTranslations()
  
  // Trigger client store hydration for SSR safety
  useCartStore.getState()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CartDemoSeed />
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div className="space-y-6">
          <CartList />
          
          {/* Back to Shop Link */}
          <div className="pt-4 border-t border-gray-200">
            <Link 
              href={`/${locale}`} 
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('continueShopping')}
            </Link>
          </div>
        </div>

        {/* Cart Summary */}
        <CartSummary />
      </div>
    </div>
  )
}

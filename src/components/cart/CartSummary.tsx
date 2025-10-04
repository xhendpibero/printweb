"use client"

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCartTranslations } from '@/shared/hooks'
import type { Currency } from '@/shared/types'
import { formatMoney } from '@/shared/utils'
import { useCartStore } from '@/stores/cart-store'
import { useCartCalculations } from '@/features/cart/hooks'
import { CurrencyToggle } from './CurrencyToggle'
import { DiscountCode } from './DiscountCode'

export function CartSummary() {
  const params = useParams()
  const locale = params.locale as string
  const t = useCartTranslations()
  const currency = useCartStore((s) => s.currency) as Currency
  const calculations = useCartCalculations()

  return (
    <aside className="w-full md:w-80 lg:w-96 md:sticky md:top-4">
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t('summary')}</h2>
          <CurrencyToggle />
        </div>

        {/* Discount code input */}
        <div className="mb-4">
          <DiscountCode 
            onApplied={(code, discount) => {
              console.log('Discount applied:', code, discount)
              // TODO: Update cart totals when backend is ready
            }}
          />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">{t('printingCostNet')}</span>
            <span className="font-medium">{formatMoney(calculations.printingNet, currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">{t('deliveryCostNet')}</span>
            <span className="font-medium">{formatMoney(calculations.deliveryNet, currency)}</span>
          </div>
          <div className="pt-2 border-t flex items-center justify-between text-base">
            <span className="text-gray-800">{t('netPrice')}</span>
            <span className="font-semibold">{formatMoney(calculations.totalNet, currency)}</span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-800">{t('grossPrice')}</span>
            <span className="font-semibold">{formatMoney(calculations.totalGross, currency)}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <Link
            href={`/${locale}/order/upload`}
            className="block text-center w-full rounded-full bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-700"
          >
            {t('uploadFile')}
          </Link>
          <Link
            href={`/${locale}/order/summary`}
            className="block text-center w-full rounded-full border border-gray-300 text-gray-800 py-3 font-medium hover:bg-gray-50"
          >
            {t('finishLater')}
          </Link>
          <div className="text-center">
            <button className="text-xs text-gray-500 hover:text-gray-700 underline">
              {t('finishLaterHelp')}
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

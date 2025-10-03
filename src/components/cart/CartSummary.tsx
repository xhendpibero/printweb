"use client"

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'
import { CurrencyToggle } from './CurrencyToggle'
import { DiscountCode } from './DiscountCode'

function formatMoney(amount: number, currency: 'PLN'|'EUR') {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

export function CartSummary() {
  const params = useParams()
  const locale = params.locale as string
  const currency = useCartStore((s) => s.currency)
  const total = useCartStore((s) => s.getTotalPrice())

  return (
    <aside className="w-full md:w-80 lg:w-96 md:sticky md:top-4">
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Summary</h2>
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
            <span className="text-gray-600">Printing cost (net)</span>
            <span className="font-medium">{formatMoney(total * 0.82, currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Delivery cost (net)</span>
            <span className="font-medium">{formatMoney(15.00, currency)}</span>
          </div>
          <div className="pt-2 border-t flex items-center justify-between text-base">
            <span className="text-gray-800">Net price</span>
            <span className="font-semibold">{formatMoney(total + 15.00, currency)}</span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-800">Gross price (VAT 23%)</span>
            <span className="font-semibold">{formatMoney((total + 15.00) * 1.23, currency)}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <Link
            href={`/${locale}/order/upload`}
            className="block text-center w-full rounded-full bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-700"
          >
            Upload file
          </Link>
          <Link
            href={`/${locale}/order/summary`}
            className="block text-center w-full rounded-full border border-gray-300 text-gray-800 py-3 font-medium hover:bg-gray-50"
          >
            Finish later
          </Link>
          <div className="text-center">
            <button className="text-xs text-gray-500 hover:text-gray-700 underline">
              What is the &ldquo;Finish later&rdquo; option?
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

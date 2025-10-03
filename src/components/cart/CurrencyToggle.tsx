"use client"

import { useCurrency } from '@/hooks/cart/useCurrency'

export function CurrencyToggle() {
  const { currency, setCurrency, isLoading } = useCurrency()

  const options: Array<typeof currency> = ['PLN', 'EUR']

  return (
    <div className="inline-flex gap-2 rounded-full bg-gray-100 p-1 text-sm">
      {options.map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          disabled={isLoading}
          className={
            'px-3 py-1 rounded-full transition-colors disabled:opacity-50 ' +
            (currency === c
              ? 'bg-gray-900 text-white'
              : 'bg-transparent text-gray-700 hover:bg-white')
          }
          aria-pressed={currency === c}
        >
          {c}
        </button>
      ))}
    </div>
  )
}


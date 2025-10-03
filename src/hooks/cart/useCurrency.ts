// Currency management hook for cart

import { useCartStore } from '@/stores/cart-store'
import { useCartMutations } from './useCart'

export function useCurrency() {
  const currency = useCartStore((state) => state.currency)
  const { setCurrency } = useCartMutations()

  const toggleCurrency = () => {
    const newCurrency = currency === 'PLN' ? 'EUR' : 'PLN'
    setCurrency.mutate(newCurrency)
  }

  const formatMoney = (amount: number, targetCurrency?: 'PLN' | 'EUR') => {
    const currencyToUse = targetCurrency || currency
    
    try {
      return new Intl.NumberFormat(undefined, { 
        style: 'currency', 
        currency: currencyToUse 
      }).format(amount)
    } catch {
      return `${currencyToUse} ${amount.toFixed(2)}`
    }
  }

  return {
    currency,
    setCurrency: setCurrency.mutate,
    toggleCurrency,
    formatMoney,
    isLoading: setCurrency.isPending,
    error: setCurrency.error,
  }
}

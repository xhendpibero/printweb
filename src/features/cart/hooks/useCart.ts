import { useMemo } from 'react'
import type { CartCalculations } from '@/shared/types'
import { useCartStore } from '@/stores/cart-store'
import { calculateCartTotals } from '../utils'

/**
 * Hook for cart calculations and totals
 */
export function useCartCalculations(): CartCalculations {
  const items = useCartStore((state) => state.items)
  
  return useMemo(() => {
    return calculateCartTotals(items)
  }, [items])
}

/**
 * Hook for cart item count
 */
export function useCartItemCount(): number {
  return useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )
}

/**
 * Hook for cart operations with optimistic updates
 */
export function useCartOperations() {
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity)
  const updateItemOrderName = useCartStore((state) => state.updateItemOrderName)
  const clearCart = useCartStore((state) => state.clearCart)
  
  return {
    addItem,
    removeItem,
    updateItemQuantity,
    updateItemOrderName,
    clearCart
  }
}

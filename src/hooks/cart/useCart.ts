// Cart hooks for React Query integration
// Based on docs/cart/CONVENTIONS.md query key structure

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mockCartApi } from '@/lib/api/cart'
import { useCartStore } from '@/stores/cart-store'
import { addToast } from '@/components/ui/Toast'

// Query keys following the convention: ['order', 'cart']
export const cartKeys = {
  all: ['order'] as const,
  cart: () => [...cartKeys.all, 'cart'] as const,
}

// Get cart data (currently uses Zustand store, will integrate with API later)
export function useCart() {
  const cartStore = useCartStore()
  
  return useQuery({
    queryKey: cartKeys.cart(),
    queryFn: async () => {
      // For now, return data from Zustand store
      // TODO: Replace with actual API call when backend is ready
      const mockResponse = await mockCartApi.getCart()
      
      if (mockResponse.ok) {
        return {
          ...mockResponse.data,
          items: cartStore.items, // Use Zustand store items
          currency: cartStore.currency,
          totalNet: cartStore.getTotalPrice(),
          totalGross: cartStore.getTotalPrice() * 1.23
        }
      }
      
      throw new Error('Failed to fetch cart')
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Cart mutations
export function useCartMutations() {
  const queryClient = useQueryClient()
  const cartStore = useCartStore()

  const duplicateItem = useMutation({
    mutationFn: async (itemId: string) => {
      // TODO: Replace with actual API call
      const response = await mockCartApi.duplicateItem(itemId)
      
      if (response.ok) {
        // For now, duplicate in Zustand store
        const item = cartStore.items.find(i => i.itemId === itemId)
        if (item) {
          const { itemId, ...itemWithoutId } = item
          console.log('Duplicating item:', itemId)
          cartStore.addItem(itemWithoutId)
        }
        return response.data
      }
      
      throw new Error('Failed to duplicate item')
    },
    onSuccess: () => {
      // Invalidate cart query to refetch data
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() })
      addToast({
        type: 'success',
        title: 'Item duplicated',
        message: 'Product has been duplicated in your cart'
      })
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Failed to duplicate item',
        message: error.message
      })
    },
  })

  const removeItem = useMutation({
    mutationFn: async (itemId: string) => {
      // TODO: Replace with actual API call
      const response = await mockCartApi.removeItem(itemId)
      
      if (response.ok) {
        // For now, remove from Zustand store
        cartStore.removeItem(itemId)
        return response.data
      }
      
      throw new Error('Failed to remove item')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() })
      addToast({
        type: 'info',
        title: 'Item removed',
        message: 'Product has been removed from your cart'
      })
    },
  })

  const setOrderName = useMutation({
    mutationFn: async ({ itemId, orderName }: { itemId: string; orderName: string }) => {
      // TODO: Replace with actual API call
      const response = await mockCartApi.setOrderName(itemId, orderName)
      
      if (response.ok) {
        // For now, update in Zustand store
        cartStore.updateItemOrderName(itemId, orderName)
        return response.data
      }
      
      throw new Error('Failed to set order name')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() })
    },
  })

  const applyDiscount = useMutation({
    mutationFn: async (code: string) => {
      const response = await mockCartApi.applyDiscount(code)
      
      if (!response.ok) {
        throw new Error(response.error.message)
      }
      
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() })
    },
  })

  const setCurrency = useMutation({
    mutationFn: async (currency: 'PLN' | 'EUR') => {
      // TODO: Replace with actual API call
      const response = await mockCartApi.setCurrency(currency)
      
      if (response.ok) {
        // For now, update in Zustand store
        cartStore.setCurrency(currency)
        return response.data
      }
      
      throw new Error('Failed to set currency')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() })
    },
  })

  return {
    duplicateItem,
    removeItem,
    setOrderName,
    applyDiscount,
    setCurrency,
  }
}

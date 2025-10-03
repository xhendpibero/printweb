import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartState, CartItem } from '@/types'

interface CartStore extends CartState {
  addItem: (item: Omit<CartItem, 'itemId'>) => void
  removeItem: (itemId: string) => void
  updateItemQuantity: (itemId: string, quantity: number) => void
  updateItemOrderName: (itemId: string, orderName: string) => void
  setCurrency: (currency: CartState['currency']) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      currency: 'PLN',
      shippingOption: undefined,

      addItem: (item) => {
        const itemId = `${item.slug}-${item.configFingerprint}`
        const existingItem = get().items.find(i => i.itemId === itemId)
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(i =>
              i.itemId === itemId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          }))
        } else {
          set(state => ({
            items: [...state.items, { ...item, itemId }]
          }))
        }
      },

      removeItem: (itemId) => {
        set(state => ({
          items: state.items.filter(item => item.itemId !== itemId)
        }))
      },

      updateItemQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.itemId === itemId ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [], shippingOption: undefined })
      },

      updateItemOrderName: (itemId, orderName) => {
        set(state => ({
          items: state.items.map(item =>
            item.itemId === itemId ? { ...item, orderName } : item
          )
        }))
      },

      setCurrency: (currency) => {
        set({ currency })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        // This would integrate with the pricing engine
        // For now, return a placeholder
        return get().items.reduce((total, item) => {
          // Base price calculation - would be replaced with actual pricing engine
          const basePrice = 10.00 // placeholder
          return total + (basePrice * item.quantity)
        }, 0)
      }
    }),
    {
      name: 'drukarnia-cart',
      version: 1,
    }
  )
)

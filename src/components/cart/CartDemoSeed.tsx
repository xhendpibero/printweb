"use client"

import { useEffect } from 'react'
import { useCartStore } from '@/stores/cart-store'
import { SAMPLE_CART_ITEMS } from '@/data/sample-cart'

// Seeds the cart with sample items the first time the user visits
// and their cart is empty. Safe to include on the cart page only.
export function CartDemoSeed() {
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    if (items.length === 0) {
      SAMPLE_CART_ITEMS.forEach((it) => addItem(it))
    }
    // we intentionally don't include addItem in deps to avoid reseeding
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  return null
}


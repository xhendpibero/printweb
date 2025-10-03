"use client"

import Link from 'next/link'
import { ShoppingBag, Search } from 'lucide-react'
import { useCartStore } from '@/stores/cart-store'
import { CartItem } from './CartItem'

export function CartList() {
  const items = useCartStore((s) => s.items)

  if (!items.length) {
    return (
      <div className="p-8 text-center border rounded-lg bg-gray-50">
        <div className="max-w-sm mx-auto">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-sm text-gray-500 mb-6">
            Start adding products to your cart to see them here. Browse our catalog to find what you need.
          </p>
          <div className="space-y-3">
            <Link
              href="../search"
              className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
            >
              <Search className="w-4 h-4" />
              Browse Products
            </Link>
            <Link
              href="../"
              className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-products">
      {items.map((it) => (
        <CartItem key={it.itemId} item={it} />
      ))}
    </div>
  )
}

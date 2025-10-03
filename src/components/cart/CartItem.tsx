"use client"

import { useState } from 'react'
import type { CartItem as TCartItem } from '@/types'
import { useCartStore } from '@/stores/cart-store'
import { useCartMutations } from '@/hooks/cart/useCart'
import { CartItemMenu } from './CartItemMenu'
import { ConfigurationModal } from './ConfigurationModal'
import { OrderNameInput } from './OrderNameInput'
import Image from 'next/image'

export function CartItem({ item }: { item: TCartItem }) {
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQty = useCartStore((s) => s.updateItemQuantity)
  const updateOrderName = useCartStore((s) => s.updateItemOrderName)
  const { duplicateItem } = useCartMutations()
  const [showConfigModal, setShowConfigModal] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-200 gap-4 sm:gap-0">
      <div className="flex items-center gap-4 min-w-0">
        {/* Product thumbnail */}
        <div className="h-14 w-14 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
          {item.thumbnail ? (
            <Image 
              src={item.thumbnail} 
              alt={item.slug}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="font-medium text-gray-900 truncate">{item.slug.replace(/-/g, ' ')}</div>
          <div className="text-sm text-gray-500 truncate">
            Quantity: {item.quantity} copies
          </div>
          <button 
            onClick={() => setShowConfigModal(true)}
            className="text-xs text-blue-600 hover:text-blue-800 hover:underline text-left truncate"
          >
            {item.configuration.format} • {item.configuration.paper} • {item.configuration.colors}
          </button>
          {item.shippingOption && (
            <div className="text-xs text-blue-600 font-medium mt-1">
              <span className="bg-blue-100 px-2 py-0.5 rounded-full uppercase">
                {item.shippingOption}
              </span>
            </div>
          )}
          
          {/* Order Name Input */}
          <OrderNameInput
            itemId={item.itemId}
            currentName={item.orderName}
            onSave={(name) => updateOrderName(item.itemId, name)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            className="px-2 py-1 text-gray-700 hover:bg-gray-50"
            onClick={() => updateQty(item.itemId, Math.max(1, item.quantity - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            className="w-12 text-center py-1 text-sm outline-none"
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => updateQty(item.itemId, Math.max(1, Number(e.target.value) || 1))}
            aria-label="Quantity"
          />
          <button
            className="px-2 py-1 text-gray-700 hover:bg-gray-50"
            onClick={() => updateQty(item.itemId, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        <CartItemMenu
          itemId={item.itemId}
          onDuplicate={() => {
            duplicateItem.mutate(item.itemId)
          }}
          onEdit={() => {
            // TODO: Navigate to product configuration page
            console.log('Edit item:', item.itemId)
          }}
          onAddOrderName={() => {
            // Order name input is now inline, so this just focuses it
            console.log('Add order name for:', item.itemId)
          }}
          onRemove={() => removeItem(item.itemId)}
          isLoading={duplicateItem.isPending}
        />
      </div>

      {/* Configuration Modal */}
      <ConfigurationModal
        item={item}
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
      />
    </div>
  )
}


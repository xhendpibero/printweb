'use client'

import Image from 'next/image'
import type { OrderReviewSectionProps } from '../types'
import { formatMoney } from '@/shared/utils'

export function OrderReviewSection({ items, currency }: OrderReviewSectionProps) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.itemId} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.productName}</h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-xs text-gray-500">{item.configuration}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${item.hasFiles ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                <span className={`text-xs ${item.hasFiles ? 'text-green-600' : 'text-orange-600'}`}>
                  {item.hasFiles ? 'Files uploaded' : 'Files required'}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-medium text-gray-900">
                {formatMoney(item.totalPrice, currency)}
              </p>
              <p className="text-sm text-gray-500">
                {formatMoney(item.unitPrice, currency)} each
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

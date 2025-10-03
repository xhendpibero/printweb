'use client'

import { Truck, Clock } from 'lucide-react'
import type { ShippingMethodCardProps } from '../types'
import { formatMoney } from '@/shared/utils'
import { getEstimatedDeliveryDate } from '../utils'

export function ShippingMethodCard({ method, isSelected, onSelect }: ShippingMethodCardProps) {
  const deliveryDate = getEstimatedDeliveryDate(method)

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
          : method.available
          ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
      }`}
      onClick={method.available ? onSelect : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-medium text-gray-900">{method.name}</h3>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Delivery by {deliveryDate}</span>
          </div>
          
          {!method.available && (
            <p className="text-sm text-red-600 mt-2">Currently unavailable</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {formatMoney(method.price, 'PLN')}
            </p>
            <p className="text-xs text-gray-500">
              {method.estimatedDays} {method.estimatedDays === 1 ? 'day' : 'days'}
            </p>
          </div>
          
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              isSelected
                ? 'border-indigo-500 bg-indigo-500'
                : 'border-gray-300'
            }`}
          >
            {isSelected && (
              <div className="w-full h-full rounded-full bg-white scale-50"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

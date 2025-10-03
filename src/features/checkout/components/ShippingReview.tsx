'use client'

import { MapPin, Truck } from 'lucide-react'
import type { ShippingReviewProps } from '../types'
import { formatMoney } from '@/shared/utils'

export function ShippingReview({ address, method, cost, estimatedDelivery, currency }: ShippingReviewProps) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
      
      <div className="space-y-4">
        {/* Shipping Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Delivery Address</h3>
            <div className="text-sm text-gray-600 mt-1">
              <p>{address.firstName} {address.lastName}</p>
              {address.company && <p>{address.company}</p>}
              <p>{address.street}</p>
              <p>{address.postalCode} {address.city}</p>
              <p>{address.country}</p>
              {address.phone && <p>{address.phone}</p>}
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Shipping Method</h3>
            <div className="text-sm text-gray-600 mt-1">
              <p>{method}</p>
              <p>Estimated delivery: {estimatedDelivery}</p>
              <p className="font-medium text-gray-900">
                Cost: {formatMoney(cost, currency)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Check } from 'lucide-react'
import type { PaymentMethodCardProps } from '../types'
import { getPaymentMethodInfo, getProcessingTime } from '../utils'

export function PaymentMethodCard({ method, isSelected, onSelect }: PaymentMethodCardProps) {
  const methodInfo = getPaymentMethodInfo(method)
  const processingTime = getProcessingTime(method.id)

  return (
    <label
      className={`relative block p-4 border rounded-lg cursor-pointer transition-colors ${
        !method.available
          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
          : isSelected
          ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <input
        type="radio"
        name="payment-method"
        value={method.id}
        checked={isSelected}
        onChange={onSelect}
        disabled={!method.available}
        className="sr-only"
      />
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{method.icon}</span>
          <div>
            <h3 className="font-medium text-gray-900">{methodInfo.displayName}</h3>
            <p className="text-sm text-gray-600">{methodInfo.description}</p>
            <p className="text-xs text-gray-500 mt-1">Processing: {processingTime}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {method.processingFee && (
            <span className="text-xs text-orange-600 font-medium">
              +{method.processingFee}% fee
            </span>
          )}
          
          {isSelected && (
            <Check className="w-5 h-5 text-indigo-600" />
          )}
          
          {!method.available && (
            <span className="text-xs text-red-600 font-medium">Unavailable</span>
          )}
        </div>
      </div>
    </label>
  )
}

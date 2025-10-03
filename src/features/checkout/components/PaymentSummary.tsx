'use client'

import type { PaymentSummaryProps } from '../types'
import { formatMoney } from '@/shared/utils'
import { calculateProcessingFee } from '../utils'

export function PaymentSummary({ 
  subtotal, 
  shipping, 
  tax, 
  total, 
  currency, 
  paymentMethod 
}: PaymentSummaryProps) {
  const processingFee = paymentMethod ? calculateProcessingFee(total, paymentMethod) : 0
  const finalTotal = total + processingFee

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">{formatMoney(subtotal, currency)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-medium">{formatMoney(shipping, currency)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (VAT 23%):</span>
          <span className="font-medium">{formatMoney(tax, currency)}</span>
        </div>
        
        {processingFee > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              Processing fee ({paymentMethod?.name}):
            </span>
            <span className="font-medium text-orange-600">
              {formatMoney(processingFee, currency)}
            </span>
          </div>
        )}
        
        <div className="border-t pt-3 flex justify-between text-base">
          <span className="font-semibold text-gray-900">Total:</span>
          <span className="font-bold text-gray-900">
            {formatMoney(finalTotal, currency)}
          </span>
        </div>
      </div>

      {paymentMethod && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">{paymentMethod.icon}</span>
            <span>Payment via {paymentMethod.name}</span>
          </div>
          {processingFee > 0 && (
            <p className="text-xs text-orange-600 mt-1">
              Additional {paymentMethod.processingFee}% processing fee applies
            </p>
          )}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Secure SSL encrypted payment</span>
        </div>
      </div>
    </div>
  )
}

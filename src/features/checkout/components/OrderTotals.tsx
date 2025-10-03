'use client'

import type { OrderTotalsProps } from '../types'
import { formatMoney } from '@/shared/utils'

export function OrderTotals({ totals }: OrderTotalsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Total</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">{formatMoney(totals.subtotal, totals.currency)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-medium">{formatMoney(totals.shipping, totals.currency)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (VAT 23%):</span>
          <span className="font-medium">{formatMoney(totals.tax, totals.currency)}</span>
        </div>
        
        <div className="border-t pt-3 flex justify-between text-base">
          <span className="font-semibold text-gray-900">Total:</span>
          <span className="font-bold text-gray-900">
            {formatMoney(totals.total, totals.currency)}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>All prices include VAT</span>
        </div>
      </div>
    </div>
  )
}

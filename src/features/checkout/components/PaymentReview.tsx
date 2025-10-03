'use client'

import { CreditCard, Building } from 'lucide-react'
import type { PaymentReviewProps } from '../types'

export function PaymentReview({ method, invoice }: PaymentReviewProps) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Payment & Invoice</h2>
      
      <div className="space-y-4">
        {/* Payment Method */}
        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Payment Method</h3>
            <p className="text-sm text-gray-600 mt-1">{method}</p>
          </div>
        </div>

        {/* Invoice Information */}
        <div className="flex items-start gap-3">
          <Building className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">
              Invoice ({invoice.type === 'company' ? 'Company' : 'Individual'})
            </h3>
            <div className="text-sm text-gray-600 mt-1">
              <p>{invoice.name}</p>
              <p>{invoice.email}</p>
              {invoice.company && <p>{invoice.company}</p>}
              {invoice.taxId && <p>Tax ID: {invoice.taxId}</p>}
              <div className="mt-2">
                <p>{invoice.address.street}</p>
                <p>{invoice.address.postalCode} {invoice.address.city}</p>
                <p>{invoice.address.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

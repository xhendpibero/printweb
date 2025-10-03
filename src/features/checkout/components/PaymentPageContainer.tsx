'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { PaymentMethod, InvoiceFormData, PaymentFormData } from '../types'
import { PAYMENT_METHODS } from '@/shared/constants'
import { mockInvoiceData } from '@/mocks/data'
import { validateInvoiceForm } from '../utils'
import { useCartCalculations } from '@/features/cart/hooks'
import { PaymentMethodCard } from './PaymentMethodCard'
import { InvoiceForm } from './InvoiceForm'
import { PaymentSummary } from './PaymentSummary'

// Convert payment methods from constants
const AVAILABLE_PAYMENT_METHODS: PaymentMethod[] = PAYMENT_METHODS.map(method => ({
  ...method,
  available: true
}))

export function PaymentPageContainer() {
  const params = useParams()
  const locale = params.locale as string
  const calculations = useCartCalculations()

  const [formData, setFormData] = useState<PaymentFormData>({
    paymentMethodId: '',
    invoice: mockInvoiceData,
    agreeToTerms: false,
    subscribeNewsletter: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedPaymentMethod = AVAILABLE_PAYMENT_METHODS.find(
    method => method.id === formData.paymentMethodId
  )

  const handlePaymentMethodSelect = (methodId: string) => {
    setFormData(prev => ({ ...prev, paymentMethodId: methodId }))
  }

  const handleInvoiceChange = (invoiceData: InvoiceFormData) => {
    setFormData(prev => ({ ...prev, invoice: invoiceData }))
    
    // Clear errors when user starts typing
    if (Object.keys(errors).length > 0) {
      setErrors({})
    }
  }

  const handleSubmit = () => {
    const validation = validateInvoiceForm(formData.invoice)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    if (!formData.paymentMethodId) {
      setErrors({ paymentMethod: 'Please select a payment method' })
      return
    }

    if (!formData.agreeToTerms) {
      setErrors({ terms: 'You must agree to the terms and conditions' })
      return
    }

    // Process payment
    console.log('Processing payment:', formData)
  }

  const canContinue = formData.paymentMethodId && formData.agreeToTerms

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment & Invoice</h1>
        <p className="text-gray-600">
          Choose your payment method and provide invoice information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Payment & Invoice */}
        <div className="lg:col-span-2 space-y-8">
          {/* Payment Methods */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_PAYMENT_METHODS.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  isSelected={formData.paymentMethodId === method.id}
                  onSelect={() => handlePaymentMethodSelect(method.id)}
                />
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-red-600 text-sm mt-2">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Invoice Form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Invoice Information</h2>
            <InvoiceForm
              data={formData.invoice}
              onChange={handleInvoiceChange}
              errors={errors}
            />
          </div>

          {/* Terms and Newsletter */}
          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  agreeToTerms: e.target.checked 
                }))}
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <Link href={`/${locale}/terms`} className="text-indigo-600 hover:text-indigo-700">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href={`/${locale}/privacy`} className="text-indigo-600 hover:text-indigo-700">
                  Privacy Policy
                </Link>
                *
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-600 text-sm">{errors.terms}</p>
            )}

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.subscribeNewsletter}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  subscribeNewsletter: e.target.checked 
                }))}
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">
                Subscribe to our newsletter for special offers and updates
              </span>
            </label>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <PaymentSummary
            subtotal={calculations.printingNet}
            shipping={calculations.deliveryNet}
            tax={calculations.vatAmount}
            total={calculations.totalGross}
            currency="PLN"
            paymentMethod={selectedPaymentMethod}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <Link
          href={`/${locale}/order/shipment`}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shipping
        </Link>

        <button
          onClick={handleSubmit}
          disabled={!canContinue}
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors ${
            canContinue
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Summary
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

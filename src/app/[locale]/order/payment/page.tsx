'use client'

import { useState } from 'react'
import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { CreditCard, ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
  available: boolean
}

export default function OrderPaymentPage() {
  const params = useParams()
  const locale = params.locale as string
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [invoiceType, setInvoiceType] = useState<'individual' | 'company'>('individual')

  const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, American Express', icon: '💳', available: true },
    { id: 'blik', name: 'BLIK', description: 'Fast mobile payments', icon: '📱', available: true },
    { id: 'payu', name: 'PayU', description: 'Online banking and more', icon: '🏦', available: true },
    { id: 'transfer', name: 'Bank Transfer', description: 'Traditional wire transfer', icon: '🏛️', available: true },
    { id: 'paypal', name: 'PayPal', description: 'Pay with your PayPal account', icon: '🅿️', available: true },
    { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive', icon: '💵', available: false },
  ]

  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="payment" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment & Invoice</h1>
          <p className="text-gray-600">
            Choose your payment method and provide invoice information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`relative block p-4 border rounded-lg cursor-pointer transition-colors ${
                      !method.available
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                        : selectedPayment === method.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      disabled={!method.available}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                      </div>
                      {selectedPayment === method.id && method.available && (
                        <Check className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                    {!method.available && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 rounded-lg">
                        <span className="text-sm font-medium text-gray-500">Not Available</span>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            {selectedPayment === 'card' && (
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Card Details
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Invoice Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Invoice Information</h2>
              
              {/* Invoice Type Toggle */}
              <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="invoiceType"
                    value="individual"
                    checked={invoiceType === 'individual'}
                    onChange={(e) => setInvoiceType(e.target.value as 'individual' | 'company')}
                    className="text-indigo-600"
                  />
                  <span className="text-sm font-medium">Individual</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="invoiceType"
                    value="company"
                    checked={invoiceType === 'company'}
                    onChange={(e) => setInvoiceType(e.target.value as 'individual' | 'company')}
                    className="text-indigo-600"
                  />
                  <span className="text-sm font-medium">Company</span>
                </label>
              </div>

              {/* Invoice Form */}
              <div className="space-y-4">
                {invoiceType === 'individual' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="VAT Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="email"
                      placeholder="Company Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </>
                )}
                
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Poland</option>
                  <option>Germany</option>
                  <option>Czech Republic</option>
                  <option>Slovakia</option>
                </select>
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">Order Total</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>PLN 245.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>PLN 15.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (23%)</span>
                  <span>PLN 59.80</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>PLN 319.80</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Link
            href={`/${locale}/order/shipment`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shipment
          </Link>

          <Link
            href={`/${locale}/order/summary`}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium ${
              selectedPayment
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!selectedPayment) {
                e.preventDefault()
              }
            }}
          >
            Continue to Summary
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </CheckoutLayout>
  )
}

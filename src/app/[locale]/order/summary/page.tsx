'use client'

import { useState } from 'react'
import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { CheckCircle, ArrowLeft, CreditCard, MapPin, Building, FileText } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'

export default function OrderSummaryPage() {
  const params = useParams()
  const locale = params.locale as string
  const items = useCartStore((s) => s.items)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Redirect to confirmation page
    window.location.href = `/${locale}/order/confirmation/ORD-2025-001`
  }

  return (
    <CheckoutLayout showBackToCart={false}>
      <CheckoutStepper currentStep="summary" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Summary</h1>
          <p className="text-gray-600">
            Review your order details before placing your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.itemId} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0">
                      {item.thumbnail && (
                        <img 
                          src={item.thumbnail} 
                          alt={item.slug}
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 capitalize">
                        {item.slug.replace(/-/g, ' ')}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.configuration.format} • {item.configuration.paper}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} • Colors: {item.configuration.colors}
                      </p>
                      {item.orderName && (
                        <p className="text-xs text-blue-600 mt-1">
                          Order name: {item.orderName}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">PLN 125.00</div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>Files uploaded</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </h2>
                <Link 
                  href={`/${locale}/order/shipment`}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Edit
                </Link>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">John Doe • Acme Corp</p>
                <p>ul. Przykładowa 123</p>
                <p>00-001 Warsaw, Poland</p>
                <p>Tel: +48 123 456 789</p>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-900">Standard Shipping</p>
                <p className="text-sm text-gray-600">Estimated delivery: 3-5 business days</p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                <Link 
                  href={`/${locale}/order/payment`}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Edit
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💳</span>
                <div>
                  <p className="font-medium text-gray-900">Credit Card</p>
                  <p className="text-sm text-gray-600">**** **** **** 1234</p>
                </div>
              </div>
            </div>

            {/* Invoice Information */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Invoice Information
                </h2>
                <Link 
                  href={`/${locale}/order/payment`}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Edit
                </Link>
              </div>
              <div className="text-gray-600">
                <p className="font-medium">Acme Corp</p>
                <p>VAT: PL1234567890</p>
                <p>ul. Przykładowa 123</p>
                <p>00-001 Warsaw, Poland</p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Total</h3>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span>PLN 245.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>PLN 15.00</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (SAVE10)</span>
                  <span>-PLN 24.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (23%)</span>
                  <span>PLN 54.01</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>PLN 289.51</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPlacingOrder ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order & Pay'
                )}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>By placing this order, you agree to our</p>
                <Link href={`/${locale}/terms`} className="text-indigo-600 hover:underline">
                  Terms of Service
                </Link> and{' '}
                <Link href={`/${locale}/privacy`} className="text-indigo-600 hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Link
            href={`/${locale}/order/payment`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Payment
          </Link>

          <div className="text-sm text-gray-500">
            <FileText className="w-4 h-4 inline mr-1" />
            All information will be saved automatically
          </div>
        </div>
      </div>
    </CheckoutLayout>
  )
}

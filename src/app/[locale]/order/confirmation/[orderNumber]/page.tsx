'use client'

import { MainLayout } from '@/components/layout'
import { CheckCircle, Download, Mail, ArrowRight, Calendar, MapPin, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function OrderConfirmationPage() {
  const params = useParams()
  const locale = params.locale as string
  const orderNumber = params.orderNumber as string

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We&apos;ve received your payment and will start processing immediately.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900">Order #{orderNumber}</h2>
              <p className="text-sm text-gray-500">Placed on January 3, 2025 at 2:45 PM</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">PLN 289.51</p>
              <p className="text-sm text-green-600 font-medium">Payment Confirmed</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md">
                  <img 
                    src="/products/wizytowki-standardowe.webp" 
                    alt="Business Cards"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Pocket Calendars</h4>
                  <p className="text-sm text-gray-500">85 x 55 mm • Matte 350g • 4/4 Colors</p>
                  <p className="text-sm text-gray-500">Quantity: 250 copies</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">PLN 125.00</p>
                  <p className="text-sm text-green-600">✓ Files received</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md">
                  <img 
                    src="/products/etykiety-do-aplikacji-recznej.webp" 
                    alt="Catalogs"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Saddle Stitched Catalogs</h4>
                  <p className="text-sm text-gray-500">A4 - 210 x 297 mm • Cover gloss 130g • 4/4 Colors</p>
                  <p className="text-sm text-gray-500">Quantity: 1000 copies</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">PLN 120.00</p>
                  <p className="text-sm text-green-600">✓ Files received</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h3 className="font-medium text-blue-900">Production</h3>
            </div>
            <p className="text-sm text-blue-800 mb-2">
              Your order will enter production within 24 hours.
            </p>
            <p className="text-xs text-blue-600">
              Estimated completion: January 5, 2025
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-green-600" />
              <h3 className="font-medium text-green-900">Shipping</h3>
            </div>
            <p className="text-sm text-green-800 mb-2">
              Standard shipping to Warsaw, Poland
            </p>
            <p className="text-xs text-green-600">
              Estimated delivery: January 8-10, 2025
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-purple-600" />
              <h3 className="font-medium text-purple-900">Updates</h3>
            </div>
            <p className="text-sm text-purple-800 mb-2">
              We&apos;ll send email updates at each step
            </p>
            <p className="text-xs text-purple-600">
              Check your inbox for tracking info
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Shipping Address
              </h4>
              <div className="text-sm text-gray-600">
                <p>John Doe • Acme Corp</p>
                <p>ul. Przykładowa 123</p>
                <p>00-001 Warsaw, Poland</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Method
              </h4>
              <div className="text-sm text-gray-600">
                <p>Credit Card ending in 1234</p>
                <p className="text-green-600">✓ Payment confirmed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
          
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Support */}
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you have any questions about your order, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Contact Support
            </Link>
            <Link
              href={`/${locale}/order/track`}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

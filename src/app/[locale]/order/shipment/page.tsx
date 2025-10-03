'use client'

import { useState } from 'react'
import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { Truck, MapPin, ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'

interface Address {
  id: string
  name: string
  company?: string
  street: string
  city: string
  postalCode: string
  country: string
  phone?: string
}

export default function OrderShipmentPage() {
  const params = useParams()
  const locale = params.locale as string
  const items = useCartStore((s) => s.items)
  const [selectedAddress, setSelectedAddress] = useState<string>('')
  const [showAddAddress, setShowAddAddress] = useState(false)

  // Mock saved addresses
  const savedAddresses: Address[] = [
    {
      id: '1',
      name: 'John Doe',
      company: 'Acme Corp',
      street: 'ul. Przykładowa 123',
      city: 'Warsaw',
      postalCode: '00-001',
      country: 'Poland',
      phone: '+48 123 456 789'
    },
    {
      id: '2',
      name: 'Jane Smith',
      street: 'ul. Testowa 456',
      city: 'Krakow',
      postalCode: '30-001',
      country: 'Poland',
      phone: '+48 987 654 321'
    }
  ]

  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="shipment" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Address</h1>
          <p className="text-gray-600">
            Choose where you want your order to be delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Address Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Addresses */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Saved Addresses</h2>
              <div className="space-y-3">
                {savedAddresses.map((address) => (
                  <label
                    key={address.id}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === address.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {address.name}
                          {address.company && (
                            <span className="text-gray-500 font-normal"> • {address.company}</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {address.street}<br />
                          {address.postalCode} {address.city}<br />
                          {address.country}
                          {address.phone && <><br />Tel: {address.phone}</>}
                        </div>
                      </div>
                      {selectedAddress === address.id && (
                        <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="mt-4 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Address
              </button>

              {/* Add Address Form */}
              {showAddAddress && (
                <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">New Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <input
                      type="text"
                      placeholder="Company (optional)"
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
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
                    <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Poland</option>
                      <option>Germany</option>
                      <option>Czech Republic</option>
                      <option>Slovakia</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      Save Address
                    </button>
                    <button 
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.itemId} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0">
                      {item.thumbnail && (
                        <img 
                          src={item.thumbnail} 
                          alt={item.slug}
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate capitalize">
                        {item.slug.replace(/-/g, ' ')}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Truck className="w-4 h-4" />
                  <span>Standard Shipping</span>
                </div>
                <p className="text-xs text-gray-500">
                  Estimated delivery: 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Link
            href={`/${locale}/order/upload`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Link>

          <Link
            href={`/${locale}/order/payment`}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium ${
              selectedAddress
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!selectedAddress) {
                e.preventDefault()
              }
            }}
          >
            Continue to Payment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </CheckoutLayout>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import type { Address } from '@/shared/types'
import type { ShippingMethod, AddressFormData } from '../types'
import { mockAddresses } from '@/mocks/data'
import { SHIPPING_OPTIONS } from '@/shared/constants'
import { formatMoney } from '@/shared/utils'
import { AddressCard } from './AddressCard'
import { ShippingMethodCard } from './ShippingMethodCard'
import { createAddressFromForm } from '../utils'

// Convert shipping options to shipping methods
const SHIPPING_METHODS: ShippingMethod[] = SHIPPING_OPTIONS.map(option => ({
  ...option,
  available: true
}))

export function ShipmentPageContainer() {
  const params = useParams()
  const locale = params.locale as string
  
  const [addresses] = useState<Address[]>(mockAddresses)
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.firstName + addresses[0]?.lastName || '')
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>(SHIPPING_METHODS[0]?.id || '')
  const [showAddAddress, setShowAddAddress] = useState(false)

  const selectedAddress = addresses.find(addr => 
    `${addr.firstName}${addr.lastName}` === selectedAddressId
  )
  const selectedMethod = SHIPPING_METHODS.find(method => method.id === selectedShippingMethod)

  const handleAddAddress = (formData: AddressFormData) => {
    const newAddress = createAddressFromForm(formData)
    // In real app, would save to backend
    console.log('Adding new address:', newAddress)
    setShowAddAddress(false)
  }

  const canContinue = selectedAddress && selectedMethod

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Address</h1>
        <p className="text-gray-600">
          Choose where you want your order to be delivered.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Address Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
            <button
              onClick={() => setShowAddAddress(true)}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Add New Address
            </button>
          </div>

          <div className="space-y-3">
            {addresses.map((address) => (
              <AddressCard
                key={`${address.firstName}${address.lastName}`}
                address={address}
                isSelected={`${address.firstName}${address.lastName}` === selectedAddressId}
                onSelect={() => setSelectedAddressId(`${address.firstName}${address.lastName}`)}
              />
            ))}
          </div>

          {showAddAddress && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-3">Add New Address</h3>
              <p className="text-sm text-gray-600">
                Address form would go here. For now, this is a placeholder.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setShowAddAddress(false)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddAddress({
                    firstName: 'New',
                    lastName: 'Address',
                    street: 'Sample Street 123',
                    city: 'Sample City',
                    postalCode: '00-000',
                    country: 'Poland'
                  })}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add Address
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Method Selection */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Method</h2>
          
          <div className="space-y-3">
            {SHIPPING_METHODS.map((method) => (
              <ShippingMethodCard
                key={method.id}
                method={method}
                isSelected={method.id === selectedShippingMethod}
                onSelect={() => setSelectedShippingMethod(method.id)}
              />
            ))}
          </div>

          {/* Order Summary */}
          {selectedMethod && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Shipping Summary</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Shipping method:</span>
                  <span>{selectedMethod.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated delivery:</span>
                  <span>{selectedMethod.estimatedDays} business days</span>
                </div>
                <div className="flex justify-between font-medium text-gray-900 pt-2 border-t">
                  <span>Shipping cost:</span>
                  <span>{formatMoney(selectedMethod.price, 'PLN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <Link
          href={`/${locale}/order/upload`}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Upload
        </Link>

        <Link
          href={`/${locale}/order/payment`}
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors ${
            canContinue
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={(e) => {
            if (!canContinue) {
              e.preventDefault()
            }
          }}
        >
          Continue to Payment
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import type { InvoiceFormProps } from '../types'

export function InvoiceForm({ data, onChange, errors }: InvoiceFormProps) {
  const [showCompanyFields, setShowCompanyFields] = useState(data.type === 'company')

  const handleTypeChange = (type: 'individual' | 'company') => {
    setShowCompanyFields(type === 'company')
    onChange({
      ...data,
      type,
      // Clear company fields when switching to individual
      ...(type === 'individual' && {
        company: '',
        taxId: ''
      })
    })
  }

  const handleFieldChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.replace('address.', '')
      onChange({
        ...data,
        address: {
          ...data.address,
          [addressField]: value
        }
      })
    } else {
      onChange({
        ...data,
        [field]: value
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Invoice Type Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Invoice Type</h3>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`relative block p-3 border rounded-lg cursor-pointer transition-colors ${
              data.type === 'individual'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="invoice-type"
              value="individual"
              checked={data.type === 'individual'}
              onChange={() => handleTypeChange('individual')}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-2xl mb-1">👤</div>
              <div className="font-medium text-gray-900">Individual</div>
              <div className="text-sm text-gray-600">Personal invoice</div>
            </div>
          </label>

          <label
            className={`relative block p-3 border rounded-lg cursor-pointer transition-colors ${
              data.type === 'company'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="invoice-type"
              value="company"
              checked={data.type === 'company'}
              onChange={() => handleTypeChange('company')}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-2xl mb-1">🏢</div>
              <div className="font-medium text-gray-900">Company</div>
              <div className="text-sm text-gray-600">Business invoice</div>
            </div>
          </label>
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Company Information */}
      {showCompanyFields && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={data.company || ''}
                onChange={(e) => handleFieldChange('company', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm ${
                  errors.company ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter company name"
              />
              {errors.company && (
                <p className="text-red-600 text-xs mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax ID (NIP) *
              </label>
              <input
                type="text"
                value={data.taxId || ''}
                onChange={(e) => handleFieldChange('taxId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm ${
                  errors.taxId ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter tax ID"
              />
              {errors.taxId && (
                <p className="text-red-600 text-xs mt-1">{errors.taxId}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Address Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Address Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              value={data.address.street}
              onChange={(e) => handleFieldChange('address.street', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors['address.street'] ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter street address"
            />
            {errors['address.street'] && (
              <p className="text-red-600 text-xs mt-1">{errors['address.street']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              value={data.address.city}
              onChange={(e) => handleFieldChange('address.city', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors['address.city'] ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter city"
            />
            {errors['address.city'] && (
              <p className="text-red-600 text-xs mt-1">{errors['address.city']}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code *
            </label>
            <input
              type="text"
              value={data.address.postalCode}
              onChange={(e) => handleFieldChange('address.postalCode', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors['address.postalCode'] ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="XX-XXX"
            />
            {errors['address.postalCode'] && (
              <p className="text-red-600 text-xs mt-1">{errors['address.postalCode']}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              value={data.address.country}
              onChange={(e) => handleFieldChange('address.country', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors['address.country'] ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select country</option>
              <option value="Poland">Poland</option>
              <option value="Germany">Germany</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Slovakia">Slovakia</option>
            </select>
            {errors['address.country'] && (
              <p className="text-red-600 text-xs mt-1">{errors['address.country']}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

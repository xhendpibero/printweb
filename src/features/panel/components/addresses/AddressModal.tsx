'use client'

import { useState } from 'react'
import { X, Save } from 'lucide-react'
import { useAddressesTranslations } from '@/shared/hooks'
import type { UserAddress, CreateAddressPayload, AddressType } from '@/shared/types'

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (address: CreateAddressPayload) => void
  address?: UserAddress // For editing
  defaultType?: AddressType
}

export function AddressModal({ isOpen, onClose, onSave, address, defaultType = 'shipping' }: AddressModalProps) {
  const t = useAddressesTranslations()
  
  const [activeTab, setActiveTab] = useState<'private' | 'company'>('private')
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState<CreateAddressPayload>({
    type: address?.type || defaultType,
    name: address?.name || '',
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    companyName: address?.companyName || '',
    taxId: address?.taxId || '',
    country: address?.country || 'Poland',
    street: address?.street || '',
    buildingNumber: address?.buildingNumber || '',
    apartmentNumber: address?.apartmentNumber || '',
    postalCode: address?.postalCode || '',
    city: address?.city || '',
    phoneCountryCode: address?.phoneCountryCode || '+48',
    phoneNumber: address?.phoneNumber || '',
    email: address?.email || '',
    deliveryMethod: address?.deliveryMethod || 'courier'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Address name is required'
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.street.trim()) newErrors.street = 'Street is required'
    if (!formData.buildingNumber.trim()) newErrors.buildingNumber = 'Building number is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'

    // Company fields (if company tab is active)
    if (activeTab === 'company') {
      if (!formData.companyName?.trim()) newErrors.companyName = 'Company name is required'
      if (!formData.taxId?.trim()) newErrors.taxId = 'Tax ID is required'
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Phone validation
    if (formData.phoneNumber && !/^\d{9,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number'
    }

    // Postal code validation (basic)
    if (formData.postalCode && !/^\d{2}-\d{3}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Invalid postal code format (XX-XXX)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Clear company fields if private person
      const payload = { ...formData }
      if (activeTab === 'private') {
        payload.companyName = undefined
        payload.taxId = undefined
      }

      await onSave(payload)
      onClose()
    } catch (error) {
      console.error('Failed to save address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateAddressPayload, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  const isEditing = !!address

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            {isEditing ? t('modal.editTitle') : t('modal.addTitle')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Address Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.addressType')}
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value as AddressType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="shipping">{t('filters.shipping')}</option>
                <option value="invoice">{t('filters.invoice')}</option>
              </select>
            </div>

            {/* Account Type Tabs */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('form.accountType')}
              </label>
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('private')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'private'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('form.privatePerson')}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('company')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === 'company'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('form.companyAccount')}
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Address Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.addressName')} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Home, Office, Warehouse"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.firstName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.lastName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Company Information (if company tab is active) */}
              {activeTab === 'company' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.companyName')} *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName || ''}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.companyName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.companyName && <p className="text-red-600 text-xs mt-1">{errors.companyName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form.taxId')} *
                    </label>
                    <input
                      type="text"
                      value={formData.taxId || ''}
                      onChange={(e) => handleInputChange('taxId', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.taxId ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.taxId && <p className="text-red-600 text-xs mt-1">{errors.taxId}</p>}
                  </div>
                </div>
              )}

              {/* Address Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.country')} *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Poland">Poland</option>
                  <option value="Germany">Germany</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Slovakia">Slovakia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.street')} *
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.street ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.street && <p className="text-red-600 text-xs mt-1">{errors.street}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.buildingNumber')} *
                  </label>
                  <input
                    type="text"
                    value={formData.buildingNumber}
                    onChange={(e) => handleInputChange('buildingNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.buildingNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.buildingNumber && <p className="text-red-600 text-xs mt-1">{errors.buildingNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.apartmentNumber')}
                  </label>
                  <input
                    type="text"
                    value={formData.apartmentNumber || ''}
                    onChange={(e) => handleInputChange('apartmentNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.postalCode')} *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.postalCode ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="XX-XXX"
                  />
                  {errors.postalCode && <p className="text-red-600 text-xs mt-1">{errors.postalCode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.city')} *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.city ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.phoneCountryCode')}
                  </label>
                  <select
                    value={formData.phoneCountryCode || '+48'}
                    onChange={(e) => handleInputChange('phoneCountryCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="+48">+48</option>
                    <option value="+49">+49</option>
                    <option value="+420">+420</option>
                    <option value="+421">+421</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="123456789"
                  />
                  {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Delivery Method (only for shipping addresses) */}
              {formData.type === 'shipping' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.deliveryMethod')}
                  </label>
                  <select
                    value={formData.deliveryMethod || 'courier'}
                    onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="courier">{t('form.courier')}</option>
                    <option value="inpost">{t('form.inpost')}</option>
                    <option value="dpd_pickup">{t('form.dpd_pickup')}</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              {t('form.cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  {t('form.saving')}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {t('form.save')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

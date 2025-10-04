'use client'

import { useState } from 'react'
import { Search, Plus, MapPin, Building2, Star } from 'lucide-react'
import { useAddressesTranslations, usePanelCommonTranslations } from '@/shared/hooks'
import type { UserAddress, AddressFilters, CreateAddressPayload, AddressType } from '@/shared/types'
import { MOCK_ADDRESSES, filterMockAddresses, formatAddressDisplay } from '@/mocks/data/addresses.mock'
import { AddressModal, AddressRowMenu, DeleteConfirmationModal } from './addresses'

export function AddressesPageContainer() {
  const t = useAddressesTranslations()
  
  const [filters, setFilters] = useState<AddressFilters>({
    search: '',
    page: 1,
    pageSize: 20
  })

  // Modal states
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState<UserAddress | undefined>()
  const [modalDefaultType, setModalDefaultType] = useState<AddressType>('shipping')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingAddress, setDeletingAddress] = useState<UserAddress | null>(null)

  // Mock filtered addresses (in real app, this would be from API)
  const filteredAddresses = filterMockAddresses(MOCK_ADDRESSES, filters)

  const handleEdit = (address: UserAddress) => {
    setEditingAddress(address)
    setShowAddressModal(true)
  }

  const handleDelete = (address: UserAddress) => {
    setDeletingAddress(address)
    setShowDeleteModal(true)
  }

  const handleSetDefault = (address: UserAddress) => {
    console.log('Set default address:', address.id)
    // TODO: Update default address in API
  }

  const handleAddAddress = (type: AddressType) => {
    setEditingAddress(undefined)
    setModalDefaultType(type)
    setShowAddressModal(true)
  }

  const handleSaveAddress = async (addressData: CreateAddressPayload) => {
    console.log('Save address:', addressData)
    // TODO: Save address via API
    // For now, just close the modal
    setShowAddressModal(false)
    setEditingAddress(undefined)
  }

  const handleConfirmDelete = async () => {
    if (deletingAddress) {
      console.log('Delete address:', deletingAddress.id)
      // TODO: Delete address via API
      setDeletingAddress(null)
    }
  }

  const getTypeIcon = (type: UserAddress['type']) => {
    return type === 'shipping' ? MapPin : Building2
  }

  const getDeliveryMethodLabel = (method?: UserAddress['deliveryMethod']) => {
    if (!method) return ''
    
    const labels = {
      courier: t('form.courier'),
      inpost: t('form.inpost'),
      dpd_pickup: t('form.dpd_pickup')
    }
    
    return labels[method] || method
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('filters.search')}
                  value={filters.search || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Type filter */}
            <div className="sm:w-48">
              <select
                value={filters.type || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as UserAddress['type'] || undefined }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t('filters.allTypes')}</option>
                <option value="shipping">{t('filters.shipping')}</option>
                <option value="invoice">{t('filters.invoice')}</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => handleAddAddress('shipping')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              {t('actions.addShipping')}
            </button>
            <button 
              onClick={() => handleAddAddress('invoice')}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              {t('actions.addInvoice')}
            </button>
          </div>
        </div>
      </div>

      {/* Addresses Table */}
      <div className="bg-white shadow rounded-lg">
        {filteredAddresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('empty')}</h3>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.address')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.type')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('table.default')}
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">{t('table.actions')}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAddresses.map((address) => {
                  const TypeIcon = getTypeIcon(address.type)
                  
                  return (
                    <tr key={address.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <TypeIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {address.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {address.firstName} {address.lastName}
                              {address.companyName && ` • ${address.companyName}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {formatAddressDisplay(address)}
                        </div>
                        {address.deliveryMethod && (
                          <div className="text-sm text-gray-500">
                            {getDeliveryMethodLabel(address.deliveryMethod)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          address.type === 'shipping' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {t(`filters.${address.type}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {address.isDefault && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <AddressRowMenu
                          address={address}
                          onEdit={handleEdit}
                          onSetDefault={handleSetDefault}
                          onDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false)
          setEditingAddress(undefined)
        }}
        onSave={handleSaveAddress}
        address={editingAddress}
        defaultType={modalDefaultType}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setDeletingAddress(null)
        }}
        onConfirm={handleConfirmDelete}
        address={deletingAddress}
      />
    </div>
  )
}

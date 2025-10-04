'use client'

import { useState } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { useAddressesTranslations } from '@/shared/hooks'
import type { UserAddress } from '@/shared/types'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  address: UserAddress | null
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, address }: DeleteConfirmationModalProps) {
  const t = useAddressesTranslations()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Failed to delete address:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!isOpen || !address) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {t('modal.deleteTitle')}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {t('modal.deleteConfirm')}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm">
              <div className="font-medium text-gray-900">{address.name}</div>
              <div className="text-gray-500">
                {address.firstName} {address.lastName}
                {address.companyName && ` • ${address.companyName}`}
              </div>
              <div className="text-gray-500">
                {address.street} {address.buildingNumber}
                {address.apartmentNumber && `/${address.apartmentNumber}`}
              </div>
              <div className="text-gray-500">
                {address.postalCode} {address.city}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  {t('actions.delete')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

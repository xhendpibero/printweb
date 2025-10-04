'use client'

import { useState } from 'react'
import { MoreVertical, Edit, Star, Trash2, ShoppingCart } from 'lucide-react'
import { useAddressesTranslations } from '@/shared/hooks'
import type { UserAddress } from '@/shared/types'

interface AddressRowMenuProps {
  address: UserAddress
  onEdit: (address: UserAddress) => void
  onSetDefault: (address: UserAddress) => void
  onDelete: (address: UserAddress) => void
  onUseInCheckout?: (address: UserAddress) => void
}

export function AddressRowMenu({ address, onEdit, onSetDefault, onDelete, onUseInCheckout }: AddressRowMenuProps) {
  const t = useAddressesTranslations()
  const [isOpen, setIsOpen] = useState(false)

  const handleAction = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                onClick={() => handleAction(() => onEdit(address))}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Edit className="h-4 w-4" />
                {t('actions.edit')}
              </button>

              {!address.isDefault && (
                <button
                  onClick={() => handleAction(() => onSetDefault(address))}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Star className="h-4 w-4" />
                  {t('actions.setDefault')}
                </button>
              )}

              {onUseInCheckout && (
                <button
                  onClick={() => handleAction(() => onUseInCheckout(address))}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {t('actions.useInCheckout')}
                </button>
              )}

              <div className="border-t border-gray-100 my-1" />

              <button
                onClick={() => handleAction(() => onDelete(address))}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                {t('actions.delete')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

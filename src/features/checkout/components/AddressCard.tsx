'use client'

import { MapPin, Building, Phone } from 'lucide-react'
import type { AddressCardProps } from '../types'

export function AddressCard({ address, isSelected, onSelect }: AddressCardProps) {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">
              {address.firstName} {address.lastName}
            </h3>
          </div>
          
          {address.company && (
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-3 h-3 text-gray-400" />
              <p className="text-sm text-gray-600">{address.company}</p>
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-1">{address.street}</p>
          <p className="text-sm text-gray-600 mb-1">
            {address.postalCode} {address.city}
          </p>
          <p className="text-sm text-gray-600 mb-2">{address.country}</p>
          
          {address.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-gray-400" />
              <p className="text-sm text-gray-500">{address.phone}</p>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0">
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              isSelected
                ? 'border-indigo-500 bg-indigo-500'
                : 'border-gray-300'
            }`}
          >
            {isSelected && (
              <div className="w-full h-full rounded-full bg-white scale-50"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

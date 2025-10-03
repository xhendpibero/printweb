"use client"

import { X } from 'lucide-react'
import type { CartItem } from '@/types'

interface ConfigurationModalProps {
  item: CartItem
  isOpen: boolean
  onClose: () => void
}

export function ConfigurationModal({ item, isOpen, onClose }: ConfigurationModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Configuration Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Product Info */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Product</h4>
              <p className="text-sm text-gray-600 capitalize">
                {item.slug.replace(/-/g, ' ')}
              </p>
            </div>

            {/* Configuration Details */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Configuration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">{item.configuration.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paper:</span>
                  <span className="font-medium">{item.configuration.paper}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Colors:</span>
                  <span className="font-medium">{item.configuration.colors}</span>
                </div>
                {item.configuration.finishings.length > 0 && (
                  <div>
                    <span className="text-gray-600">Finishings:</span>
                    <ul className="mt-1 ml-4 list-disc">
                      {item.configuration.finishings.map((finishing, index) => (
                        <li key={index} className="text-sm font-medium">
                          {finishing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Order Details */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{item.quantity} copies</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium capitalize">{item.shippingOption || 'Standard'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Config ID:</span>
                  <span className="font-mono text-xs text-gray-500">{item.configFingerprint}</span>
                </div>
              </div>
            </div>

            {/* Price Estimate */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Price Estimate</h4>
              <div className="text-sm text-gray-600">
                <p>Base price calculation would appear here when connected to pricing engine.</p>
                <p className="mt-1 text-xs">* Final price may vary based on current rates and options</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                // TODO: Navigate to product configuration page for editing
                console.log('Edit configuration for:', item.itemId)
                onClose()
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Edit Configuration
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

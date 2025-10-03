"use client"

import { useState } from 'react'
import { MoreVertical, Copy, Edit, Tag, Trash2 } from 'lucide-react'

interface CartItemMenuProps {
  itemId: string
  onDuplicate: () => void
  onEdit: () => void
  onAddOrderName: () => void
  onRemove: () => void
  isLoading?: boolean
}

export function CartItemMenu({ 
  onDuplicate, 
  onEdit, 
  onAddOrderName, 
  onRemove,
  isLoading = false
}: CartItemMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
        aria-label="More options"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-8 z-20 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
            <button
              onClick={() => {
                onDuplicate()
                setIsOpen(false)
              }}
              disabled={isLoading}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              Duplicate product
            </button>
            
            <button
              onClick={() => {
                onEdit()
                setIsOpen(false)
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" />
              Edit configuration
            </button>
            
            <button
              onClick={() => {
                onAddOrderName()
                setIsOpen(false)
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Tag className="w-4 h-4" />
              Add order name
            </button>
            
            <hr className="my-1" />
            
            <button
              onClick={() => {
                onRemove()
                setIsOpen(false)
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  )
}

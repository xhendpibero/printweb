"use client"

import { useState } from 'react'
import { Check, X, Edit3 } from 'lucide-react'

interface OrderNameInputProps {
  itemId: string
  currentName?: string
  onSave: (name: string) => void
}

export function OrderNameInput({ currentName, onSave }: OrderNameInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(currentName || '')

  const handleSave = () => {
    onSave(name.trim())
    setIsEditing(false)
  }

  const handleCancel = () => {
    setName(currentName || '')
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2 mt-1">
        {currentName ? (
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
            Order name: {currentName}
          </span>
        ) : (
          <span className="text-xs text-gray-400">No order name</span>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50"
          aria-label="Edit order name"
        >
          <Edit3 className="w-3 h-3" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 mt-1">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter order name..."
        className="flex-1 text-xs px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave()
          if (e.key === 'Escape') handleCancel()
        }}
        autoFocus
      />
      <button
        onClick={handleSave}
        className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-50"
        aria-label="Save order name"
      >
        <Check className="w-3 h-3" />
      </button>
      <button
        onClick={handleCancel}
        className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
        aria-label="Cancel editing"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

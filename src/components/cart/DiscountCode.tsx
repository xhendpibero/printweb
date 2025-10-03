"use client"

import { useState } from 'react'
import { Check, X, Loader2 } from 'lucide-react'
import { useCartMutations } from '@/hooks/cart/useCart'

interface DiscountCodeProps {
  currentCode?: string
  onApplied?: (code: string, discount: { 
    message: string
    discountAmount?: number
    discountPercent?: number
    code: string
  }) => void
}

export function DiscountCode({ currentCode, onApplied }: DiscountCodeProps) {
  const [code, setCode] = useState('')
  const [appliedCode, setAppliedCode] = useState(currentCode)
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const { applyDiscount } = useCartMutations()

  const handleApply = async () => {
    if (!code.trim()) return

    setFeedback({ type: null, message: '' })

    try {
      const result = await applyDiscount.mutateAsync(code.trim().toUpperCase())
      
      setAppliedCode(code.trim().toUpperCase())
      setCode('')
      setFeedback({
        type: 'success',
        message: `Discount applied! You saved ${result.discountAmount || result.discountPercent + '%'}`
      })
      
      onApplied?.(code.trim().toUpperCase(), result)
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Invalid discount code'
      })
    }
  }

  const handleRemove = () => {
    setAppliedCode(undefined)
    setFeedback({ type: null, message: '' })
    // TODO: Call API to remove discount when backend is ready
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply()
    }
  }

  return (
    <div className="space-y-2">
      {/* Applied discount display */}
      {appliedCode && (
        <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {appliedCode}
            </span>
          </div>
          <button
            onClick={handleRemove}
            className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-100"
            aria-label="Remove discount"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Discount input */}
      {!appliedCode && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              placeholder="Discount code"
              disabled={applyDiscount.isPending}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
            <button 
              onClick={handleApply}
              disabled={!code.trim() || applyDiscount.isPending}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {applyDiscount.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Applying...
                </>
              ) : (
                'Apply'
              )}
            </button>
          </div>

          {/* Feedback message */}
          {feedback.type && (
            <div className={`text-xs px-2 py-1 rounded-md ${
              feedback.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {feedback.message}
            </div>
          )}

          {/* Sample codes hint */}
          <div className="text-xs text-gray-500">
            Try: {['SAVE10', 'WELCOME', 'FREESHIP', 'STUDENT', 'BULK20'].map((sampleCode, index) => (
              <span key={sampleCode}>
                {index > 0 && ', '}
                <button 
                  onClick={() => setCode(sampleCode)} 
                  className="text-blue-600 hover:underline font-mono"
                >
                  {sampleCode}
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

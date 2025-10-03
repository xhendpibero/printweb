'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface UploadNavigationProps {
  allFilesUploaded: boolean
  totalItems: number
  uploadedItemsCount: number
}

export function UploadNavigation({ 
  allFilesUploaded, 
  totalItems, 
  uploadedItemsCount 
}: UploadNavigationProps) {
  const params = useParams()
  const locale = params.locale as string

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/${locale}/order/cart`}
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <div className="flex items-center gap-4">
        {/* Progress Indicator */}
        <div className="text-sm text-gray-600">
          {uploadedItemsCount} of {totalItems} items have files
        </div>

        <div className="flex gap-3">
          <Link
            href={`/${locale}/order/summary`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Skip for Now
          </Link>
          
          <Link
            href={`/${locale}/order/shipment`}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors ${
              allFilesUploaded
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!allFilesUploaded) {
                e.preventDefault()
              }
            }}
          >
            Continue to Shipment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCheckoutTranslations } from '@/shared/hooks'
import { useCartStore } from '@/stores/cart-store'
import type { UploadedFile } from '../types'
import { areAllFilesUploaded } from '../utils'
import { FileUpload } from './FileUpload'

export function UploadPageContainer() {
  const params = useParams()
  const locale = params.locale as string
  const t = useCheckoutTranslations()
  
  const items = useCartStore((s) => s.items)
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile[]>>({})

  const handleFilesUploaded = (itemId: string, files: UploadedFile[]) => {
    setUploadedFiles(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), ...files]
    }))
  }

  const handleFileRemoved = (itemId: string, fileId: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || []).filter(f => f.id !== fileId)
    }))
  }

  const allFilesUploaded = areAllFilesUploaded(
    items.map(item => item.itemId), 
    Object.fromEntries(
      Object.entries(uploadedFiles).map(([itemId, files]) => [
        itemId, 
        files.map(f => f.file)
      ])
    )
  )

  // Calculate progress
  const totalItems = items.length
  const itemsWithFiles = Object.keys(uploadedFiles).filter(
    itemId => (uploadedFiles[itemId] || []).length > 0
  ).length
  const uploadProgress = totalItems > 0 ? Math.round((itemsWithFiles / totalItems) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('upload.title')}
        </h1>
        <p className="text-gray-600">
          {t('upload.subtitle')}
        </p>

        {/* Progress Bar */}
        {items.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Upload Progress</span>
              <span>{uploadProgress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Upload Sections for Each Cart Item */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={item.itemId} className="bg-white border rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Item {index + 1}: {item.slug.replace(/-/g, ' ')}
              </h2>
              <div className="text-sm text-gray-600">
                <p>Quantity: {item.quantity}</p>
                <p>Configuration: {item.configuration.format}, {item.configuration.paper}, {item.configuration.colors}</p>
              </div>
            </div>

            <FileUpload
              itemId={item.itemId}
              onFilesUploaded={(files) => handleFilesUploaded(item.itemId, files)}
              onFileRemoved={(fileId) => handleFileRemoved(item.itemId, fileId)}
              existingFiles={uploadedFiles[item.itemId] || []}
            />
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No items in cart to upload files for.</p>
            <Link
              href={`/${locale}/order/cart`}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Go back to cart
            </Link>
          </div>
        )}
      </div>

      {/* Navigation */}
      {items.length > 0 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <Link
            href={`/${locale}/order/cart`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('upload.navigation.backToCart')}
          </Link>

          <div className="flex items-center gap-4">
            {!allFilesUploaded && (
              <p className="text-sm text-amber-600">
                Please upload files for all items to continue
              </p>
            )}
            
            <Link
              href={allFilesUploaded ? `/${locale}/order/shipment` : '#'}
              className={`
                inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-colors
                ${allFilesUploaded
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {t('upload.navigation.continueToShipping')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
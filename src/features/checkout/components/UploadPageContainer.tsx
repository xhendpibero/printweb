'use client'

import { useCartStore } from '@/stores/cart-store'
import { useFileUpload } from '../hooks'
import { calculateUploadProgress } from '../utils'
import { UploadItem } from './UploadItem'
import { FileRequirements } from './FileRequirements'
import { UploadNavigation } from './UploadNavigation'

export function UploadPageContainer() {
  const items = useCartStore((s) => s.items)
  const itemIds = items.map(item => item.itemId)
  
  const {
    uploadedFiles,
    isUploading,
    allFilesUploaded,
    handleFileUpload,
    removeFile
  } = useFileUpload(itemIds)

  const uploadProgress = calculateUploadProgress(uploadedFiles, items.length)
  const uploadedItemsCount = Object.keys(uploadedFiles).filter(
    itemId => uploadedFiles[itemId]?.length > 0
  ).length

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Files</h1>
        <p className="text-gray-600">
          Upload the print-ready files for each product in your order. We accept PDF, AI, EPS, and high-resolution images.
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

      {/* Upload Items */}
      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <UploadItem
            key={item.itemId}
            item={item}
            uploadedFiles={uploadedFiles[item.itemId] || []}
            onFileUpload={(files) => handleFileUpload(item.itemId, files)}
            onFileRemove={(fileIndex) => removeFile(item.itemId, fileIndex)}
          />
        ))}
      </div>

      {/* File Requirements */}
      <div className="mb-8">
        <FileRequirements />
      </div>

      {/* Navigation */}
      <UploadNavigation
        allFilesUploaded={allFilesUploaded}
        totalItems={items.length}
        uploadedItemsCount={uploadedItemsCount}
      />

      {/* Loading Overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="font-medium">Uploading files...</span>
          </div>
        </div>
      )}
    </div>
  )
}

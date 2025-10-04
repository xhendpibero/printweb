'use client'

import { Upload, FileText, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import type { CartItem } from '@/shared/types'
import { formatFileSize } from '@/shared/utils'
import { formatCartItemConfiguration } from '@/features/cart/utils'

interface UploadItemProps {
  item: CartItem
  uploadedFiles: File[]
  onFileUpload: (files: FileList) => void
  onFileRemove: (fileIndex: number) => void
}

export function UploadItem({ 
  item, 
  uploadedFiles, 
  onFileUpload, 
  onFileRemove 
}: UploadItemProps) {
  const hasFiles = uploadedFiles.length > 0

  return (
    <div className="bg-white border rounded-lg p-6">
      {/* Item Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Product Image */}
        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.slug}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <FileText className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            {item.slug.replace(/-/g, ' ')}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Quantity: {item.quantity}
          </p>
          <p className="text-xs text-gray-500">
            {formatCartItemConfiguration(item)}
          </p>
        </div>

        {/* Upload Status */}
        <div className="flex items-center gap-2">
          {hasFiles ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-600 font-medium">
                {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded
              </span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">No files uploaded</span>
            </>
          )}
        </div>
      </div>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          multiple
          accept=".pdf,.ai,.eps,.psd"
          onChange={(e) => e.target.files && onFileUpload(e.target.files)}
          className="hidden"
          id={`file-upload-${item.itemId}`}
        />
        <label
          htmlFor={`file-upload-${item.itemId}`}
          className="cursor-pointer"
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900 mb-1">
            Drop files here or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Supports PDF, AI, EPS, PSD (max 100MB each)
          </p>
        </label>
      </div>

      {/* Uploaded Files List */}
      {hasFiles && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Uploaded Files:</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, fileIndex) => (
              <div key={fileIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onFileRemove(fileIndex)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
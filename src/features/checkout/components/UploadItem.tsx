'use client'

import { Upload, FileText, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import type { UploadItemProps } from '../types'
import { formatFileSize } from '@/shared/utils'
import { formatCartItemConfiguration } from '@/features/cart/utils'

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
        <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.slug}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 capitalize">
            {item.slug.replace(/-/g, ' ')}
          </h3>
          <p className="text-sm text-gray-500">
            Quantity: {item.quantity}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatCartItemConfiguration(item)}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          {hasFiles ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                {uploadedFiles.length} file(s) uploaded
              </span>
            </div>
          ) : (
            <span className="text-sm text-orange-600 font-medium">Files required</span>
          )}
        </div>
      </div>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          multiple
          accept=".pdf,.ai,.eps,.jpg,.jpeg,.png,.tiff"
          onChange={(e) => e.target.files && onFileUpload(e.target.files)}
          className="hidden"
          id={`file-upload-${item.itemId}`}
        />
        <label htmlFor={`file-upload-${item.itemId}`} className="cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 mb-1">
            Click to upload files or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            PDF, AI, EPS, JPG, PNG, TIFF up to 50MB each
          </p>
        </label>
      </div>

      {/* Uploaded Files List */}
      {hasFiles && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
              <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formatFileSize(file.size)}
              </span>
              <button 
                onClick={() => onFileRemove(index)}
                className="text-red-500 hover:text-red-700 text-xs font-medium flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

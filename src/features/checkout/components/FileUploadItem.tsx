'use client'

import { X, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import type { UploadedFile } from '../types'
import { formatFileSize, getFileTypeIcon } from '../utils'

interface FileUploadItemProps {
  file: UploadedFile
  onRemove: (fileId: string) => void
  disabled?: boolean
}

export function FileUploadItem({ file, onRemove, disabled = false }: FileUploadItemProps) {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'uploading':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (file.status) {
      case 'uploading':
        return 'border-blue-200 bg-blue-50'
      case 'completed':
        return 'border-green-200 bg-green-50'
      case 'error':
        return 'border-red-200 bg-red-50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  return (
    <div className={`
      flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
      ${getStatusColor()}
    `}>
      {/* File Icon */}
      <div className="flex-shrink-0">
        <span className="text-2xl">{getFileTypeIcon(file.name)}</span>
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          {getStatusIcon()}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{formatFileSize(file.size)}</span>
          {file.status === 'uploading' && (
            <>
              <span>•</span>
              <span>{file.progress}% uploaded</span>
            </>
          )}
          {file.status === 'error' && file.errorMessage && (
            <>
              <span>•</span>
              <span className="text-red-600">{file.errorMessage}</span>
            </>
          )}
        </div>

        {/* Progress Bar */}
        {file.status === 'uploading' && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${file.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(file.id)}
        disabled={disabled || file.status === 'uploading'}
        className={`
          flex-shrink-0 p-1 rounded-full transition-colors
          ${disabled || file.status === 'uploading'
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }
        `}
        title="Remove file"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

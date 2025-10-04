'use client'

import { useCallback, useState } from 'react'
import { Upload, FileText } from 'lucide-react'
import type { DragDropZoneProps } from '../types'

export function DragDropZone({ 
  onFilesDropped, 
  disabled = false, 
  className = '', 
  children 
}: DragDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFilesDropped(files)
    }
  }, [disabled, onFilesDropped])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    const files = e.target.files
    if (files && files.length > 0) {
      onFilesDropped(files)
    }
    // Reset input so same file can be selected again
    e.target.value = ''
  }, [disabled, onFilesDropped])

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg transition-all duration-200
        ${isDragOver && !disabled 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 hover:border-gray-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        multiple
        accept=".pdf,.ai,.eps,.psd,.jpg,.jpeg,.png,.tiff,.tif"
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />
      
      {children || (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="mb-4">
            {isDragOver ? (
              <FileText className="w-12 h-12 text-indigo-500" />
            ) : (
              <Upload className="w-12 h-12 text-gray-400" />
            )}
          </div>
          
          <div className="mb-2">
            <p className="text-lg font-medium text-gray-900">
              {isDragOver ? 'Drop files here' : 'Drop files here or click to browse'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports PDF, AI, EPS, PSD, JPG, PNG, TIFF (max 100MB each)
            </p>
          </div>
        </div>
      )}
      
      {isDragOver && (
        <div className="absolute inset-0 bg-indigo-100 bg-opacity-50 rounded-lg pointer-events-none" />
      )}
    </div>
  )
}

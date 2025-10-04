'use client'

import { useState, useCallback } from 'react'
import { AlertCircle } from 'lucide-react'
import type { FileUploadProps, UploadedFile } from '../types'
import { validateUploadFiles, generateFileId, FILE_UPLOAD_CONFIG } from '../utils'
import { useCheckoutTranslations } from '@/shared/hooks'
import { addToast } from '@/components/ui/Toast'
import { DragDropZone } from './DragDropZone'
import { FileUploadItem } from './FileUploadItem'

export function FileUpload({ 
  itemId, 
  onFilesUploaded, 
  onFileRemoved, 
  existingFiles = [], 
  disabled = false 
}: FileUploadProps) {
  const t = useCheckoutTranslations()
  const [uploadingFiles, setUploadingFiles] = useState<UploadedFile[]>([])

  // Simulate file upload with progress
  const simulateUpload = useCallback(async (file: File): Promise<UploadedFile> => {
    const uploadedFile: UploadedFile = {
      id: generateFileId(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
      itemId
    }

    // Add to uploading files
    setUploadingFiles(prev => [...prev, uploadedFile])

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      
      setUploadingFiles(prev => 
        prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, progress }
            : f
        )
      )
    }

    // Mark as completed
    const completedFile: UploadedFile = {
      ...uploadedFile,
      status: 'completed',
      progress: 100
    }

    setUploadingFiles(prev => prev.filter(f => f.id !== uploadedFile.id))
    
    return completedFile
  }, [itemId])

  const handleFilesDropped = useCallback(async (files: FileList) => {
    if (disabled) return

    // Validate files
    const validation = validateUploadFiles(files, existingFiles.length)
    
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        addToast({
          type: 'error',
          title: 'Upload Failed',
          message: error
        })
      })
      return
    }

    // Upload files
    const uploadPromises = Array.from(files).map(file => simulateUpload(file))
    
    try {
      const uploadedFiles = await Promise.all(uploadPromises)
      onFilesUploaded(uploadedFiles)
      
      addToast({
        type: 'success',
        title: 'Files Uploaded',
        message: `${uploadedFiles.length} file(s) uploaded successfully`
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Upload Failed',
        message: 'Failed to upload files. Please try again.'
      })
    }
  }, [disabled, existingFiles.length, onFilesUploaded, simulateUpload])

  const handleFileRemoved = useCallback((fileId: string) => {
    // Remove from uploading files if it's still uploading
    setUploadingFiles(prev => prev.filter(f => f.id !== fileId))
    // Notify parent component
    onFileRemoved(fileId)
  }, [onFileRemoved])

  const allFiles = [...existingFiles, ...uploadingFiles]
  const hasFiles = allFiles.length > 0
  const canUploadMore = allFiles.length < FILE_UPLOAD_CONFIG.maxFiles

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      {canUploadMore && (
        <DragDropZone
          onFilesDropped={handleFilesDropped}
          disabled={disabled}
          className="min-h-[200px]"
        />
      )}

      {/* File Requirements */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-medium text-blue-900 mb-2">
              {t('upload.requirements.title')}
            </h4>
            <ul className="text-blue-800 space-y-1">
              <li>• {t('upload.requirements.formats')}</li>
              <li>• {t('upload.requirements.size')}</li>
              <li>• {t('upload.requirements.resolution')}</li>
              <li>• Maximum {FILE_UPLOAD_CONFIG.maxFiles} files per order</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {hasFiles && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">
            Uploaded Files ({allFiles.length}/{FILE_UPLOAD_CONFIG.maxFiles})
          </h4>
          <div className="space-y-2">
            {allFiles.map(file => (
              <FileUploadItem
                key={file.id}
                file={file}
                onRemove={handleFileRemoved}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upload Limit Warning */}
      {!canUploadMore && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              Maximum file limit reached ({FILE_UPLOAD_CONFIG.maxFiles} files)
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

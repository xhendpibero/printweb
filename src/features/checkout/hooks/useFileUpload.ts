import { useState, useCallback } from 'react'
import { validateUploadFile, areAllFilesUploaded } from '../utils'
import { addToast } from '@/components/ui/Toast'

/**
 * Hook for managing file uploads in checkout flow
 */
export function useFileUpload(itemIds: string[]) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({})
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = useCallback((itemId: string, files: FileList) => {
    setIsUploading(true)
    
    const validFiles: File[] = []
    const errors: string[] = []

    Array.from(files).forEach(file => {
      const validation = validateUploadFile(file)
      if (validation.isValid) {
        validFiles.push(file)
      } else {
        errors.push(`${file.name}: ${validation.errors.join(', ')}`)
      }
    })

    if (validFiles.length > 0) {
      setUploadedFiles(prev => ({
        ...prev,
        [itemId]: [...(prev[itemId] || []), ...validFiles]
      }))

      addToast({
        type: 'success',
        title: 'Files uploaded',
        message: `${validFiles.length} file(s) uploaded successfully`
      })
    }

    if (errors.length > 0) {
      errors.forEach(error => {
        addToast({
          type: 'error',
          title: 'Upload failed',
          message: error
        })
      })
    }

    setIsUploading(false)
  }, [])

  const removeFile = useCallback((itemId: string, fileIndex: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [itemId]: prev[itemId]?.filter((_, index) => index !== fileIndex) || []
    }))

    addToast({
      type: 'info',
      title: 'File removed',
      message: 'File has been removed from upload'
    })
  }, [])

  const clearAllFiles = useCallback(() => {
    setUploadedFiles({})
    addToast({
      type: 'info',
      title: 'Files cleared',
      message: 'All uploaded files have been cleared'
    })
  }, [])

  const allFilesUploaded = areAllFilesUploaded(itemIds, uploadedFiles)

  return {
    uploadedFiles,
    isUploading,
    allFilesUploaded,
    handleFileUpload,
    removeFile,
    clearAllFiles
  }
}
import type { FileValidationResult } from '../types'
import { 
  isValidFileType, 
  isValidFileSize, 
  formatFileSize,
  getFileExtension 
} from '@/shared/utils'
import { UPLOAD_VALIDATION } from '@/shared/constants'

/**
 * Validate uploaded file for printing requirements
 */
export function validateUploadFile(file: File): FileValidationResult {
  // Check file type
  if (!isValidFileType(file, UPLOAD_VALIDATION.ALLOWED_EXTENSIONS)) {
    return {
      isValid: false,
      error: `File type not supported. Please use: ${UPLOAD_VALIDATION.ALLOWED_EXTENSIONS.join(', ')}`
    }
  }

  // Check file size
  const maxSizeMB = UPLOAD_VALIDATION.MAX_FILE_SIZE / (1024 * 1024)
  if (!isValidFileSize(file, maxSizeMB)) {
    return {
      isValid: false,
      error: `File too large. Maximum size: ${formatFileSize(UPLOAD_VALIDATION.MAX_FILE_SIZE)}`
    }
  }

  return { isValid: true }
}

/**
 * Check if file is print-ready based on extension and size
 */
export function isPrintReadyFile(file: File): boolean {
  const extension = getFileExtension(file.name)
  const printReadyFormats = ['pdf', 'ai', 'eps']
  return printReadyFormats.includes(extension)
}

/**
 * Get file upload progress as percentage
 */
export function calculateUploadProgress(
  uploadedFiles: Record<string, File[]>,
  totalItems: number
): number {
  const itemsWithFiles = Object.keys(uploadedFiles).filter(
    itemId => uploadedFiles[itemId].length > 0
  ).length
  
  return totalItems > 0 ? Math.round((itemsWithFiles / totalItems) * 100) : 0
}

/**
 * Check if all items have required files uploaded
 */
export function areAllFilesUploaded(
  uploadedFiles: Record<string, File[]>,
  itemIds: string[]
): boolean {
  return itemIds.every(itemId => 
    uploadedFiles[itemId] && uploadedFiles[itemId].length > 0
  )
}

/**
 * Get total file size for all uploaded files
 */
export function getTotalUploadSize(uploadedFiles: Record<string, File[]>): number {
  return Object.values(uploadedFiles)
    .flat()
    .reduce((total, file) => total + file.size, 0)
}

/**
 * Generate upload summary statistics
 */
export function getUploadSummary(uploadedFiles: Record<string, File[]>) {
  const allFiles = Object.values(uploadedFiles).flat()
  const totalSize = getTotalUploadSize(uploadedFiles)
  const fileCount = allFiles.length
  const itemsWithFiles = Object.keys(uploadedFiles).filter(
    itemId => uploadedFiles[itemId].length > 0
  ).length

  return {
    totalFiles: fileCount,
    totalSize: formatFileSize(totalSize),
    itemsWithFiles,
    averageFileSize: fileCount > 0 ? formatFileSize(totalSize / fileCount) : '0 B'
  }
}

import type { FileUploadConfig, FileValidationResult } from '../types'

// File upload configuration
export const FILE_UPLOAD_CONFIG: FileUploadConfig = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  maxFiles: 10,
  acceptedTypes: [
    'application/pdf',
    'application/postscript', // .ai, .eps
    'image/vnd.adobe.photoshop', // .psd
    'application/illustrator', // .ai
    'image/jpeg',
    'image/png',
    'image/tiff'
  ],
  acceptedExtensions: ['.pdf', '.ai', '.eps', '.psd', '.jpg', '.jpeg', '.png', '.tiff', '.tif']
}

/**
 * Validate a single file for upload
 */
export function validateUploadFile(file: File, config: FileUploadConfig = FILE_UPLOAD_CONFIG): FileValidationResult {
  const errors: string[] = []

  // Check file size
  if (file.size > config.maxFileSize) {
    const maxSizeMB = Math.round(config.maxFileSize / (1024 * 1024))
    errors.push(`File size exceeds ${maxSizeMB}MB limit`)
  }

  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
  const isValidType = config.acceptedTypes.includes(file.type) || 
                     config.acceptedExtensions.includes(fileExtension)

  if (!isValidType) {
    errors.push(`File type not supported. Accepted formats: ${config.acceptedExtensions.join(', ')}`)
  }

  // Check if file name is reasonable
  if (file.name.length > 255) {
    errors.push('File name is too long (max 255 characters)')
  }

  // Check for empty file
  if (file.size === 0) {
    errors.push('File is empty')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate multiple files for upload
 */
export function validateUploadFiles(
  files: FileList | File[], 
  existingFilesCount: number = 0,
  config: FileUploadConfig = FILE_UPLOAD_CONFIG
): FileValidationResult {
  const errors: string[] = []
  const fileArray = Array.from(files)

  // Check total file count
  if (existingFilesCount + fileArray.length > config.maxFiles) {
    errors.push(`Maximum ${config.maxFiles} files allowed`)
  }

  // Validate each file
  fileArray.forEach((file, index) => {
    const validation = validateUploadFile(file, config)
    if (!validation.isValid) {
      errors.push(`File ${index + 1} (${file.name}): ${validation.errors.join(', ')}`)
    }
  })

  // Check for duplicate names
  const fileNames = fileArray.map(f => f.name.toLowerCase())
  const duplicates = fileNames.filter((name, index) => fileNames.indexOf(name) !== index)
  if (duplicates.length > 0) {
    errors.push(`Duplicate file names: ${[...new Set(duplicates)].join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Get file type icon based on extension
 */
export function getFileTypeIcon(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase()
  
  switch (extension) {
    case 'pdf':
      return '📄'
    case 'ai':
    case 'eps':
      return '🎨'
    case 'psd':
      return '🖼️'
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'tiff':
    case 'tif':
      return '🖼️'
    default:
      return '📁'
  }
}

/**
 * Check if all cart items have required files uploaded
 */
export function areAllFilesUploaded(itemIds: string[], uploadedFiles: Record<string, File[]>): boolean {
  return itemIds.every(itemId => {
    const files = uploadedFiles[itemId] || []
    return files.length > 0
  })
}

/**
 * Generate unique file ID
 */
export function generateFileId(): string {
  return `file_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}
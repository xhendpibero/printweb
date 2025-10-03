import type { CartItem } from '@/shared/types'

// File upload specific types
export interface FileUploadState {
  [itemId: string]: File[]
}

export interface UploadProgress {
  [itemId: string]: number
}

export interface FileValidationResult {
  isValid: boolean
  error?: string
}

export interface UploadItemProps {
  item: CartItem
  uploadedFiles: File[]
  onFileUpload: (files: FileList) => void
  onFileRemove: (fileIndex: number) => void
}

export interface FileRequirement {
  title: string
  description: string
}

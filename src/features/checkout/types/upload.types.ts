export interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  status: 'uploading' | 'completed' | 'error'
  progress: number
  previewUrl?: string
  errorMessage?: string
  itemId: string // Which cart item this file belongs to
}

export interface FileUploadConfig {
  maxFileSize: number // in bytes
  maxFiles: number
  acceptedTypes: string[]
  acceptedExtensions: string[]
}

export interface FileValidationResult {
  isValid: boolean
  errors: string[]
}

export interface FileRequirement {
  title: string
  description: string
}

export interface FileUploadProps {
  itemId: string
  onFilesUploaded: (files: UploadedFile[]) => void
  onFileRemoved: (fileId: string) => void
  existingFiles?: UploadedFile[]
  disabled?: boolean
}

export interface DragDropZoneProps {
  onFilesDropped: (files: FileList) => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}
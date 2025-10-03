/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number format (Polish format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+48|0048)?\s?[1-9]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Validate postal code format (Polish format)
 */
export function isValidPostalCode(postalCode: string): boolean {
  const postalCodeRegex = /^\d{2}-\d{3}$/
  return postalCodeRegex.test(postalCode)
}

/**
 * Validate tax ID (NIP) format
 */
export function isValidTaxId(taxId: string): boolean {
  const nipRegex = /^\d{10}$|^\d{3}-\d{3}-\d{2}-\d{2}$|^\d{3}-\d{2}-\d{2}-\d{3}$/
  return nipRegex.test(taxId.replace(/-/g, ''))
}

/**
 * Validate file type for upload
 */
export function isValidFileType(file: File, allowedTypes: string[] = ['pdf', 'ai', 'eps', 'jpg', 'jpeg', 'png']): boolean {
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  return fileExtension ? allowedTypes.includes(fileExtension) : false
}

/**
 * Validate file size (in MB)
 */
export function isValidFileSize(file: File, maxSizeMB: number = 50): boolean {
  const fileSizeMB = file.size / (1024 * 1024)
  return fileSizeMB <= maxSizeMB
}

/**
 * Validate required field
 */
export function isRequired(value: string | number | undefined | null): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  if (typeof value === 'number') {
    return !isNaN(value) && value >= 0
  }
  return value !== undefined && value !== null
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength
}

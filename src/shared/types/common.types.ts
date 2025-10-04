// Common types used across the application
export type Currency = 'EUR' | 'PLN'
export type Locale = 'en' | 'pl'

export interface BaseEntity {
  id: string
  createdAt?: string
  updatedAt?: string
}

export interface Address {
  firstName: string
  lastName: string
  company?: string
  street: string
  city: string
  postalCode: string
  country: string
  phone?: string
}

export interface User extends BaseEntity {
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
  role: 'customer' | 'admin' | 'editor' | 'production'
}

// API Response types
export interface ApiResponse<T> {
  ok: true
  data: T
}

export interface ApiError {
  ok: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export type ApiResult<T> = ApiResponse<T> | ApiError

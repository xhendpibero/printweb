import type { Address } from '@/shared/types'

// Payment specific types
export interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
  available: boolean
  processingFee?: number
}

export interface InvoiceFormData {
  type: 'individual' | 'company'
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  taxId?: string
  address: Address
}

export interface PaymentFormData {
  paymentMethodId: string
  invoice: InvoiceFormData
  agreeToTerms: boolean
  subscribeNewsletter: boolean
}

export interface PaymentMethodCardProps {
  method: PaymentMethod
  isSelected: boolean
  onSelect: () => void
}

export interface InvoiceFormProps {
  data: InvoiceFormData
  onChange: (data: InvoiceFormData) => void
  errors: Record<string, string>
}

export interface PaymentSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: 'PLN' | 'EUR'
  paymentMethod?: PaymentMethod
}

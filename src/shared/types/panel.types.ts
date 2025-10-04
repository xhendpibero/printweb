// Panel-specific types
import type { BaseEntity, User, Address, Currency } from './common.types'
import type { OrderStatus, PaymentStatus, Order, OrderItem } from './order.types'

// Auth session type
export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

// User roles for organization management
export type OrgRole = 'admin' | 'manager' | 'member'

// Organization user
export interface OrgUser extends BaseEntity {
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: OrgRole
  organizationId: string
  isActive: boolean
}

// Invoice types
export interface Invoice extends BaseEntity {
  invoiceNumber: string
  orderId: string
  issueDate: string
  dueDate: string
  paidDate?: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  grossAmount: number
  netAmount: number
  vatAmount: number
  currency: Currency
  downloadUrl?: string
}

// Message types
export interface Message extends BaseEntity {
  subject: string
  content: string
  isRead: boolean
  priority: 'low' | 'normal' | 'high'
  category: 'order' | 'billing' | 'support' | 'promotion'
  attachments?: MessageAttachment[]
}

export interface MessageAttachment {
  id: string
  name: string
  size: number
  type: string
  downloadUrl: string
}

// Settings types
export interface UserSettings extends BaseEntity {
  userId: string
  language: 'en' | 'pl'
  currency: Currency
  timezone: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    orderUpdates: boolean
    promotions: boolean
    newsletter: boolean
  }
  ftpAccess?: {
    enabled: boolean
    username?: string
    host?: string
    port?: number
  }
}

// Filter types
export interface OrderFilters {
  dateFrom?: string
  dateTo?: string
  status?: OrderStatus[]
  paymentStatus?: PaymentStatus[]
  search?: string
  page?: number
  pageSize?: number
}

export interface InvoiceFilters {
  dateFrom?: string
  dateTo?: string
  status?: Invoice['status'][]
  search?: string
  page?: number
  pageSize?: number
}

// Pagination
export interface PaginatedResult<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// Form payloads
export interface CreateOrgUserPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  role: OrgRole
}

export interface UpdateOrgUserPayload {
  firstName?: string
  lastName?: string
  phone?: string
  role?: OrgRole
  password?: string
}

export interface UpdateUserSettingsPayload {
  language?: 'en' | 'pl'
  currency?: Currency
  timezone?: string
  notifications?: Partial<UserSettings['notifications']>
}

export interface PasswordChangePayload {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Dashboard stats
export interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  totalSpent: number
  activeDiscounts: number
  unreadMessages: number
  recentOrders: Order[]
}

// Navigation item
export interface NavItem {
  id: string
  labelKey: string
  href: string
  icon: string
  badge?: number
  children?: NavItem[]
}

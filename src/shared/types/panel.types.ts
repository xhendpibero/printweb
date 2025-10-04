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
  orderNumber?: string
  issueDate: string
  dueDate?: string
  paidDate?: string
  status: 'paid' | 'unpaid' | 'overdue' | 'canceled'
  grossTotal: number
  netTotal: number
  vatAmount: number
  currency: Currency
  downloadUrl?: string
  xmlUrl?: string
}

export interface InvoiceFilters {
  dateFrom?: string
  dateTo?: string
  period?: 'any' | 'last30' | 'thisMonth' | 'lastMonth' | 'custom'
  status?: Invoice['status'][]
  search?: string
  page?: number
  pageSize?: number
}

export interface PeriodDownloadRequest {
  month: number // 1-12
  year: number
}

export interface EInvoiceConsent {
  enabled: boolean
  updatedAt: string
}

// Address types
export type AddressType = 'shipping' | 'invoice'
export type DeliveryMethod = 'courier' | 'inpost' | 'dpd_pickup'

export interface UserAddress extends BaseEntity {
  type: AddressType
  name: string // address label
  firstName: string
  lastName: string
  companyName?: string
  taxId?: string
  country: string
  street: string
  buildingNumber: string
  apartmentNumber?: string
  postalCode: string
  city: string
  phoneCountryCode?: string
  phoneNumber?: string
  email?: string
  isDefault?: boolean
  deliveryMethod?: DeliveryMethod // shipping only
}

export interface AddressFilters {
  type?: AddressType
  search?: string
  page?: number
  pageSize?: number
}

export interface CreateAddressPayload {
  type: AddressType
  name: string
  firstName: string
  lastName: string
  companyName?: string
  taxId?: string
  country: string
  street: string
  buildingNumber: string
  apartmentNumber?: string
  postalCode: string
  city: string
  phoneCountryCode?: string
  phoneNumber?: string
  email?: string
  deliveryMethod?: DeliveryMethod
}

export interface UpdateAddressPayload extends Partial<CreateAddressPayload> {
  id: string
}

// Discount and Promotion types
export interface DiscountProgram {
  programId: string
  name: string
  currentDiscountPct: number
  nextTier?: {
    name: string
    threshold: number
    discountPct: number
  }
}

export interface Promotion {
  id: string
  name: string
  description: string
  startsAt: string
  endsAt: string
  status: 'active' | 'upcoming' | 'expired'
  conditions?: string[]
}

export interface CouponRedeemRequest {
  code: string
}

export interface CouponRedeemResponse {
  accepted: boolean
  message: string
  discountPct?: number
  promotionId?: string
}

// Message types
export interface Message extends BaseEntity {
  createdAt: string
  updatedAt: string
  subject: string
  content: string
  isRead: boolean
  priority: 'low' | 'normal' | 'high'
  sender: 'system' | 'support' | 'user'
  threadId: string
  orderId?: string
}

export interface MessageThread extends BaseEntity {
  createdAt: string
  updatedAt: string
  subject: string
  lastMessagePreview: string
  lastMessageAt: string
  unread: boolean
  messages: Message[]
}

export interface MessagesFilters {
  search?: string
  page?: number
  pageSize?: number
  unreadOnly?: boolean
}

export interface SendMessagePayload {
  threadId?: string
  subject?: string
  body: string
}

// Cashback types
export interface CashbackBalance {
  currency: Currency
  available: number
  blocked: number
  updatedAt: string
}

export interface CashbackHistoryItem extends BaseEntity {
  createdAt: string
  updatedAt: string
  type: 'earn' | 'redeem' | 'adjust' | 'block' | 'unblock'
  amount: number
  currency: Currency
  note?: string
  orderId?: string
}

export interface RedeemCashbackRequest {
  amount: number
  currency: Currency
  cartId?: string
}

export interface RedeemCashbackResponse {
  success: boolean
  appliedToCartId?: string
  message?: string
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

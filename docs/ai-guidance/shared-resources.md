# 🎯 **Shared Resources Quick Reference**

This file provides a quick reference of all available shared resources to prevent code duplication.

## 📋 **Available Types (`src/shared/types/`)**

### **Common Types**
```typescript
import type { 
  Currency,           // 'EUR' | 'PLN'
  Locale,            // 'en' | 'pl'  
  BaseEntity,        // { id, createdAt?, updatedAt? }
  Address,           // Complete address interface
  User,              // User entity
  ApiResponse,       // API success response
  ApiError,          // API error response
  ApiResult          // Union of success/error
} from '@/shared/types'
```

### **Cart Types**
```typescript
import type {
  CartItem,              // Complete cart item
  CartItemConfiguration, // Product configuration
  CartState,             // Cart store state
  CartCalculations,      // Price calculations
  DiscountCode          // Discount information
} from '@/shared/types'
```

### **Checkout Types**
```typescript
import type {
  CheckoutStep,         // 'cart' | 'upload' | 'shipment' | 'payment' | 'summary'
  FileUploadState,      // File upload tracking
  ShippingOption,       // Shipping method
  PaymentMethod,        // Payment method
  InvoiceData,          // Invoice information
  OrderSummary,         // Complete order summary
  CheckoutItem,         // Checkout item view
  OrderCalculations     // Order price calculations
} from '@/shared/types'
```

### **Product Types**
```typescript
import type {
  Product,              // Product entity
  ProductType,          // Product category enum
  Category,             // Product category
  ProductConfiguration, // Product config
  SelectedFinishing,    // Finishing option
  Configurator,         // Product configurator
  ConfiguratorField,    // Configurator field
  ConfiguratorOption,   // Field option
  PricingRule,          // Pricing rule
  ValidationRule        // Validation rule
} from '@/shared/types'
```

### **Order Types**
```typescript
import type {
  Order,           // Order entity
  OrderStatus,     // Order status enum
  PaymentStatus,   // Payment status enum
  OrderItem        // Order item
} from '@/shared/types'
```

---

## 🔧 **Available Utils (`src/shared/utils/`)**

### **Format Utils**
```typescript
import {
  formatMoney,        // (amount, currency) => formatted price
  formatAmount,       // (amount) => formatted number
  convertCurrency,    // (amount, from, to, rate) => converted
  calculateVAT,       // (net, rate) => vat amount
  calculateGross,     // (net, rate) => gross amount
  calculateNet        // (gross, rate) => net amount
} from '@/shared/utils'
```

### **Validation Utils**
```typescript
import {
  isValidEmail,       // (email) => boolean
  isValidPhone,       // (phone) => boolean (Polish format)
  isValidPostalCode,  // (code) => boolean (Polish format)
  isValidTaxId,       // (taxId) => boolean (NIP format)
  isValidFileType,    // (file, allowedTypes) => boolean
  isValidFileSize,    // (file, maxSizeMB) => boolean
  isRequired,         // (value) => boolean
  hasMinLength,       // (value, min) => boolean
  hasMaxLength        // (value, max) => boolean
} from '@/shared/utils'
```

### **String Utils**
```typescript
import {
  capitalize,         // (str) => capitalized string
  kebabToTitle,       // (kebab-case) => Title Case
  camelToTitle,       // (camelCase) => Title Case
  slugify,           // (str) => url-slug
  truncate,          // (str, maxLength) => truncated
  removeDiacritics,  // (str) => no Polish chars
  getInitials        // (first, last) => initials
} from '@/shared/utils'
```

### **File Utils**
```typescript
import {
  getFileExtension,        // (filename) => extension
  getFileNameWithoutExtension, // (filename) => name only
  formatFileSize,          // (bytes) => human readable
  isImageFile,            // (file) => boolean
  isPdfFile,              // (file) => boolean
  generateUniqueFilename, // (original) => unique name
  createFilePreviewUrl,   // (file) => preview URL
  revokeFilePreviewUrl,   // (url) => void
  fileToBase64           // (file) => Promise<base64>
} from '@/shared/utils'
```

### **Common Utils**
```typescript
import {
  debounce,          // (func, wait) => debounced function
  throttle,          // (func, limit) => throttled function
  deepClone,         // (obj) => deep cloned object
  generateId,        // (length?) => random ID
  sleep,             // (ms) => Promise<void>
  isEmpty            // (value) => boolean
} from '@/shared/utils'
```

---

## ⚙️ **Available Constants (`src/shared/constants/`)**

### **App Constants**
```typescript
import {
  APP_NAME,              // 'Drukarnia Graften'
  APP_VERSION,           // '1.0.0'
  SUPPORTED_LOCALES,     // ['en', 'pl']
  DEFAULT_LOCALE,        // 'pl'
  SUPPORTED_CURRENCIES,  // ['PLN', 'EUR']
  DEFAULT_CURRENCY,      // 'PLN'
  API_BASE_URL,         // API endpoint
  MAX_FILE_SIZE_MB,     // File upload limit
  ALLOWED_FILE_TYPES,   // Allowed extensions
  CACHE_TTL,            // Cache durations
  TOAST_DURATION        // Toast timings
} from '@/shared/constants'
```

### **Checkout Constants**
```typescript
import {
  CHECKOUT_STEPS,        // ['cart', 'upload', 'shipment', 'payment', 'summary']
  CHECKOUT_STEP_LABELS,  // Step display names
  UPLOAD_VALIDATION,     // File upload rules
  SHIPPING_OPTIONS,      // Available shipping methods
  PAYMENT_METHODS        // Available payment methods
} from '@/shared/constants'
```

### **Cart Constants**
```typescript
import {
  CART_STORAGE_KEY,      // 'drukarnia-cart'
  CART_LIMITS,           // Max items, quantities, etc.
  EXCHANGE_RATES,        // Currency conversion rates
  VAT_RATES,             // Tax rates
  SAMPLE_DISCOUNT_CODES, // Mock discount codes
  CONFIGURATION_DISPLAY_ORDER // Config field order
} from '@/shared/constants'
```

---

## 🎭 **Available Mock Data (`src/mocks/data/`)**

### **Cart Mocks**
```typescript
import {
  mockCartItems,    // Sample cart items
  mockEmptyCart     // Empty cart state
} from '@/mocks/data'
```

### **Checkout Mocks**
```typescript
import {
  mockCheckoutItems,     // Checkout view items
  mockShippingOptions,   // Shipping methods
  mockPaymentMethods,    // Payment options
  mockInvoiceData        // Sample invoice data
} from '@/mocks/data'
```

---

## 🚨 **Before You Create Something New**

### **Checklist:**
1. ✅ **Check if type exists** in `src/shared/types/`
2. ✅ **Check if utility exists** in `src/shared/utils/`
3. ✅ **Check if constant exists** in `src/shared/constants/`
4. ✅ **Check if mock data exists** in `src/mocks/data/`
5. ✅ **Consider if it should be shared** vs feature-specific

### **Quick Search Commands:**
```bash
# Search for existing types
grep -r "interface.*Item" src/shared/types/

# Search for existing utilities  
grep -r "export function.*format" src/shared/utils/

# Search for existing constants
grep -r "export const.*CONFIG" src/shared/constants/
```

---

## 📝 **Usage Examples**

### **Complete Feature Component Example**
```typescript
'use client'

import { useState, useCallback } from 'react'
import type { CartItem, CheckoutStep } from '@/shared/types'
import { 
  formatMoney, 
  isValidFileType, 
  debounce 
} from '@/shared/utils'
import { 
  CHECKOUT_STEPS, 
  MAX_FILE_SIZE_MB,
  VAT_RATES 
} from '@/shared/constants'
import { mockCartItems } from '@/mocks/data'

export function CheckoutUploadSection() {
  const [items] = useState<CartItem[]>(mockCartItems)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  
  const handleFileUpload = useCallback(
    debounce((itemId: string, files: FileList) => {
      Array.from(files).forEach(file => {
        if (!isValidFileType(file)) {
          // Handle invalid file type
          return
        }
        // Process upload
      })
    }, 300),
    []
  )
  
  const calculateTotal = useCallback(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * 0.12), 0)
    const vat = subtotal * VAT_RATES.STANDARD
    return subtotal + vat
  }, [items])
  
  return (
    <div className="space-y-6">
      {items.map(item => (
        <div key={item.itemId} className="border rounded-lg p-4">
          <h3 className="font-medium">{item.slug.replace(/-/g, ' ')}</h3>
          <p className="text-sm text-gray-600">
            {item.configuration.format} • {item.configuration.paper}
          </p>
          <p className="font-medium">
            {formatMoney(item.quantity * 0.12, 'PLN')}
          </p>
          
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.png"
            onChange={(e) => e.target.files && handleFileUpload(item.itemId, e.target.files)}
          />
        </div>
      ))}
      
      <div className="text-right">
        <p className="text-lg font-bold">
          Total: {formatMoney(calculateTotal(), 'PLN')}
        </p>
      </div>
    </div>
  )
}
```

This quick reference ensures you never recreate existing functionality! 🎯

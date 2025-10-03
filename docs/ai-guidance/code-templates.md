# 🎯 **Code Generation Templates**

This file provides specific templates and examples for common code generation scenarios.

## 📋 **Template: New Feature Component**

```typescript
// Template: src/features/{feature}/components/{ComponentName}.tsx
'use client'

import { useState } from 'react'
import type { /* Import shared types */ } from '@/shared/types'
import { /* Import shared utils */ } from '@/shared/utils'
import { /* Import constants */ } from '@/shared/constants'

interface {ComponentName}Props {
  // Define props with proper types
}

export function {ComponentName}({ /* props */ }: {ComponentName}Props) {
  // Component logic here
  
  return (
    <div className="/* Tailwind classes */">
      {/* Component JSX */}
    </div>
  )
}
```

## 📋 **Template: New Page Component**

```typescript
// Template: src/app/[locale]/{route}/page.tsx
import { {FeatureName}PageContainer } from '@/features/{feature}/components'
import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout'

export default function {PageName}Page() {
  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="{step}" />
      <{FeatureName}PageContainer />
    </CheckoutLayout>
  )
}
```

## 📋 **Template: New Hook**

```typescript
// Template: src/features/{feature}/hooks/use{HookName}.ts
import { useState, useCallback } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { /* Import types */ } from '@/shared/types'
import { /* Import utils */ } from '@/shared/utils'

export function use{HookName}() {
  // Hook logic here
  
  return {
    // Return hook interface
  }
}
```

## 📋 **Template: New Utility Function**

```typescript
// Template: src/shared/utils/{category}.utils.ts
import type { /* Import types */ } from '../types'

/**
 * Description of what this function does
 * @param param1 - Description
 * @param param2 - Description
 * @returns Description
 */
export function {functionName}(param1: Type1, param2: Type2): ReturnType {
  // Implementation
}
```

## 📋 **Template: New Type Definition**

```typescript
// Template: src/shared/types/{category}.types.ts
import type { BaseEntity, Currency } from './common.types'

export interface {TypeName} extends BaseEntity {
  // Properties with proper types
}

export type {TypeName}Status = 'status1' | 'status2' | 'status3'
```

## 📋 **Template: New Constants File**

```typescript
// Template: src/shared/constants/{category}.constants.ts
export const {CATEGORY}_CONFIG = {
  MAX_ITEMS: 50,
  DEFAULT_VALUE: 'value',
  TIMEOUT: 5000
} as const

export const {CATEGORY}_OPTIONS = [
  { id: 'option1', name: 'Option 1', value: 'val1' },
  { id: 'option2', name: 'Option 2', value: 'val2' }
] as const
```

## 📋 **Template: New Mock Data**

```typescript
// Template: src/mocks/data/{category}.mock.ts
import type { {TypeName} } from '@/shared/types'

export const mock{TypeName}s: {TypeName}[] = [
  {
    id: 'mock-1',
    // Mock properties
  },
  {
    id: 'mock-2',
    // Mock properties
  }
]
```

---

## 🔧 **Common Code Patterns**

### **Form Handling Pattern**
```typescript
import { useState } from 'react'
import { isValidEmail, isRequired } from '@/shared/utils'

export function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}
    
    if (!isRequired(formData.email)) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Submit form
    }
  }, [formData, validateForm])

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

### **API Integration Pattern**
```typescript
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ApiResult, {DataType} } from '@/shared/types'
import { addToast } from '@/components/ui/Toast'

export function use{Feature}Api() {
  const fetchData = useQuery({
    queryKey: ['{feature}', 'data'],
    queryFn: async (): Promise<{DataType}[]> => {
      // API call
    }
  })

  const createItem = useMutation({
    mutationFn: async (data: Create{DataType}): Promise<ApiResult<{DataType}>> => {
      // API call
    },
    onSuccess: () => {
      addToast({ type: 'success', title: 'Success', message: 'Item created' })
    },
    onError: (error) => {
      addToast({ type: 'error', title: 'Error', message: error.message })
    }
  })

  return { fetchData, createItem }
}
```

### **State Management Pattern**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { {StateType} } from '@/shared/types'

interface {Feature}Store extends {StateType} {
  // Actions
  addItem: (item: {ItemType}) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<{ItemType}>) => void
  clearAll: () => void
}

export const use{Feature}Store = create<{Feature}Store>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      
      // Actions
      addItem: (item) => {
        set(state => ({
          items: [...state.items, item]
        }))
      },
      
      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },
      
      updateItem: (id, updates) => {
        set(state => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, ...updates } : item
          )
        }))
      },
      
      clearAll: () => {
        set({ items: [] })
      }
    }),
    {
      name: '{feature}-storage'
    }
  )
)
```

---

## 🎨 **UI Component Patterns**

### **Button Component Pattern**
```typescript
import { forwardRef } from 'react'
import { cn } from '@/shared/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          {
            'bg-primary text-white hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'border border-input hover:bg-accent': variant === 'outline',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
            'opacity-50 cursor-not-allowed': loading
          },
          className
        )}
        disabled={loading}
        ref={ref}
        {...props}
      >
        {loading && <LoadingSpinner className="mr-2 h-4 w-4" />}
        {children}
      </button>
    )
  }
)
```

### **Modal Component Pattern**
```typescript
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
```

---

## 🔄 **Migration Patterns**

### **Moving Code to Shared**
```typescript
// Before: Inline utility in component
function formatPrice(amount: number) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(amount)
}

// After: Move to shared utils
// src/shared/utils/format.utils.ts
export function formatMoney(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// Component now imports:
import { formatMoney } from '@/shared/utils'
```

### **Extracting Feature Components**
```typescript
// Before: Everything in page
export default function CheckoutPage() {
  const [step, setStep] = useState('upload')
  const [files, setFiles] = useState({})
  // ... 200 lines of logic
  
  return (
    <div>
      {/* Complex JSX */}
    </div>
  )
}

// After: Extract to feature components
export default function CheckoutPage() {
  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="upload" />
      <CheckoutUploadContainer />
    </CheckoutLayout>
  )
}
```

This template system ensures consistent, maintainable code generation! 🚀

# 🤖 **AI Assistant Instructions**

This file contains specific instructions for AI assistants (like Cursor) working on this codebase.

## 🎯 **Primary Objectives**

1. **Maintain consistency** with established patterns
2. **Reuse existing code** from shared resources
3. **Follow feature-based organization**
4. **Ensure type safety** throughout
5. **Create maintainable, testable code**

## 📋 **Before Every Code Generation**

### **MANDATORY CHECKS:**
1. 🔍 **Search `src/shared/types/`** - Does this type already exist?
2. 🔍 **Search `src/shared/utils/`** - Does this utility already exist?
3. 🔍 **Search `src/shared/constants/`** - Does this constant already exist?
4. 🔍 **Check mock data** - Is there existing mock data for this?

### **DECISION TREE:**
```
New Code Request
├── Type Definition?
│   ├── Common across features? → src/shared/types/
│   └── Feature-specific? → src/features/{feature}/types/
├── Utility Function?
│   ├── Reusable across features? → src/shared/utils/
│   └── Feature-specific? → src/features/{feature}/utils/
├── Component?
│   ├── UI Component? → src/components/ui/
│   ├── Feature Component? → src/features/{feature}/components/
│   └── Page Component? → Keep minimal, delegate to features
└── Configuration/Constants?
    ├── App-wide? → src/shared/constants/
    └── Feature-specific? → src/features/{feature}/constants/
```

## 🧩 **Component Generation Rules**

### **Page Components (src/app/)**
```typescript
// ✅ ALWAYS: Keep page components minimal
export default function PageName() {
  return (
    <AppropriateLayout>
      <FeatureContainer />
    </AppropriateLayout>
  )
}

// ❌ NEVER: Put business logic in page components
export default function PageName() {
  const [state, setState] = useState() // Move to feature component!
  const handleSomething = () => {} // Move to feature component!
  // ... 100+ lines of logic
}
```

### **Feature Components (src/features/)**
```typescript
// ✅ ALWAYS: Import from shared first
import type { /* Types */ } from '@/shared/types'
import { /* Utils */ } from '@/shared/utils'
import { /* Constants */ } from '@/shared/constants'

// ✅ ALWAYS: Use proper TypeScript
interface ComponentProps {
  // Properly typed props
}

export function FeatureComponent({ }: ComponentProps) {
  // Component logic
}
```

## 🔧 **Import Order (STRICT)**

```typescript
// 1. React & Next.js (first)
import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 2. External libraries
import { useMutation } from '@tanstack/react-query'
import { create } from 'zustand'

// 3. Shared types (HIGHEST PRIORITY)
import type { CartItem, Currency } from '@/shared/types'

// 4. Shared utilities
import { formatMoney, debounce } from '@/shared/utils'

// 5. Shared constants
import { CHECKOUT_STEPS } from '@/shared/constants'

// 6. Mock data (if needed)
import { mockCartItems } from '@/mocks/data'

// 7. Feature-specific imports
import { useCheckoutFlow } from '@/features/checkout/hooks'

// 8. Components (UI then feature-specific)
import { Button, Modal } from '@/components/ui'
import { CartItem } from '@/features/cart/components'

// 9. Styles (last)
import './component.css'
```

## 🎨 **Naming Conventions**

### **Files & Directories**
- **Components**: `PascalCase.tsx` (e.g., `CartItem.tsx`)
- **Hooks**: `camelCase.ts` (e.g., `useCart.ts`)
- **Utils**: `kebab-case.utils.ts` (e.g., `format.utils.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `cart.types.ts`)
- **Constants**: `kebab-case.constants.ts` (e.g., `app.constants.ts`)
- **Directories**: `kebab-case` (e.g., `checkout`, `cart`)

### **Variables & Functions**
- **Components**: `PascalCase` (e.g., `CartSummary`)
- **Functions**: `camelCase` (e.g., `formatMoney`)
- **Variables**: `camelCase` (e.g., `cartItems`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)
- **Types/Interfaces**: `PascalCase` (e.g., `CartItem`)

## 🚨 **Common Mistakes to Avoid**

### **❌ DON'T: Recreate existing functionality**
```typescript
// BAD: Creating duplicate utility
const formatPrice = (amount: number) => `$${amount.toFixed(2)}`

// GOOD: Use existing utility
import { formatMoney } from '@/shared/utils'
const formattedPrice = formatMoney(amount, 'PLN')
```

### **❌ DON'T: Hardcode values**
```typescript
// BAD: Hardcoded constants
const maxFiles = 5
const vatRate = 0.23

// GOOD: Use shared constants
import { UPLOAD_VALIDATION, VAT_RATES } from '@/shared/constants'
const maxFiles = UPLOAD_VALIDATION.MAX_FILES_PER_ITEM
const vatRate = VAT_RATES.STANDARD
```

### **❌ DON'T: Use `any` types**
```typescript
// BAD: Any types
const handleData = (data: any) => {}

// GOOD: Proper types
import type { CartItem } from '@/shared/types'
const handleData = (data: CartItem) => {}
```

### **❌ DON'T: Create monolithic components**
```typescript
// BAD: Everything in one component
export function CheckoutPage() {
  // 300+ lines of mixed concerns
}

// GOOD: Separated concerns
export function CheckoutPage() {
  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="upload" />
      <UploadSection />
      <OrderSummary />
    </CheckoutLayout>
  )
}
```

## ✅ **Quality Checklist**

Before considering code complete, verify:

- [ ] **Imports are properly ordered**
- [ ] **Using existing shared resources** (not recreating)
- [ ] **Proper TypeScript types** (no `any`)
- [ ] **Consistent naming conventions**
- [ ] **Appropriate file location** (shared vs feature-specific)
- [ ] **Component separation** (single responsibility)
- [ ] **Error handling** implemented
- [ ] **Loading states** considered
- [ ] **Mobile responsive** (if UI component)
- [ ] **Accessible** (proper ARIA labels, etc.)

## 🎯 **Success Patterns**

### **✅ Perfect Feature Component**
```typescript
'use client'

import { useState, useCallback } from 'react'
import type { CartItem, FileUploadState } from '@/shared/types'
import { 
  isValidFileType, 
  formatFileSize, 
  debounce 
} from '@/shared/utils'
import { 
  UPLOAD_VALIDATION, 
  TOAST_DURATION 
} from '@/shared/constants'
import { addToast } from '@/components/ui/Toast'

interface UploadSectionProps {
  items: CartItem[]
  onFilesUploaded: (itemId: string, files: File[]) => void
}

export function UploadSection({ items, onFilesUploaded }: UploadSectionProps) {
  const [uploadState, setUploadState] = useState<FileUploadState>({})
  
  const handleFileUpload = useCallback(
    debounce((itemId: string, files: FileList) => {
      const validFiles = Array.from(files).filter(file => {
        if (!isValidFileType(file, UPLOAD_VALIDATION.ALLOWED_EXTENSIONS)) {
          addToast({
            type: 'error',
            title: 'Invalid file type',
            message: `${file.name} is not a supported file type`
          })
          return false
        }
        
        if (!isValidFileSize(file, UPLOAD_VALIDATION.MAX_FILE_SIZE / (1024 * 1024))) {
          addToast({
            type: 'error',
            title: 'File too large',
            message: `${file.name} exceeds ${formatFileSize(UPLOAD_VALIDATION.MAX_FILE_SIZE)}`
          })
          return false
        }
        
        return true
      })
      
      if (validFiles.length > 0) {
        onFilesUploaded(itemId, validFiles)
        setUploadState(prev => ({
          ...prev,
          [itemId]: validFiles
        }))
        
        addToast({
          type: 'success',
          title: 'Files uploaded',
          message: `${validFiles.length} file(s) uploaded successfully`
        })
      }
    }, 300),
    [onFilesUploaded]
  )
  
  return (
    <div className="space-y-6">
      {items.map(item => (
        <div key={item.itemId} className="border rounded-lg p-4">
          {/* Component JSX */}
        </div>
      ))}
    </div>
  )
}
```

## 🚀 **Final Reminder**

**The goal is to create maintainable, reusable, and consistent code that follows established patterns. Always check shared resources first, use proper types, and separate concerns appropriately.**

Happy coding! 🎉

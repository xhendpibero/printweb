# 🤖 **AI Code Generation Rules & Patterns**

This file provides guidance for AI assistants (like Cursor) to understand our codebase organization and make better decisions when generating code.

## 📁 **Project Structure Overview**

```
src/
├── shared/                    # 🔄 Shared utilities & types (USE FIRST)
│   ├── types/                # Type definitions - ALWAYS import from here
│   ├── utils/                # Common utilities - CHECK before creating new
│   ├── constants/            # Configuration & constants
│   └── schemas/              # Validation schemas
├── features/                 # 🎯 Feature-based organization
│   ├── cart/                 # Cart-specific code
│   ├── checkout/             # Checkout-specific code
│   └── products/             # Product-specific code
├── components/               # 🧩 Reusable UI components
├── mocks/                    # 🎭 Mock data & API responses
├── hooks/                    # ⚡ Global React hooks
├── lib/                      # 📚 External library configs
└── stores/                   # 🗄️ State management
```

---

## 🎯 **Code Generation Rules**

### **1. ALWAYS Check Shared Resources First**

Before creating new code, **ALWAYS** check if similar functionality exists:

#### **Types (`src/shared/types/`)**
```typescript
// ✅ GOOD: Import existing types
import type { CartItem, Currency } from '@/shared/types'

// ❌ BAD: Creating duplicate types
interface MyCartItem { ... } // This probably exists!
```

#### **Utils (`src/shared/utils/`)**
```typescript
// ✅ GOOD: Use existing utilities
import { formatMoney, isValidEmail } from '@/shared/utils'

// ❌ BAD: Recreating utilities
const formatPrice = (amount) => ... // formatMoney already exists!
```

#### **Constants (`src/shared/constants/`)**
```typescript
// ✅ GOOD: Use existing constants
import { CHECKOUT_STEPS, VAT_RATES } from '@/shared/constants'

// ❌ BAD: Hardcoding values
const steps = ['cart', 'upload', 'payment'] // Use CHECKOUT_STEPS!
```

### **2. Feature-Based Organization**

When creating feature-specific code, organize by domain:

```typescript
// ✅ GOOD: Feature-based structure
src/features/checkout/
├── components/
│   ├── UploadSection.tsx
│   └── PaymentForm.tsx
├── hooks/
│   └── useCheckoutFlow.ts
├── types/
│   └── checkout-specific.types.ts
└── utils/
    └── checkout.utils.ts

// ❌ BAD: Generic components folder
src/components/
├── UploadThing.tsx
├── PaymentStuff.tsx
└── CheckoutWhatever.tsx
```

### **3. Import Hierarchy (Priority Order)**

```typescript
// 1. React & Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. External libraries
import { useMutation } from '@tanstack/react-query'

// 3. Shared types (HIGHEST PRIORITY)
import type { CartItem, CheckoutStep } from '@/shared/types'

// 4. Shared utilities
import { formatMoney, debounce } from '@/shared/utils'

// 5. Shared constants
import { CHECKOUT_STEPS } from '@/shared/constants'

// 6. Feature-specific imports
import { useCheckoutFlow } from '@/features/checkout/hooks'

// 7. Components
import { Button } from '@/components/ui'

// 8. Local imports
import './styles.css'
```

---

## 🧩 **Component Creation Patterns**

### **Page Components**
```typescript
// ✅ GOOD: Clean page component
export default function CheckoutUploadPage() {
  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="upload" />
      <UploadPageContainer />
    </CheckoutLayout>
  )
}

// ❌ BAD: Everything in page component
export default function CheckoutUploadPage() {
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(false)
  // ... 200 lines of logic
}
```

### **Feature Components**
```typescript
// ✅ GOOD: Feature component with proper imports
import type { FileUploadState } from '@/shared/types'
import { isValidFileType, formatFileSize } from '@/shared/utils'
import { MAX_FILE_SIZE_MB } from '@/shared/constants'

export function UploadSection({ onUpload }: UploadSectionProps) {
  // Component logic here
}
```

---

## 🔧 **Utility Function Patterns**

### **Before Creating New Utils**
1. Check `src/shared/utils/` first
2. If similar exists, extend it
3. If new, add to appropriate shared util file

```typescript
// ✅ GOOD: Adding to existing util file
// src/shared/utils/format.utils.ts
export function formatFileSize(bytes: number): string {
  // Implementation
}

// ❌ BAD: Creating new file for one function
// src/utils/file-formatter.ts
export function formatFileSize(bytes: number): string {
  // Same implementation
}
```

---

## 📝 **Type Definition Patterns**

### **Shared Types vs Feature Types**

```typescript
// ✅ GOOD: Shared types for common entities
// src/shared/types/cart.types.ts
export interface CartItem {
  itemId: string
  quantity: number
  // ... common properties
}

// ✅ GOOD: Feature-specific extensions
// src/features/checkout/types/upload.types.ts
export interface UploadableCartItem extends CartItem {
  uploadedFiles: File[]
  uploadProgress: number
}

// ❌ BAD: Duplicating base types
// src/features/checkout/types/upload.types.ts
export interface CheckoutCartItem {
  itemId: string
  quantity: number // Duplicating CartItem!
  uploadedFiles: File[]
}
```

---

## 🎭 **Mock Data Patterns**

### **Using Mock Data**
```typescript
// ✅ GOOD: Import from organized mocks
import { mockCartItems, mockCheckoutItems } from '@/mocks/data'

// ✅ GOOD: Feature-specific mock API
import { mockCheckoutApi } from '@/mocks/api'

// ❌ BAD: Inline mock data
const items = [
  { id: '1', name: 'Test' }, // Use organized mocks!
  { id: '2', name: 'Test 2' }
]
```

---

## 🔍 **Decision Tree for Code Generation**

```
New Code Needed?
├── Is it a TYPE?
│   ├── Common entity? → Add to src/shared/types/
│   └── Feature-specific? → Add to src/features/{feature}/types/
├── Is it a UTILITY?
│   ├── Common function? → Add to src/shared/utils/
│   └── Feature-specific? → Add to src/features/{feature}/utils/
├── Is it a CONSTANT?
│   ├── App-wide config? → Add to src/shared/constants/
│   └── Feature-specific? → Add to src/features/{feature}/constants/
├── Is it a COMPONENT?
│   ├── Reusable UI? → Add to src/components/ui/
│   ├── Feature-specific? → Add to src/features/{feature}/components/
│   └── Page component? → Keep minimal, delegate to feature components
└── Is it MOCK DATA?
    ├── Test data? → Add to src/mocks/data/
    └── API responses? → Add to src/mocks/api/
```

---

## ✅ **Quick Checklist for AI**

Before generating code, ask:

1. **Does this type/util/constant already exist in `shared/`?**
2. **Is this feature-specific or reusable?**
3. **Am I importing from the right places?**
4. **Is the component doing too much? (Should it be split?)**
5. **Am I following the established patterns?**

---

## 🚨 **Common Anti-Patterns to Avoid**

```typescript
// ❌ BAD: Hardcoded values
const vatRate = 0.23 // Use VAT_RATES.STANDARD

// ❌ BAD: Duplicate utilities
const formatPrice = (price) => ... // Use formatMoney()

// ❌ BAD: Inline types
const item: { id: string; name: string } = ... // Use proper interface

// ❌ BAD: Everything in page component
export default function Page() {
  // 300 lines of mixed concerns
}

// ❌ BAD: Generic naming
import { Thing } from './Thing' // Be specific!

// ❌ BAD: Not using shared resources
const isEmpty = (val) => !val // Use shared isEmpty()
```

---

## 🎯 **Success Metrics**

Good code generation should result in:
- ✅ **Reusable**: Uses shared resources
- ✅ **Consistent**: Follows established patterns
- ✅ **Maintainable**: Clear separation of concerns
- ✅ **Type-safe**: Proper TypeScript usage
- ✅ **Discoverable**: Easy to find and understand

**Remember: The goal is consistency, reusability, and maintainability!** 🚀

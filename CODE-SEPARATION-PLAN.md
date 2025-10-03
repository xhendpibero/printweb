# 🔧 **Code Separation & Organization Plan**

## 📋 **Current Analysis**

### **Current Structure Issues:**
1. **Mixed concerns** in page components (UI + logic + data + types)
2. **Inline types** scattered throughout components
3. **Hardcoded constants** and configuration
4. **Mock data** mixed with real data structures
5. **Utility functions** spread across files
6. **No validation schemas** or specifications

---

## 🎯 **Refactoring Strategy**

### **Phase 1: Core Infrastructure**
1. **Utils Organization** - Extract common utilities
2. **Types Separation** - Organize type definitions
3. **Constants & Config** - Centralize configuration
4. **Mock Data Structure** - Organize test/demo data

### **Phase 2: Feature Separation**
1. **Checkout Flow** - Separate concerns per page
2. **Cart Management** - Extract business logic
3. **Product Configuration** - Organize configurator logic
4. **API Layer** - Structured API clients

### **Phase 3: Validation & Specs**
1. **Data Schemas** - Validation specifications
2. **Form Validation** - Input validation utilities
3. **API Contracts** - Request/response schemas

---

## 📁 **New Directory Structure**

```
src/
├── app/                          # Next.js app router
├── components/                   # UI components
├── features/                     # 🆕 Feature-based organization
│   ├── checkout/
│   │   ├── components/          # Checkout-specific components
│   │   ├── hooks/               # Checkout-specific hooks
│   │   ├── types/               # Checkout types
│   │   ├── utils/               # Checkout utilities
│   │   ├── constants/           # Checkout constants
│   │   └── api/                 # Checkout API calls
│   ├── cart/
│   ├── products/
│   └── orders/
├── shared/                       # 🆕 Shared utilities
│   ├── types/                   # Global types
│   ├── utils/                   # Common utilities
│   ├── constants/               # App constants
│   ├── schemas/                 # Validation schemas
│   └── config/                  # Configuration
├── mocks/                        # 🆕 Mock data & API responses
│   ├── data/                    # Mock data
│   ├── api/                     # Mock API responses
│   └── fixtures/                # Test fixtures
├── lib/                          # External library configs
├── hooks/                        # 🆕 Global hooks
├── stores/                       # State management
└── utils/                        # 🆕 Legacy utils (to be organized)
```

---

## 🚀 **Implementation Plan**

### **Step 1: Create Shared Infrastructure**

#### **A. Shared Types (`src/shared/types/`)**
```typescript
// checkout.types.ts
// cart.types.ts  
// product.types.ts
// api.types.ts
// common.types.ts
```

#### **B. Shared Utils (`src/shared/utils/`)**
```typescript
// format.utils.ts      - Money, date formatting
// validation.utils.ts  - Common validations
// string.utils.ts      - String manipulations
// file.utils.ts        - File operations
// url.utils.ts         - URL utilities
```

#### **C. Constants (`src/shared/constants/`)**
```typescript
// checkout.constants.ts
// cart.constants.ts
// api.constants.ts
// app.constants.ts
```

### **Step 2: Feature-based Organization**

#### **A. Checkout Feature (`src/features/checkout/`)**
```typescript
// components/
//   - UploadSection.tsx
//   - ShippingForm.tsx
//   - PaymentForm.tsx
//   - OrderSummary.tsx

// hooks/
//   - useCheckoutFlow.ts
//   - useFileUpload.ts
//   - useShipping.ts

// types/
//   - upload.types.ts
//   - shipping.types.ts
//   - payment.types.ts

// utils/
//   - file-validation.utils.ts
//   - shipping.utils.ts
//   - payment.utils.ts
```

#### **B. Cart Feature (`src/features/cart/`)**
```typescript
// components/
//   - CartItemCard.tsx
//   - CartSummaryCard.tsx
//   - DiscountSection.tsx

// hooks/
//   - useCartOperations.ts
//   - useCartCalculations.ts

// types/
//   - cart-item.types.ts
//   - discount.types.ts

// utils/
//   - cart-calculations.utils.ts
//   - pricing.utils.ts
```

### **Step 3: Mock Data Organization**

#### **A. Mock Data (`src/mocks/data/`)**
```typescript
// cart.mock.ts
// products.mock.ts
// checkout.mock.ts
// users.mock.ts
```

#### **B. Mock APIs (`src/mocks/api/`)**
```typescript
// cart.api.mock.ts
// checkout.api.mock.ts
// products.api.mock.ts
```

### **Step 4: Validation Schemas**

#### **A. Schemas (`src/shared/schemas/`)**
```typescript
// cart.schema.ts       - Zod schemas for cart validation
// checkout.schema.ts   - Checkout form validation
// product.schema.ts    - Product configuration validation
```

---

## 📋 **Per-Page Refactoring Plan**

### **1. Upload Page Refactoring**

#### **Before:**
```typescript
// All in one file: UI + logic + types + constants
export default function OrderUploadPage() {
  // 180+ lines of mixed concerns
}
```

#### **After:**
```typescript
// src/app/[locale]/order/upload/page.tsx
import { UploadPageContainer } from '@/features/checkout/components'

export default function OrderUploadPage() {
  return <UploadPageContainer />
}

// src/features/checkout/components/UploadPageContainer.tsx
// Clean, focused component with separated concerns
```

### **2. Cart Page Refactoring**

#### **Extract Components:**
- `CartHeader` - Title and actions
- `CartItemsList` - List rendering
- `CartSummaryPanel` - Pricing and actions
- `CartEmptyState` - Empty cart state

#### **Extract Hooks:**
- `useCartData` - Data fetching
- `useCartActions` - CRUD operations
- `useCartCalculations` - Price calculations

### **3. Product Configuration Refactoring**

#### **Extract Features:**
- `ProductConfigurator` - Main configurator logic
- `ConfigurationPreview` - Visual preview
- `PricingCalculator` - Dynamic pricing
- `AddToCartHandler` - Cart integration

---

## 🎯 **Benefits of This Approach**

### **For Development:**
1. **Clearer code structure** - Easy to find and modify code
2. **Better testing** - Isolated units are easier to test
3. **Reusable components** - Shared utilities across features
4. **Type safety** - Centralized type definitions

### **For AI Assistance:**
1. **Better context** - AI can understand feature boundaries
2. **Focused changes** - Modifications target specific areas
3. **Consistent patterns** - Predictable code organization
4. **Clear dependencies** - Easier to trace data flow

### **For Maintenance:**
1. **Easier debugging** - Isolated concerns
2. **Simpler refactoring** - Change one thing at a time
3. **Better documentation** - Self-documenting structure
4. **Team collaboration** - Clear ownership boundaries

---

## 🚀 **Implementation Order**

### **Priority 1: Immediate (Today)**
1. ✅ Create shared types structure
2. ✅ Extract common utilities
3. ✅ Organize constants and configuration
4. ✅ Set up mock data structure

### **Priority 2: Core Features (This Week)**
1. ✅ Refactor checkout pages
2. ✅ Separate cart logic
3. ✅ Organize product configurator
4. ✅ Structure API layer

### **Priority 3: Advanced (Next Week)**
1. ✅ Add validation schemas
2. ✅ Create comprehensive tests
3. ✅ Add error boundaries
4. ✅ Performance optimization

---

## ✅ **Success Criteria**

1. **Each page < 100 lines** - Focused, single responsibility
2. **Reusable components** - DRY principle applied
3. **Type safety 100%** - No `any` types
4. **Clear data flow** - Easy to trace from UI to API
5. **Testable units** - Each function/component testable
6. **AI-friendly** - Clear context for AI assistance

---

**Ready to start implementation?** Let's begin with the shared infrastructure and then move feature by feature! 🚀

# 📋 **Client Panel Pages Implementation Plan**

Based on the documentation in `docs/clientPanel/`, here's a comprehensive plan to implement all the remaining "under development" pages.

## 🎯 **Implementation Priority & Complexity**

### **Phase 1: Core Business Features (High Priority)**
1. **📄 Invoices** - Critical for business operations
2. **📍 Addresses** - Essential for shipping/billing
3. **💰 Discounts & Promotions** - Customer engagement

### **Phase 2: Communication & Rewards (Medium Priority)**
4. **💬 Messages** - Customer communication
5. **🏆 CashBack** - Loyalty program

---

## 📄 **1. INVOICES PAGE**

### **Complexity:** ⭐⭐⭐ (Medium-High)
### **Business Impact:** 🔥 Critical

### **Features to Implement:**
- ✅ Invoice list with filtering (date, search, status)
- ✅ Download individual invoices (PDF)
- ✅ Bulk period downloads (monthly/yearly ZIP)
- ✅ E-invoice consent toggle
- ✅ Status badges (paid/unpaid/overdue/canceled)

### **Components Structure:**
```
src/features/panel/components/invoices/
├── InvoicesPageContainer.tsx
├── InvoicesFilters.tsx
├── InvoicesList.tsx
├── InvoiceRow.tsx
├── InvoicesDownloadPanel.tsx
└── EInvoiceConsent.tsx
```

### **Data Types:**
```typescript
interface Invoice {
  id: string
  number: string
  issueDate: string
  dueDate?: string
  orderNumber?: string
  grossTotal: number
  netTotal: number
  currency: Currency
  status: 'paid' | 'unpaid' | 'overdue' | 'canceled'
  downloadUrl: string
  xmlUrl?: string
}
```

---

## 📍 **2. ADDRESSES PAGE**

### **Complexity:** ⭐⭐⭐⭐ (High)
### **Business Impact:** 🔥 Critical

### **Features to Implement:**
- ✅ Address management (shipping/billing)
- ✅ Modal forms with tabs (Private/Company)
- ✅ Address validation and formatting
- ✅ Default address management
- ✅ Delivery method selection

### **Components Structure:**
```
src/features/panel/components/addresses/
├── AddressesPageContainer.tsx
├── AddressesFilters.tsx
├── AddressesTable.tsx
├── AddressRowMenu.tsx
├── AddressModal.tsx
├── ShippingAddressForm.tsx
└── InvoiceAddressForm.tsx
```

### **Data Types:**
```typescript
interface Address {
  id: string
  type: 'shipping' | 'invoice'
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
  isDefault?: boolean
  deliveryMethod?: 'courier' | 'inpost' | 'dpd_pickup'
}
```

---

## 💰 **3. DISCOUNTS & PROMOTIONS PAGE**

### **Complexity:** ⭐⭐ (Medium)
### **Business Impact:** 🚀 High Value

### **Features to Implement:**
- ✅ Current discount program display
- ✅ Active promotions list
- ✅ Coupon redemption
- ✅ Next tier progress indicator

### **Components Structure:**
```
src/features/panel/components/discounts/
├── DiscountsPageContainer.tsx
├── ProgramSummary.tsx
├── PromotionsList.tsx
└── CouponRedeemer.tsx
```

### **Data Types:**
```typescript
interface DiscountProgram {
  programId: string
  name: string
  currentDiscountPct: number
  nextTier?: {
    name: string
    threshold: number
    discountPct: number
  }
}

interface Promotion {
  id: string
  name: string
  description: string
  startsAt: string
  endsAt: string
  status: 'active' | 'upcoming' | 'expired'
  conditions?: string[]
}
```

---

## 💬 **4. MESSAGES PAGE**

### **Complexity:** ⭐⭐⭐ (Medium-High)
### **Business Impact:** 📞 Communication

### **Features to Implement:**
- ✅ Message threads list
- ✅ Read/unread indicators
- ✅ Thread view (optional)
- ✅ Reply functionality (optional)
- ✅ Empty state

### **Components Structure:**
```
src/features/panel/components/messages/
├── MessagesPageContainer.tsx
├── MessagesEmpty.tsx
├── MessagesList.tsx
├── MessageListItem.tsx
├── ThreadView.tsx (optional)
└── Composer.tsx (optional)
```

### **Data Types:**
```typescript
interface MessageThread {
  id: string
  subject: string
  lastMessagePreview: string
  lastMessageAt: string
  unread: boolean
}

interface Message {
  id: string
  threadId: string
  author: 'system' | 'support' | 'user'
  body: string
  createdAt: string
}
```

---

## 🏆 **5. CASHBACK PAGE**

### **Complexity:** ⭐⭐ (Medium)
### **Business Impact:** 💎 Loyalty

### **Features to Implement:**
- ✅ Multi-currency balance display
- ✅ Available vs blocked funds
- ✅ Transaction history (optional)
- ✅ Redemption functionality (optional)

### **Components Structure:**
```
src/features/panel/components/cashback/
├── CashbackPageContainer.tsx
├── CashbackBalances.tsx
├── CashbackHistory.tsx (optional)
└── RedeemToOrder.tsx (optional)
```

### **Data Types:**
```typescript
interface CashbackBalance {
  currency: Currency
  available: number
  blocked: number
  updatedAt: string
}

interface CashbackHistoryItem {
  id: string
  createdAt: string
  type: 'earn' | 'redeem' | 'adjust' | 'block' | 'unblock'
  amount: number
  currency: Currency
  note?: string
  orderId?: string
}
```

---

## 🛠️ **IMPLEMENTATION STRATEGY**

### **1. Shared Infrastructure First**
- ✅ Update panel translations with all new keys
- ✅ Add all new types to `src/shared/types/panel.types.ts`
- ✅ Create API client stubs in `src/lib/api/`
- ✅ Set up React Query hooks structure

### **2. Mock Data Strategy**
- ✅ Create comprehensive mock data for each feature
- ✅ Implement realistic business logic
- ✅ Include edge cases (empty states, errors)

### **3. Component Architecture**
- ✅ Follow existing patterns from Orders/Dashboard
- ✅ Reuse shared UI components
- ✅ Implement proper loading/error states
- ✅ Ensure mobile responsiveness

### **4. Progressive Enhancement**
- ✅ Start with basic CRUD operations
- ✅ Add advanced features incrementally
- ✅ Implement optional features based on business needs

---

## 📅 **SUGGESTED IMPLEMENTATION ORDER**

### **Week 1: Invoices** (Most Critical)
- Day 1-2: Data types, API structure, basic list
- Day 3-4: Filtering, search, downloads
- Day 5: E-invoice consent, polish

### **Week 2: Addresses** (Most Complex)
- Day 1-2: Basic CRUD, table view
- Day 3-4: Modal forms, validation
- Day 5: Address types, delivery methods

### **Week 3: Discounts** (High Value)
- Day 1-2: Program display, promotions list
- Day 3: Coupon redemption
- Day 4-5: Polish, edge cases

### **Week 4: Messages & CashBack** (Nice to Have)
- Day 1-3: Messages system
- Day 4-5: CashBack balances

---

## 🎯 **SUCCESS METRICS**

- ✅ All pages build without errors
- ✅ Responsive design on all devices
- ✅ Proper loading/error states
- ✅ Complete i18n coverage
- ✅ Accessibility compliance
- ✅ Realistic mock data for demos

---

**Ready to start implementation? Which page would you like to tackle first?** 🚀

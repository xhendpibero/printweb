# 🎯 **Feature Development Examples**

This file provides complete examples of how to implement common features using our organized structure.

## 📋 **Example 1: Adding a New Checkout Step**

Let's say we want to add a "Review" step to the checkout flow.

### **Step 1: Update Shared Types**
```typescript
// src/shared/types/checkout.types.ts
export type CheckoutStep = 'cart' | 'upload' | 'shipment' | 'payment' | 'review' | 'summary'
```

### **Step 2: Update Constants**
```typescript
// src/shared/constants/checkout.constants.ts
export const CHECKOUT_STEPS = ['cart', 'upload', 'shipment', 'payment', 'review', 'summary'] as const

export const CHECKOUT_STEP_LABELS = {
  cart: 'Cart',
  upload: 'Upload Files',
  shipment: 'Shipping',
  payment: 'Payment',
  review: 'Review', // Added
  summary: 'Summary'
} as const
```

### **Step 3: Create Feature Component**
```typescript
// src/features/checkout/components/ReviewSection.tsx
'use client'

import { useMemo } from 'react'
import type { CartItem, OrderCalculations } from '@/shared/types'
import { formatMoney, calculateVAT } from '@/shared/utils'
import { VAT_RATES } from '@/shared/constants'

interface ReviewSectionProps {
  items: CartItem[]
  shippingCost: number
  currency: 'PLN' | 'EUR'
}

export function ReviewSection({ items, shippingCost, currency }: ReviewSectionProps) {
  const calculations = useMemo((): OrderCalculations => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * 0.12), 0)
    const tax = calculateVAT(subtotal + shippingCost, VAT_RATES.STANDARD)
    
    return {
      subtotal,
      shipping: shippingCost,
      tax,
      discount: 0,
      total: subtotal + shippingCost + tax,
      currency
    }
  }, [items, shippingCost, currency])
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Order Review</h2>
        
        {/* Items */}
        <div className="space-y-4 mb-6">
          {items.map(item => (
            <div key={item.itemId} className="flex justify-between items-center py-2 border-b">
              <div>
                <h3 className="font-medium">{item.slug.replace(/-/g, ' ')}</h3>
                <p className="text-sm text-gray-600">
                  {item.configuration.format} • Qty: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatMoney(item.quantity * 0.12, currency)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Totals */}
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatMoney(calculations.subtotal, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{formatMoney(calculations.shipping, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (23%):</span>
            <span>{formatMoney(calculations.tax, currency)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>{formatMoney(calculations.total, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### **Step 4: Create Page**
```typescript
// src/app/[locale]/order/review/page.tsx
import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { ReviewPageContainer } from '@/features/checkout/components/ReviewPageContainer'

export default function OrderReviewPage() {
  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="review" />
      <ReviewPageContainer />
    </CheckoutLayout>
  )
}
```

### **Step 5: Create Page Container**
```typescript
// src/features/checkout/components/ReviewPageContainer.tsx
'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCartStore } from '@/stores/cart-store'
import { ReviewSection } from './ReviewSection'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function ReviewPageContainer() {
  const params = useParams()
  const locale = params.locale as string
  const { items, currency } = useCartStore()
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Your Order</h1>
        <p className="text-gray-600">
          Please review all details before proceeding to final confirmation.
        </p>
      </div>

      <ReviewSection 
        items={items} 
        shippingCost={15.00} 
        currency={currency} 
      />

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link
          href={`/${locale}/order/payment`}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payment
        </Link>
        
        <Link
          href={`/${locale}/order/summary`}
          className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Continue to Summary
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
```

---

## 📋 **Example 2: Adding a New Utility Function**

Let's add a function to calculate shipping costs based on weight and distance.

### **Step 1: Add to Shared Utils**
```typescript
// src/shared/utils/shipping.utils.ts
import type { Address } from '../types'

export interface ShippingCalculation {
  baseCost: number
  weightCost: number
  distanceCost: number
  totalCost: number
  estimatedDays: number
}

/**
 * Calculate shipping cost based on weight and destination
 */
export function calculateShippingCost(
  weightKg: number,
  destination: Address,
  shippingMethod: 'standard' | 'express' | 'overnight' = 'standard'
): ShippingCalculation {
  // Base costs by method
  const baseCosts = {
    standard: 15.00,
    express: 25.00,
    overnight: 45.00
  }
  
  // Weight-based pricing (per kg over 1kg)
  const weightCost = Math.max(0, weightKg - 1) * 2.50
  
  // Distance-based pricing (simplified - in real app would use geocoding)
  const isInternational = destination.country !== 'Poland'
  const distanceCost = isInternational ? 20.00 : 0.00
  
  // Estimated delivery days
  const estimatedDays = {
    standard: isInternational ? 7 : 3,
    express: isInternational ? 3 : 1,
    overnight: 1
  }
  
  return {
    baseCost: baseCosts[shippingMethod],
    weightCost,
    distanceCost,
    totalCost: baseCosts[shippingMethod] + weightCost + distanceCost,
    estimatedDays: estimatedDays[shippingMethod]
  }
}

/**
 * Estimate package weight based on cart items
 */
export function estimatePackageWeight(items: Array<{ quantity: number; productType: string }>): number {
  const weightPerItem = {
    'business-cards': 0.01, // 10g per 100 cards
    'flyers': 0.005,        // 5g per flyer
    'posters': 0.1,         // 100g per poster
    'default': 0.05         // 50g default
  }
  
  return items.reduce((totalWeight, item) => {
    const itemWeight = weightPerItem[item.productType as keyof typeof weightPerItem] || weightPerItem.default
    return totalWeight + (item.quantity * itemWeight)
  }, 0.2) // Base packaging weight: 200g
}
```

### **Step 2: Update Utils Index**
```typescript
// src/shared/utils/index.ts
export * from './format.utils'
export * from './validation.utils'
export * from './string.utils'
export * from './file.utils'
export * from './common.utils'
export * from './shipping.utils' // Added
```

### **Step 3: Use in Feature Component**
```typescript
// src/features/checkout/components/ShippingCalculator.tsx
'use client'

import { useMemo } from 'react'
import type { CartItem, Address } from '@/shared/types'
import { 
  calculateShippingCost, 
  estimatePackageWeight,
  formatMoney 
} from '@/shared/utils'

interface ShippingCalculatorProps {
  items: CartItem[]
  destination: Address
  selectedMethod: 'standard' | 'express' | 'overnight'
}

export function ShippingCalculator({ items, destination, selectedMethod }: ShippingCalculatorProps) {
  const shippingCalculation = useMemo(() => {
    const estimatedWeight = estimatePackageWeight(
      items.map(item => ({
        quantity: item.quantity,
        productType: item.slug.split('-')[0] // Extract product type from slug
      }))
    )
    
    return calculateShippingCost(estimatedWeight, destination, selectedMethod)
  }, [items, destination, selectedMethod])
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium mb-3">Shipping Calculation</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base cost ({selectedMethod}):</span>
          <span>{formatMoney(shippingCalculation.baseCost, 'PLN')}</span>
        </div>
        {shippingCalculation.weightCost > 0 && (
          <div className="flex justify-between">
            <span>Weight surcharge:</span>
            <span>{formatMoney(shippingCalculation.weightCost, 'PLN')}</span>
          </div>
        )}
        {shippingCalculation.distanceCost > 0 && (
          <div className="flex justify-between">
            <span>International surcharge:</span>
            <span>{formatMoney(shippingCalculation.distanceCost, 'PLN')}</span>
          </div>
        )}
        <div className="flex justify-between font-medium border-t pt-2">
          <span>Total shipping:</span>
          <span>{formatMoney(shippingCalculation.totalCost, 'PLN')}</span>
        </div>
        <div className="text-xs text-gray-600">
          Estimated delivery: {shippingCalculation.estimatedDays} business days
        </div>
      </div>
    </div>
  )
}
```

---

## 📋 **Example 3: Adding New Mock Data**

Let's add mock data for shipping addresses.

### **Step 1: Create Mock Data**
```typescript
// src/mocks/data/addresses.mock.ts
import type { Address } from '@/shared/types'

export const mockAddresses: Address[] = [
  {
    firstName: 'Jan',
    lastName: 'Kowalski',
    company: 'Tech Solutions Sp. z o.o.',
    street: 'ul. Marszałkowska 123/45',
    city: 'Warszawa',
    postalCode: '00-001',
    country: 'Poland',
    phone: '+48 123 456 789'
  },
  {
    firstName: 'Anna',
    lastName: 'Nowak',
    street: 'ul. Floriańska 15',
    city: 'Kraków',
    postalCode: '31-021',
    country: 'Poland',
    phone: '+48 987 654 321'
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    company: 'International Corp.',
    street: '123 Business Street',
    city: 'Berlin',
    postalCode: '10115',
    country: 'Germany',
    phone: '+49 30 12345678'
  }
]

export const mockDefaultAddress: Address = mockAddresses[0]
```

### **Step 2: Update Mock Data Index**
```typescript
// src/mocks/data/index.ts
export * from './cart.mock'
export * from './checkout.mock'
export * from './addresses.mock' // Added
```

### **Step 3: Use in Component**
```typescript
// src/features/checkout/components/AddressSelector.tsx
'use client'

import { useState } from 'react'
import type { Address } from '@/shared/types'
import { mockAddresses, mockDefaultAddress } from '@/mocks/data'

interface AddressSelectorProps {
  onAddressSelect: (address: Address) => void
}

export function AddressSelector({ onAddressSelect }: AddressSelectorProps) {
  const [selectedAddress, setSelectedAddress] = useState<Address>(mockDefaultAddress)
  const [showAddresses, setShowAddresses] = useState(false)
  
  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address)
    onAddressSelect(address)
    setShowAddresses(false)
  }
  
  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">Shipping Address</h3>
          <button
            onClick={() => setShowAddresses(!showAddresses)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Change
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p className="font-medium">
            {selectedAddress.firstName} {selectedAddress.lastName}
          </p>
          {selectedAddress.company && (
            <p>{selectedAddress.company}</p>
          )}
          <p>{selectedAddress.street}</p>
          <p>{selectedAddress.postalCode} {selectedAddress.city}</p>
          <p>{selectedAddress.country}</p>
          {selectedAddress.phone && (
            <p>{selectedAddress.phone}</p>
          )}
        </div>
      </div>
      
      {showAddresses && (
        <div className="space-y-2">
          {mockAddresses.map((address, index) => (
            <button
              key={index}
              onClick={() => handleAddressSelect(address)}
              className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="text-sm">
                <p className="font-medium">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-gray-600">
                  {address.street}, {address.city}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 🎯 **Key Takeaways from Examples**

1. **Always start with shared resources** - types, utils, constants
2. **Feature components are focused** - single responsibility
3. **Page components are minimal** - just layout and container
4. **Mock data is organized** - easy to find and reuse
5. **Consistent patterns** - same structure across features
6. **Proper imports** - shared resources first, then feature-specific
7. **Type safety** - everything is properly typed
8. **Reusable utilities** - can be used across features

These examples show how our organized structure makes development faster, more consistent, and easier to maintain! 🚀

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, FileText } from 'lucide-react'
import type { OrderSummaryData } from '../types'
import { useCartStore } from '@/stores/cart-store'
import { useCartCalculations } from '@/features/cart/hooks'
import { mockAddresses, mockInvoiceData } from '@/mocks/data'
import { formatCartItemConfiguration } from '@/features/cart/utils'
import { OrderReviewSection } from './OrderReviewSection'
import { ShippingReview } from './ShippingReview'
import { PaymentReview } from './PaymentReview'
import { OrderTotals } from './OrderTotals'

export function SummaryPageContainer() {
  const params = useParams()
  const locale = params.locale as string
  const items = useCartStore((s) => s.items)
  const calculations = useCartCalculations()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  // Mock order data - in real app would come from checkout state
  const orderSummary: OrderSummaryData = {
    items: items.map(item => ({
      itemId: item.itemId,
      productName: item.slug.replace(/-/g, ' '),
      slug: item.slug,
      quantity: item.quantity,
      configuration: formatCartItemConfiguration(item),
      unitPrice: 0.12, // Mock price
      totalPrice: item.quantity * 0.12,
      thumbnail: item.thumbnail,
      hasFiles: Math.random() > 0.5 // Mock file status
    })),
    shipping: {
      address: mockAddresses[0],
      method: 'Standard Delivery (3-5 business days)',
      cost: calculations.deliveryNet,
      estimatedDelivery: 'Thursday (09/18)'
    },
    payment: {
      method: 'Credit/Debit Card',
      invoice: {
        type: mockInvoiceData.type,
        name: `${mockInvoiceData.firstName} ${mockInvoiceData.lastName}`,
        email: mockInvoiceData.email,
        address: mockInvoiceData.address,
        company: mockInvoiceData.company,
        taxId: mockInvoiceData.taxId
      }
    },
    totals: {
      subtotal: calculations.printingNet,
      shipping: calculations.deliveryNet,
      tax: calculations.vatAmount,
      total: calculations.totalGross,
      currency: 'PLN'
    }
  }

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)
    
    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to confirmation page
      window.location.href = `/${locale}/order/confirmation/ORD-2025-001`
    } catch (error) {
      console.error('Failed to place order:', error)
      setIsPlacingOrder(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Summary</h1>
        <p className="text-gray-600">
          Review your order details before placing your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <OrderReviewSection 
            items={orderSummary.items} 
            currency={orderSummary.totals.currency} 
          />
          
          <ShippingReview
            address={orderSummary.shipping.address}
            method={orderSummary.shipping.method}
            cost={orderSummary.shipping.cost}
            estimatedDelivery={orderSummary.shipping.estimatedDelivery}
            currency={orderSummary.totals.currency}
          />
          
          <PaymentReview
            method={orderSummary.payment.method}
            invoice={orderSummary.payment.invoice}
          />
        </div>

        {/* Right Column - Order Total */}
        <div>
          <OrderTotals totals={orderSummary.totals} />
        </div>
      </div>

      {/* Final Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/${locale}/order/payment`}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Payment
          </Link>

          <button
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-md font-medium transition-colors ${
              isPlacingOrder
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isPlacingOrder ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Placing Order...
              </>
            ) : (
              <>
                Place Order
                <FileText className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <div className="text-sm text-gray-500">
          <FileText className="w-4 h-4 inline mr-1" />
          All information will be saved automatically
        </div>
      </div>
    </div>
  )
}

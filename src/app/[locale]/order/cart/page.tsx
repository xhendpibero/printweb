import Link from 'next/link'
import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { CartList } from '@/components/cart/CartList'
import { CartSummary } from '@/components/cart/CartSummary'
import { useCartStore } from '@/stores/cart-store'
import { CartDemoSeed } from '@/components/cart/CartDemoSeed'
import { ToastContainer } from '@/components/ui/Toast'

export default function OrderCartPage() {
  // trigger client store hydration (no usage here, just for SSR mismatch safety)
  useCartStore.getState()

  return (
    <CheckoutLayout showBackToCart={false}>
      <CheckoutStepper currentStep="cart" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CartDemoSeed />
        <h1 className="text-3xl font-bold mb-6">Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div>
            <CartList />

            <div className="mt-6">
              <Link href="../../" className="text-gray-700 hover:text-gray-900 text-sm">
                ← Back to shop
              </Link>
            </div>
          </div>

          <CartSummary />
        </div>
      </div>
      <ToastContainer />
    </CheckoutLayout>
  )
}

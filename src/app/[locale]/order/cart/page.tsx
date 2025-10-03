import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { CartPageContainer } from '@/features/cart/components'
import { ToastContainer } from '@/components/ui/Toast'

export default function OrderCartPage() {
  return (
    <CheckoutLayout showBackToCart={false}>
      <CheckoutStepper currentStep="cart" />
      <CartPageContainer />
      <ToastContainer />
    </CheckoutLayout>
  )
}

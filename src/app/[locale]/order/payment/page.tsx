import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { PaymentPageContainer } from '@/features/checkout/components'

export default function OrderPaymentPage() {
  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="payment" />
      <PaymentPageContainer />
    </CheckoutLayout>
  )
}
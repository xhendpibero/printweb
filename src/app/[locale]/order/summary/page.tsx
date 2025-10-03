import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { SummaryPageContainer } from '@/features/checkout/components'

export default function OrderSummaryPage() {
  return (
    <CheckoutLayout showBackToCart={false}>
      <CheckoutStepper currentStep="summary" />
      <SummaryPageContainer />
    </CheckoutLayout>
  )
}
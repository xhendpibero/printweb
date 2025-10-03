import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { UploadPageContainer } from '@/features/checkout/components'

export default function OrderUploadPage() {
  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="upload" />
      <UploadPageContainer />
    </CheckoutLayout>
  )
}

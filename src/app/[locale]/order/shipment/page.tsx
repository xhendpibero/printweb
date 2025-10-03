import { CheckoutLayout } from '@/components/layout'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { ShipmentPageContainer } from '@/features/checkout/components'

export default function OrderShipmentPage() {
  return (
    <CheckoutLayout>
      <CheckoutStepper currentStep="shipment" />
      <ShipmentPageContainer />
    </CheckoutLayout>
  )
}
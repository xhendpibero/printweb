'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Check, ShoppingCart, Upload, Truck, CreditCard, FileText } from 'lucide-react'

interface Step {
  id: string
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  status: 'complete' | 'current' | 'upcoming'
}

interface CheckoutStepperProps {
  currentStep: 'cart' | 'upload' | 'shipment' | 'payment' | 'summary'
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const params = useParams()
  const locale = params.locale as string

  const getStepStatus = (stepId: string): 'complete' | 'current' | 'upcoming' => {
    const stepOrder = ['cart', 'upload', 'shipment', 'payment', 'summary']
    const currentIndex = stepOrder.indexOf(currentStep)
    const stepIndex = stepOrder.indexOf(stepId)
    
    if (stepIndex < currentIndex) return 'complete'
    if (stepIndex === currentIndex) return 'current'
    return 'upcoming'
  }

  const steps: Step[] = [
    {
      id: 'cart',
      name: 'Cart',
      href: `/${locale}/order/cart`,
      icon: ShoppingCart,
      status: getStepStatus('cart')
    },
    {
      id: 'upload',
      name: 'Upload Files',
      href: `/${locale}/order/upload`,
      icon: Upload,
      status: getStepStatus('upload')
    },
    {
      id: 'shipment',
      name: 'Shipping',
      href: `/${locale}/order/shipment`,
      icon: Truck,
      status: getStepStatus('shipment')
    },
    {
      id: 'payment',
      name: 'Payment',
      href: `/${locale}/order/payment`,
      icon: CreditCard,
      status: getStepStatus('payment')
    },
    {
      id: 'summary',
      name: 'Review',
      href: `/${locale}/order/summary`,
      icon: FileText,
      status: getStepStatus('summary')
    }
  ]

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav aria-label="Checkout progress">
          {/* Mobile Stepper */}
          <div className="flex items-center justify-between sm:hidden">
            <div className="text-sm font-medium text-gray-900">
              Step {steps.findIndex(s => s.status === 'current') + 1} of {steps.length}
            </div>
            <div className="text-sm text-gray-500">
              {steps.find(s => s.status === 'current')?.name}
            </div>
          </div>

          {/* Desktop Stepper */}
          <ol className="hidden sm:flex items-center justify-between">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative flex-1">
                {/* Step Content */}
                <div className="flex items-center">
                  {/* Step Circle */}
                  <div className="relative flex items-center justify-center">
                    {step.status === 'complete' ? (
                      <Link
                        href={step.href}
                        className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </Link>
                    ) : step.status === 'current' ? (
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="ml-4 min-w-0 flex-1">
                    {step.status === 'complete' ? (
                      <Link
                        href={step.href}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        {step.name}
                      </Link>
                    ) : (
                      <div
                        className={`text-sm font-medium ${
                          step.status === 'current'
                            ? 'text-indigo-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {stepIdx < steps.length - 1 && (
                  <div className="absolute top-5 left-10 w-full h-px bg-gray-200">
                    <div
                      className={`h-full transition-all duration-300 ${
                        steps[stepIdx + 1].status === 'complete' || 
                        (steps[stepIdx + 1].status === 'current' && step.status === 'complete')
                          ? 'bg-indigo-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>

          {/* Mobile Progress Bar */}
          <div className="mt-4 sm:hidden">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((steps.findIndex(s => s.status === 'current') + 1) / steps.length) * 100}%`
                }}
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

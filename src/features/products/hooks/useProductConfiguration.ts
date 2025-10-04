import { useState, useCallback, useMemo } from 'react'
import type { ProductConfigurationState, ProductSummary } from '../types'
import { 
  calculateProductPricing, 
  getEstimatedDelivery, 
  validateConfiguration,
  getDefaultConfiguration 
} from '../utils'

/**
 * Hook for managing product configuration state
 */
export function useProductConfiguration(productName: string) {
  const [configuration, setConfiguration] = useState<ProductConfigurationState>(
    getDefaultConfiguration()
  )

  const updateConfiguration = useCallback((updates: Partial<ProductConfigurationState>) => {
    setConfiguration(prev => ({ ...prev, ...updates }))
  }, [])

  const resetConfiguration = useCallback(() => {
    setConfiguration(getDefaultConfiguration())
  }, [])

  const validation = useMemo(() => 
    validateConfiguration(configuration), 
    [configuration]
  )

  const pricing = useMemo(() => 
    calculateProductPricing(configuration.quantity, configuration),
    [configuration]
  )

  const delivery = useMemo(() => 
    getEstimatedDelivery(),
    []
  )

  const summary: ProductSummary = useMemo(() => ({
    productName,
    quantity: configuration.quantity,
    configuration,
    pricing,
    delivery
  }), [productName, configuration, pricing, delivery])

  return {
    configuration,
    updateConfiguration,
    resetConfiguration,
    validation,
    pricing,
    delivery,
    summary
  }
}

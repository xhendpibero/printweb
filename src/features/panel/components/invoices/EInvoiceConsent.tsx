'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { useInvoicesTranslations } from '@/shared/hooks'
import type { EInvoiceConsent } from '@/shared/types'
import { MOCK_E_INVOICE_CONSENT } from '@/mocks/data/invoices.mock'

export function EInvoiceConsent() {
  const t = useInvoicesTranslations()
  const [consent, setConsent] = useState<EInvoiceConsent>(MOCK_E_INVOICE_CONSENT)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggle = async () => {
    setIsUpdating(true)
    
    // Mock API call - in real app, this would call the API
    console.log('Toggling e-invoice consent:', !consent.enabled)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setConsent(prev => ({
      enabled: !prev.enabled,
      updatedAt: new Date().toISOString()
    }))
    
    setIsUpdating(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              {t('eInvoice.title')}
            </h3>
            <div className="group relative">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity w-64 text-center">
                Electronic invoices are delivered in XML format for automated processing
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            {t('eInvoice.description')}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {consent.enabled ? t('eInvoice.enabled') : t('eInvoice.disabled')}
              </p>
              <p className="text-xs text-gray-500">
                {t('eInvoice.lastUpdated')}: {new Date(consent.updatedAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={handleToggle}
              disabled={isUpdating}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 ${
                consent.enabled ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span className="sr-only">{t('eInvoice.toggle')}</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  consent.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
              {isUpdating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-white" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

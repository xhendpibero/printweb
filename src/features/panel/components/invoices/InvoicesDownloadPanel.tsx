'use client'

import { useState } from 'react'
import { Download, X } from 'lucide-react'
import { useInvoicesTranslations } from '@/shared/hooks'
import type { PeriodDownloadRequest } from '@/shared/types'

interface InvoicesDownloadPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function InvoicesDownloadPanel({ isOpen, onClose }: InvoicesDownloadPanelProps) {
  const t = useInvoicesTranslations()
  const [downloadData, setDownloadData] = useState<PeriodDownloadRequest>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  })
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    
    // Mock download - in real app, this would call the API
    console.log('Downloading period:', downloadData)
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsDownloading(false)
    onClose()
  }

  if (!isOpen) return null

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {t('downloadPanel.title')}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {t('downloadPanel.subtitle')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('downloadPanel.month')}
            </label>
            <select
              value={downloadData.month}
              onChange={(e) => setDownloadData(prev => ({ ...prev, month: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {months.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('downloadPanel.year')}
            </label>
            <select
              value={downloadData.year}
              onChange={(e) => setDownloadData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            disabled={isDownloading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {t('downloadPanel.download')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

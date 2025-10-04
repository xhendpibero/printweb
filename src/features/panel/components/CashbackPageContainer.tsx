'use client'

import { useState } from 'react'
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Filter, Calendar } from 'lucide-react'
import { useCashbackTranslations } from '@/shared/hooks'
import type { CashbackHistoryItem, RedeemCashbackRequest, Currency } from '@/shared/types'
import { 
  MOCK_CASHBACK_HISTORY,
  getCashbackBalance,
  getTotalBalance,
  filterCashbackHistory,
  formatCashbackAmount,
  getCashbackTypeColor,
  formatCashbackDate,
  MIN_REDEMPTION_AMOUNTS
} from '@/mocks/data/cashback.mock'

export function CashbackPageContainer() {
  const t = useCashbackTranslations()
  
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('PLN')
  const [typeFilter, setTypeFilter] = useState<CashbackHistoryItem['type'] | 'all'>('all')
  const [redeemAmount, setRedeemAmount] = useState('')
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [redeemMessage, setRedeemMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const currentBalance = getCashbackBalance(selectedCurrency)
  const totalBalance = getTotalBalance(selectedCurrency)
  
  const filteredHistory = filterCashbackHistory(MOCK_CASHBACK_HISTORY, {
    type: typeFilter === 'all' ? undefined : typeFilter,
    currency: selectedCurrency,
    page: 1,
    pageSize: 20
  })

  const minRedemption = MIN_REDEMPTION_AMOUNTS[selectedCurrency]

  const handleRedeemCashback = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const amount = parseFloat(redeemAmount)
    
    if (!amount || amount < minRedemption) {
      setRedeemMessage({ 
        type: 'error', 
        text: `Minimum redemption amount is ${minRedemption.toFixed(2)} ${selectedCurrency}` 
      })
      return
    }

    if (!currentBalance || amount > currentBalance.available) {
      setRedeemMessage({ type: 'error', text: t('redeem.insufficientFunds') })
      return
    }

    setIsRedeeming(true)
    setRedeemMessage(null)

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const redeemRequest: RedeemCashbackRequest = {
        amount,
        currency: selectedCurrency
      }

      console.log('Redeem cashback:', redeemRequest)
      // TODO: API call to redeem cashback
      
      setRedeemMessage({ type: 'success', text: t('redeem.success') })
      setRedeemAmount('')
    } catch {
      setRedeemMessage({ type: 'error', text: t('redeem.error') })
    } finally {
      setIsRedeeming(false)
    }
  }

  const getTransactionIcon = (type: CashbackHistoryItem['type']) => {
    switch (type) {
      case 'earn':
      case 'unblock':
        return <ArrowUpRight className="h-4 w-4" />
      case 'redeem':
      case 'block':
        return <ArrowDownRight className="h-4 w-4" />
      case 'adjust':
        return <TrendingUp className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-2 text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Balance and Redemption */}
        <div className="lg:col-span-2 space-y-6">
          {/* Currency Selector */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">{t('balance.title')}</h2>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="PLN">PLN</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            {currentBalance ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Available Balance */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Wallet className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-green-800">{t('balance.available')}</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {currentBalance.available.toFixed(2)} {selectedCurrency}
                  </div>
                </div>

                {/* Blocked Balance */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium text-orange-800">{t('balance.blocked')}</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">
                    {currentBalance.blocked.toFixed(2)} {selectedCurrency}
                  </div>
                </div>

                {/* Total Balance */}
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-indigo-800">{t('balance.total')}</span>
                  </div>
                  <div className="text-2xl font-bold text-indigo-900">
                    {totalBalance.toFixed(2)} {selectedCurrency}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No cashback balance for {selectedCurrency}
              </div>
            )}

            {currentBalance && (
              <div className="mt-4 text-sm text-gray-500">
                {t('balance.lastUpdated')}: {formatCashbackDate(currentBalance.updatedAt)}
              </div>
            )}
          </div>

          {/* Transaction History */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{t('history.title')}</h3>
                
                {/* Type Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as CashbackHistoryItem['type'] | 'all')}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">{t('history.filters.all')}</option>
                    <option value="earn">{t('history.filters.earn')}</option>
                    <option value="redeem">{t('history.filters.redeem')}</option>
                    <option value="adjust">{t('history.filters.adjust')}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredHistory.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('history.columns.date')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('history.columns.type')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('history.columns.amount')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('history.columns.note')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredHistory.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCashbackDate(transaction.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCashbackTypeColor(transaction.type)}`}>
                            {getTransactionIcon(transaction.type)}
                            {t(`types.${transaction.type}`)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatCashbackAmount(transaction.amount, transaction.currency)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="max-w-xs truncate">
                            {transaction.note}
                          </div>
                          {transaction.orderId && (
                            <div className="text-xs text-gray-400 mt-1">
                              Order: {transaction.orderId}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <Wallet className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">{t('history.empty')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Redemption Form */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg sticky top-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">{t('redeem.title')}</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">{t('redeem.subtitle')}</p>
            </div>

            <div className="p-6">
              {currentBalance && currentBalance.available >= minRedemption ? (
                <form onSubmit={handleRedeemCashback} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('redeem.amount')} ({selectedCurrency})
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min={minRedemption}
                      max={currentBalance.available}
                      value={redeemAmount}
                      onChange={(e) => setRedeemAmount(e.target.value)}
                      placeholder={t('redeem.amountPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      disabled={isRedeeming}
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      {t('redeem.minAmount')} {selectedCurrency} • {t('redeem.maxAmount')} {currentBalance.available.toFixed(2)} {selectedCurrency}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!redeemAmount || parseFloat(redeemAmount) < minRedemption || isRedeeming}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRedeeming ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        {t('redeem.redeeming')}
                      </>
                    ) : (
                      <>
                        <Wallet className="h-4 w-4" />
                        {t('redeem.redeem')}
                      </>
                    )}
                  </button>

                  {redeemMessage && (
                    <div className={`p-3 rounded-md text-sm ${
                      redeemMessage.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {redeemMessage.text}
                    </div>
                  )}
                </form>
              ) : (
                <div className="text-center py-6">
                  <Wallet className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    {currentBalance 
                      ? `Minimum ${minRedemption.toFixed(2)} ${selectedCurrency} required for redemption`
                      : `No ${selectedCurrency} cashback available`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

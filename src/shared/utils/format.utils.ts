import type { Currency } from '../types'

/**
 * Format money amount with currency symbol
 */
export function formatMoney(amount: number, currency: Currency): string {
  const formatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  
  return formatter.format(amount)
}

/**
 * Format money amount without currency symbol
 */
export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  
  return formatter.format(amount)
}

/**
 * Convert currency between PLN and EUR
 */
export function convertCurrency(
  amount: number, 
  fromCurrency: Currency, 
  toCurrency: Currency,
  exchangeRate: number = 4.5
): number {
  if (fromCurrency === toCurrency) return amount
  
  if (fromCurrency === 'PLN' && toCurrency === 'EUR') {
    return amount / exchangeRate
  }
  
  if (fromCurrency === 'EUR' && toCurrency === 'PLN') {
    return amount * exchangeRate
  }
  
  return amount
}

/**
 * Calculate VAT amount
 */
export function calculateVAT(netAmount: number, vatRate: number = 0.23): number {
  return netAmount * vatRate
}

/**
 * Calculate gross amount from net
 */
export function calculateGross(netAmount: number, vatRate: number = 0.23): number {
  return netAmount * (1 + vatRate)
}

/**
 * Calculate net amount from gross
 */
export function calculateNet(grossAmount: number, vatRate: number = 0.23): number {
  return grossAmount / (1 + vatRate)
}

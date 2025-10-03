'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/stores/cart-store'

interface CheckoutLayoutProps {
  children: React.ReactNode
  showBackToCart?: boolean
}

export function CheckoutLayout({ children, showBackToCart = true }: CheckoutLayoutProps) {
  const params = useParams()
  const locale = params.locale as string
  const totalItems = useCartStore((s) => s.getTotalItems())

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simplified Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              {showBackToCart && (
                <Link
                  href={`/${locale}/order/cart`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Cart</span>
                </Link>
              )}
              <div className="h-6 w-px bg-gray-300" />
              <Link href={`/${locale}`}>
                <h1 className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Drukarnia Graften
                </h1>
              </Link>
            </div>

            {/* Cart Summary */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <ShoppingCart className="w-4 h-4" />
                <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
              </div>
              
              {/* Secure Checkout Badge */}
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-green-700">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href={`/${locale}/privacy`} className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-gray-700">
                Terms of Service
              </Link>
              <Link href={`/${locale}/contact`} className="hover:text-gray-700">
                Support
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>SSL Encrypted</span>
              </div>
              <div className="text-sm text-gray-500">
                © 2025 Drukarnia Graften
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductsDropdown } from './ProductsDropdown';
import { ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { UserAvatarDropdown } from '@/features/panel/components';
import { useAuth } from '@/features/panel/hooks/useAuth';

export function MainHeader() {
  const nav = useTranslations('navigation');
  const params = useParams();
  const locale = params.locale as string;
  
  // Auth state
  const { user, signOut, signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn() // Mock sign in
      // User will be redirected to dashboard automatically by the auth system
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  }
  
  // Use client-only state to prevent hydration mismatch
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  
  const getTotalItems = useCartStore((s) => s.getTotalItems);

  useEffect(() => {
    setIsClient(true);
    setTotalItems(getTotalItems());
  }, [getTotalItems]);

  // Subscribe to cart changes
  useEffect(() => {
    if (!isClient) return;
    
    const unsubscribe = useCartStore.subscribe((state) => {
      setTotalItems(state.getTotalItems());
    });
    
    return unsubscribe;
  }, [isClient]);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href={`/${locale}`}>
              <h1 className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Drukarnia Graften
              </h1>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              <Link 
                href={`/${locale}`}
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {nav('home')}
              </Link>
              <ProductsDropdown />
              <Link 
                href={`/${locale}/about`}
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {nav('about')}
              </Link>
              <Link 
                href={`/${locale}/contact`}
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {nav('contact')}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href={`/${locale}/order/cart`}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-50"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium">Cart{isClient && totalItems > 0 ? ` (${totalItems})` : ''}</span>
            </Link>

            {/* User Authentication */}
            {user ? (
              // Authenticated user - show avatar dropdown
              <UserAvatarDropdown 
                user={user} 
                onSignOut={signOut}
                showName={false}  // Hide name in main header for space
                size="sm"         // Smaller size for main header
              />
            ) : (
              // Guest user - show sign in button
              <button
                onClick={handleSignIn}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client'

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProductsDropdown } from './ProductsDropdown';

export function MainHeader() {
  const nav = useTranslations('navigation');
  const params = useParams();
  const locale = params.locale as string;

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

          {/* Mobile menu button - placeholder for future implementation */}
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
    </header>
  );
}

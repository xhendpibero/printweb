'use client'

import { MainHeader } from './MainHeader';
import { MainFooter } from './MainFooter';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FileText, Shield, Scale } from 'lucide-react';

interface LegalLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function LegalLayout({ children, className = '' }: LegalLayoutProps) {
  const params = useParams();
  const pathname = usePathname();
  const t = useTranslations('legal');
  const locale = params.locale as string;

  const legalPages = [
    {
      name: t('navigation.privacy'),
      href: `/${locale}/privacy`,
      icon: Shield,
      current: pathname === `/${locale}/privacy`,
    },
    {
      name: t('navigation.terms'),
      href: `/${locale}/terms`,
      icon: Scale,
      current: pathname === `/${locale}/terms`,
    },
    {
      name: t('navigation.cookies'),
      href: `/${locale}/cookies`,
      icon: FileText,
      current: pathname === `/${locale}/cookies`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            {/* Sidebar */}
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {t('navigation.title')}
                  </h2>
                  <ul className="space-y-2">
                    {legalPages.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              item.current
                                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-500'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <Icon
                              className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${
                                item.current
                                  ? 'text-indigo-500'
                                  : 'text-gray-400 group-hover:text-gray-500'
                              }`}
                            />
                            <span className="truncate">{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    {t('sidebar.contact.title')}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('sidebar.contact.description')}
                  </p>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                  >
                    {t('sidebar.contact.button')}
                  </Link>
                </div>
              </nav>
            </aside>

            {/* Main content */}
            <main className={`lg:col-span-9 ${className}`}>
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-6 sm:px-6 lg:px-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}

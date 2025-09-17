'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function ProductsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');
  const params = useParams();
  const locale = params.locale as string;
  const nav = useTranslations('navigation');

  const tabs = [
    { id: 'categories', label: 'Categories' },
    { id: 'industries', label: 'Industries' },
    { id: 'eco', label: 'Print environmentally' },
    { id: 'new', label: 'New products' }
  ];

  const categories = {
    col1: [
      { name: 'Calendars', href: `/${locale}/search?product=calendars` },
      { name: 'Flyers', href: `/${locale}/search?product=flyers` },
      { name: 'Catalogs', href: `/${locale}/search?product=catalogs` },
      { name: 'Posters', href: `/${locale}/search?product=posters` },
      { name: 'Business Cards', href: `/${locale}/search?product=business-cards` },
      { name: 'Labels and stickers', href: `/${locale}/search?product=labels-stickers` }
    ],
    col2: [
      { name: 'Books', href: `/${locale}/search?product=books` },
      { name: 'Notebooks', href: `/${locale}/search?product=notebooks` },
      { name: 'Copybooks', href: `/${locale}/search?product=copybooks` },
      { name: 'Plano Sheets', href: `/${locale}/search?product=plano-sheets` },
      { name: 'Large format printing', href: `/${locale}/search?product=large-format` },
      { name: 'Promotional gadgets', href: `/${locale}/search?product=promotional-items` }
    ],
    col3: [
      { name: 'Other', href: `/${locale}/search?product=other` }
    ]
  };

  const industries = [
    { name: 'School', href: `/${locale}/search?industry=for-schools` },
    { name: 'Hospitality', href: `/${locale}/search?industry=hospitality` },
    { name: 'Office', href: `/${locale}/search?industry=for-office` },
    { name: 'Fashion', href: `/${locale}/search?industry=for-fashion-brands` }
  ];

  const ecoProducts = [
    { name: 'Custom Business Cards ECO', href: `/${locale}/search?product=business-cards&collection=eco`, eco: true },
    { name: 'Flyers ECO', href: `/${locale}/search?product=flyers&collection=eco`, eco: true },
    { name: 'Folded Flyers ECO', href: `/${locale}/search?product=folded-flyers&collection=eco`, eco: true },
    { name: 'Saddle-Stitched Catalogs ECO', href: `/${locale}/search?product=catalogs&collection=eco`, eco: true },
    { name: 'Perfect Bound Catalogs ECO', href: `/${locale}/search?product=catalogs&collection=eco`, eco: true },
    { name: 'Books ECO', href: `/${locale}/search?product=books&collection=eco`, eco: true },
    { name: 'Custom Posters ECO', href: `/${locale}/search?product=posters&collection=eco`, eco: true },
    { name: 'Perfect Bound Notebooks ECO', href: `/${locale}/search?product=notebooks&collection=eco`, eco: true },
    { name: 'Spiral Bound Notebooks ECO', href: `/${locale}/search?product=notebooks&collection=eco`, eco: true }
  ];

  const newProducts = [
    { name: 'Books', href: `/${locale}/search?product=books&collection=new` },
    { name: 'Books ECO', href: `/${locale}/search?product=books&collection=eco`, eco: true },
    { name: 'Perfect Bound Catalogs ECO', href: `/${locale}/search?product=catalogs&collection=eco`, eco: true },
    { name: 'Labels ECO', href: `/${locale}/search?product=labels-stickers&collection=eco`, eco: true }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'categories':
        return (
          <div className="grid grid-cols-4 gap-8">
            <div className="space-y-3">
              {categories.col1.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              {categories.col2.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              {categories.col3.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Do you have a custom product?</h3>
              <p className="text-sm text-gray-600 mb-3">
                We are here to help, just contact us and ask
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact us
              </Link>
            </div>
          </div>
        );

      case 'industries':
        return (
          <div className="grid grid-cols-4 gap-8">
            <div className="space-y-3">
              {industries.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div></div>
            <div></div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Do you have a custom product?</h3>
              <p className="text-sm text-gray-600 mb-3">
                We are here to help, just contact us and ask
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact us
              </Link>
            </div>
          </div>
        );

      case 'eco':
        return (
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-3">
              <div className="grid grid-cols-3 gap-6">
                {ecoProducts.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.name}</span>
                    {item.eco && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ECO
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Do you have a custom product?</h3>
              <p className="text-sm text-gray-600 mb-3">
                We are here to help, just contact us and ask
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact us
              </Link>
            </div>
          </div>
        );

      case 'new':
        return (
          <div className="grid grid-cols-4 gap-8">
            <div className="space-y-3">
              {newProducts.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.name}</span>
                  {item.eco && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ECO
                    </span>
                  )}
                </Link>
              ))}
            </div>
            <div></div>
            <div></div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Do you have a custom product?</h3>
              <p className="text-sm text-gray-600 mb-3">
                We are here to help, just contact us and ask
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact us
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
      >
        <span>{nav('products')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-xl border border-gray-200 z-20">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6 py-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

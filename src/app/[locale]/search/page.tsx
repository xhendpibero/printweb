import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout';

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    product?: string;
    enhancement?: string;
    paper?: string;
    collection?: string;
    industry?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  const filters = await searchParams;
  
  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Search Products
            </h1>
            <p className="text-gray-600">
              Find the perfect printing solution for your needs
            </p>
          </div>

          {/* Search Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Filters
                </h2>
                
                {/* Active Filters Display */}
                {Object.entries(filters).some(([key, value]) => value && key !== 'page') && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(filters).map(([key, value]) => {
                        if (!value || key === 'page') return null;
                        return (
                          <span
                            key={key}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {key}: {value}
                            <button className="ml-1 text-indigo-600 hover:text-indigo-800">
                              ×
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Placeholder for filter sections */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Product Type</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>• Flyers (234)</div>
                      <div>• Business Cards (567)</div>
                      <div>• Calendars (89)</div>
                      <div>• Books (45)</div>
                      <div>• Posters (123)</div>
                      <div className="text-indigo-600 cursor-pointer">Show more...</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Enhancement</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>• Gold Foiling (45)</div>
                      <div>• Silver Foiling (67)</div>
                      <div>• Spot UV Varnish (23)</div>
                      <div className="text-indigo-600 cursor-pointer">Show more...</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Collection</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>• New (78)</div>
                      <div>• Eco (156)</div>
                      <div>• Bestseller (234)</div>
                      <div>• Off the Shelf (89)</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow">
                {/* Results Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      Showing results for your search
                    </p>
                    <select className="text-sm border border-gray-300 rounded px-3 py-1">
                      <option>Sort by relevance</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>

                {/* Product Grid Placeholder */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 7, name: 'Papier Firmowy', slug: 'papier-firmowy', price: '€10.99', description: 'High-quality letterhead paper' },
                      { id: 8, name: 'Wizytówki Standardowe', slug: 'wizytowki-standardowe', price: '€15.99', description: 'Standard business cards with premium finish' },
                      { id: 9, name: 'Teczka Ofertowa', slug: 'teczka-ofertowa', price: '€20.99', description: 'Professional offer folders' },
                      { id: 10, name: 'Notes Spiralowany', slug: 'notes-spiralowany', price: '€8.99', description: 'Spiral-bound notebooks' },
                      { id: 11, name: 'Etykiety do Aplikacji Ręcznej', slug: 'etykiety-do-aplikacji-recznej', price: '€5.99', description: 'Labels for manual application' },
                      { id: 12, name: 'Koperty', slug: 'koperty', price: '€3.99', description: 'Envelopes for various uses' },
                      { id: 13, name: 'Ulotka Standardowa Składana', slug: 'ulotka-standardowa-skladana', price: '€7.99', description: 'Standard folded leaflets' },
                      { id: 14, name: 'Podkładka na Biurko', slug: 'podkladka-na-biurko', price: '€12.99', description: 'Desk pads for office use' }
                    ].map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                          <img src={`/products/${product.slug}.webp`} alt={product.name} className="object-cover w-full h-full rounded-lg" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-indigo-600">{product.price}</span>
                          <a 
                            href={`/${locale}/products/${product.slug}`}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                          >
                            Configure
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Placeholder */}
                  <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="px-3 py-2 bg-indigo-600 text-white rounded text-sm">
                        1
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        2
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        3
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

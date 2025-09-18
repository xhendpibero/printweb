# Implementation Roadmap
## Search & Filter System - Drukarnia Graften

### 📋 Overview

This document outlines the step-by-step implementation plan for the advanced search and filter system described in `SEARCH-FILTER-SYSTEM.md`.

---

## 🎯 Phase 1: Core Foundation (Week 1-2)

### 1.1 Database Schema Setup
**Priority: Critical**

```sql
-- Create products table with filter support
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name JSONB NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description JSONB,
    product_type VARCHAR(50) NOT NULL,
    available_enhancements TEXT[],
    available_papers TEXT[],
    collections TEXT[],
    target_industries TEXT[],
    base_price DECIMAL(10,2) NOT NULL,
    images TEXT[],
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_products_enhancements ON products USING gin(available_enhancements);
CREATE INDEX idx_products_papers ON products USING gin(available_papers);
CREATE INDEX idx_products_collections ON products USING gin(collections);
CREATE INDEX idx_products_industries ON products USING gin(target_industries);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_price ON products(base_price);

-- Full-text search support
CREATE INDEX idx_products_search ON products USING gin((name || description));
```

**Deliverables:**
- [ ] Database migration files
- [ ] Seed data for testing (50+ sample products)
- [ ] Database connection and query optimization

### 1.2 TypeScript Types & Enums
**Priority: Critical**

```typescript
// /src/types/search.ts
export enum ProductType {
  FLYERS = 'flyers',
  BUSINESS_CARDS = 'business-cards',
  CATALOGS = 'catalogs',
  BOOKS = 'books',
  POSTERS = 'posters',
  CALENDARS = 'calendars',
  LARGE_FORMAT = 'large-format',
  LABELS_STICKERS = 'labels-stickers',
  NOTEPADS = 'notepads',
  PRESENTATION_FOLDERS = 'presentation-folders',
  PLANO_SHEETS = 'plano-sheets',
  ENVELOPES = 'envelopes',
  PROMOTIONAL_ITEMS = 'promotional-items',
  NOTEBOOKS = 'notebooks',
  OTHER = 'other',
  SAMPLES = 'samples',
  PENS = 'pens'
}

export enum Enhancement {
  GOLD_FOILING = 'gold-foiling',
  SILVER_FOILING = 'silver-foiling',
  COLORED_FOILING = 'colored-foiling',
  SPOT_UV_VARNISH = 'spot-uv-varnish',
  UV_3D_VARNISH = '3d-uv-varnish',
  DRIP_OFF_VARNISH = 'drip-off-varnish',
  HIGH_GLOSS_VARNISH = 'high-gloss-varnish',
  MATTE_FOIL = 'matte-foil',
  GLOSSY_FOIL = 'glossy-foil',
  SOFT_SKIN_FOIL = 'soft-skin-foil'
}

// ... other enums and interfaces
```

**Deliverables:**
- [ ] Complete type definitions
- [ ] Validation schemas with Zod
- [ ] Type-safe API contracts

### 1.3 Basic Search API
**Priority: Critical**

```typescript
// /src/app/api/search/route.ts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  try {
    const filters = parseSearchFilters(searchParams);
    const results = await searchProducts(filters);
    
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' }, 
      { status: 500 }
    );
  }
}
```

**Deliverables:**
- [ ] Search API endpoint
- [ ] Query parameter parsing
- [ ] Basic error handling
- [ ] Response caching strategy

---

## 🔧 Phase 2: Search Page Implementation (Week 2-3)

### 2.1 Search Page Component
**Priority: High**

```typescript
// /src/app/[locale]/search/page.tsx
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
  
  // Server-side search for initial load
  const initialResults = await searchProducts(parseFilters(filters));
  
  return (
    <MainLayout>
      <SearchInterface 
        initialResults={initialResults}
        initialFilters={filters}
        locale={locale}
      />
    </MainLayout>
  );
}
```

**Deliverables:**
- [ ] Server-side rendered search page
- [ ] SEO-optimized meta tags
- [ ] Initial search results loading
- [ ] Error boundary implementation

### 2.2 Filter Sidebar Component
**Priority: High**

```typescript
// /src/components/search/FilterSidebar.tsx
interface FilterSidebarProps {
  currentFilters: SearchFilters;
  availableOptions: FilterOptions;
  onFilterChange: (key: keyof SearchFilters, value: string | null) => void;
  resultCount: number;
}

export function FilterSidebar({ 
  currentFilters, 
  availableOptions, 
  onFilterChange, 
  resultCount 
}: FilterSidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-sm rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Filters
        </h2>
        <p className="text-sm text-gray-600">
          {resultCount} products found
        </p>
      </div>
      
      {/* Product Type Filter */}
      <FilterSection
        title="Product Type"
        options={availableOptions.productTypes}
        currentValue={currentFilters.product}
        onChange={(value) => onFilterChange('product', value)}
      />
      
      {/* Enhancement Filter */}
      <FilterSection
        title="Enhancement"
        options={availableOptions.enhancements}
        currentValue={currentFilters.enhancement}
        onChange={(value) => onFilterChange('enhancement', value)}
      />
      
      {/* Continue for other filters... */}
    </aside>
  );
}
```

**Deliverables:**
- [ ] Responsive filter sidebar
- [ ] Single-choice filter sections
- [ ] Active filter indicators
- [ ] Filter count display
- [ ] Clear filter functionality

### 2.3 Product Grid Component
**Priority: High**

```typescript
// /src/components/search/ProductGrid.tsx
interface ProductGridProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductGrid({ 
  products, 
  loading, 
  currentPage, 
  totalPages, 
  onPageChange 
}: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
```

**Deliverables:**
- [ ] Responsive product grid
- [ ] Product card components
- [ ] Loading skeleton states
- [ ] Pagination component
- [ ] Empty state handling

---

## 🎨 Phase 3: User Experience Enhancement (Week 3-4)

### 3.1 Mobile-First Design
**Priority: High**

```typescript
// /src/components/search/MobileFilters.tsx
export function MobileFilters({ 
  isOpen, 
  onClose, 
  currentFilters, 
  availableOptions, 
  onFilterChange 
}: MobileFiltersProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Mobile-optimized filter sections */}
        </div>
        
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button 
            onClick={onClose}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            Show Results ({resultCount})
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
```

**Deliverables:**
- [ ] Mobile filter bottom sheet
- [ ] Touch-friendly filter controls
- [ ] Responsive breakpoints
- [ ] Mobile navigation patterns

### 3.2 URL State Management
**Priority: High**

```typescript
// /src/hooks/useSearchFilters.ts
export function useSearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentFilters = useMemo(() => {
    return parseSearchParams(searchParams);
  }, [searchParams]);
  
  const updateFilter = useCallback((key: keyof SearchFilters, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    
    // Reset to page 1 when filters change
    newParams.delete('page');
    
    router.push(`${pathname}?${newParams.toString()}`);
  }, [router, pathname, searchParams]);
  
  const clearAllFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);
  
  return {
    currentFilters,
    updateFilter,
    clearAllFilters
  };
}
```

**Deliverables:**
- [ ] URL synchronization hooks
- [ ] Browser history support
- [ ] Bookmark-friendly URLs
- [ ] Filter state persistence

---

## 🚀 Phase 4: Performance Optimization (Week 4-5)

### 4.1 Search Performance
**Priority: Medium**

```typescript
// /src/lib/search-optimization.ts
export class SearchOptimizer {
  private cache = new Map<string, SearchResults>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  async searchWithCache(filters: SearchFilters): Promise<SearchResults> {
    const cacheKey = this.generateCacheKey(filters);
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isCacheValid(cached)) {
      return cached;
    }
    
    const results = await this.performSearch(filters);
    this.cache.set(cacheKey, {
      ...results,
      timestamp: Date.now()
    });
    
    return results;
  }
  
  private async performSearch(filters: SearchFilters): Promise<SearchResults> {
    // Optimized database queries
    // Parallel filter option counting
    // Result pagination
  }
}
```

**Deliverables:**
- [ ] Search result caching
- [ ] Database query optimization
- [ ] Parallel filter counting
- [ ] Performance monitoring

### 4.2 Client-Side Optimization
**Priority: Medium**

```typescript
// /src/components/search/SearchInterface.tsx
export function SearchInterface({ initialResults, initialFilters }: SearchInterfaceProps) {
  const [results, setResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  
  // Debounced search to prevent excessive API calls
  const debouncedSearch = useMemo(
    () => debounce(async (filters: SearchFilters) => {
      setLoading(true);
      try {
        const newResults = await searchProducts(filters);
        setResults(newResults);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );
  
  // Use SWR for client-side caching
  const { data, error, isLoading } = useSWR(
    ['search', currentFilters],
    () => searchProducts(currentFilters),
    {
      fallbackData: initialResults,
      revalidateOnFocus: false,
      dedupingInterval: 30000
    }
  );
  
  return (
    <div className="flex gap-8">
      <FilterSidebar />
      <ProductGrid />
    </div>
  );
}
```

**Deliverables:**
- [ ] Debounced search requests
- [ ] SWR caching implementation
- [ ] Loading state optimization
- [ ] Error boundary handling

---

## 📊 Phase 5: Analytics & SEO (Week 5-6)

### 5.1 SEO Implementation
**Priority: High**

```typescript
// /src/app/[locale]/search/page.tsx
export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const filters = parseSearchParams(await searchParams);
  
  const titleParts = [];
  if (filters.product) titleParts.push(formatProductType(filters.product));
  if (filters.enhancement) titleParts.push(formatEnhancement(filters.enhancement));
  if (filters.paper) titleParts.push(formatPaper(filters.paper));
  
  const title = titleParts.length > 0 
    ? `${titleParts.join(' with ')} - Drukarnia Graften`
    : 'Search Products - Drukarnia Graften';
    
  const description = generateSEODescription(filters);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: generateCanonicalURL(filters)
    },
    alternates: {
      canonical: generateCanonicalURL(filters)
    }
  };
}
```

**Deliverables:**
- [ ] Dynamic meta tags
- [ ] Canonical URL generation
- [ ] Structured data markup
- [ ] Sitemap integration

### 5.2 Analytics Integration
**Priority: Medium**

```typescript
// /src/lib/search-analytics.ts
export class SearchAnalytics {
  static trackSearch(filters: SearchFilters, results: SearchResults) {
    // Google Analytics 4
    gtag('event', 'search', {
      search_term: this.formatSearchTerm(filters),
      number_of_results: results.totalCount,
      filters_applied: Object.keys(filters).filter(key => filters[key]).length
    });
    
    // Custom analytics
    analytics.track('Product Search', {
      filters,
      result_count: results.totalCount,
      timestamp: new Date().toISOString()
    });
  }
  
  static trackFilterChange(filterType: string, filterValue: string, resultCount: number) {
    analytics.track('Filter Applied', {
      filter_type: filterType,
      filter_value: filterValue,
      result_count: resultCount
    });
  }
}
```

**Deliverables:**
- [ ] Search event tracking
- [ ] Filter usage analytics
- [ ] Conversion funnel analysis
- [ ] Performance metrics

---

## 🧪 Phase 6: Testing & Quality Assurance (Week 6)

### 6.1 Automated Testing
**Priority: High**

```typescript
// /src/components/search/__tests__/FilterSidebar.test.tsx
describe('FilterSidebar', () => {
  it('should render all filter categories', () => {
    render(
      <FilterSidebar
        currentFilters={{}}
        availableOptions={mockFilterOptions}
        onFilterChange={jest.fn()}
        resultCount={100}
      />
    );
    
    expect(screen.getByText('Product Type')).toBeInTheDocument();
    expect(screen.getByText('Enhancement')).toBeInTheDocument();
    expect(screen.getByText('Paper Substrate')).toBeInTheDocument();
  });
  
  it('should call onFilterChange when filter is selected', () => {
    const mockOnFilterChange = jest.fn();
    
    render(
      <FilterSidebar
        currentFilters={{}}
        availableOptions={mockFilterOptions}
        onFilterChange={mockOnFilterChange}
        resultCount={100}
      />
    );
    
    fireEvent.click(screen.getByText('Business Cards'));
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('product', 'business-cards');
  });
});
```

**Deliverables:**
- [ ] Unit tests for all components
- [ ] Integration tests for search API
- [ ] E2E tests for user journeys
- [ ] Performance benchmarks

### 6.2 User Acceptance Testing
**Priority: High**

**Test Scenarios:**
1. **Basic Search Flow**
   - User visits `/en/search`
   - Selects "Business Cards" from Product Type
   - Adds "Gold Foiling" enhancement
   - Views filtered results

2. **URL Sharing**
   - User applies multiple filters
   - Copies URL and shares with colleague
   - Colleague opens URL and sees same filtered results

3. **Mobile Experience**
   - User opens search on mobile device
   - Taps filter button to open bottom sheet
   - Applies filters and views results
   - Navigates back and forth maintaining state

**Deliverables:**
- [ ] UAT test cases
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility audit

---

## 📈 Success Metrics

### Key Performance Indicators
- **Search Usage**: % of users who use search vs direct navigation
- **Filter Adoption**: Average number of filters used per search
- **Search-to-Purchase Conversion**: % of searches that lead to orders
- **Page Performance**: Search page load time < 2 seconds
- **Mobile Usage**: % of searches performed on mobile devices

### Technical Metrics
- **API Response Time**: < 500ms for search queries
- **Database Query Performance**: < 100ms for complex filters
- **Cache Hit Rate**: > 80% for repeated searches
- **Error Rate**: < 1% for search operations

---

## 🔄 Future Roadmap

### Phase 7: Advanced Features (Month 2)
- [ ] Multi-select filters for certain categories
- [ ] Price range sliders
- [ ] Sorting options (price, popularity, newest)
- [ ] Search suggestions and auto-complete
- [ ] Recently viewed products

### Phase 8: Personalization (Month 3)
- [ ] Saved searches for logged-in users
- [ ] Personalized product recommendations
- [ ] Industry-specific landing pages
- [ ] A/B testing for search interface

### Phase 9: AI Enhancement (Month 4)
- [ ] Natural language search queries
- [ ] Visual similarity search
- [ ] Intelligent filter suggestions
- [ ] Predictive search results

---

This implementation roadmap provides a clear, structured approach to building the advanced search and filter system while maintaining high code quality and user experience standards.

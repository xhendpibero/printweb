# Search & Filter System Documentation
## Drukarnia Graften - Product Search & Category Navigation

### Overview

This document outlines the complete search and filter system for Drukarnia Graften, designed to provide a superior user experience compared to traditional category-based navigation systems like chroma.pl.

---

## 🎯 Core Concept

Instead of traditional hierarchical categories, we implement a **unified search system** where all products are accessible through a single, powerful search interface with multiple filter dimensions.

### URL Structure Comparison

**Traditional Approach (chroma.pl):**
```
https://www.chroma.pl/en/calendars                    ❌ Category-based
https://www.chroma.pl/en/three-month-reference-calendars  ❌ Product-specific
```

**Our Approach (Drukarnia Graften):**
```
https://www.mywebsite.pl/en/search?product=calendars  ✅ Filter-based
https://www.mywebsite.pl/en/search?product=calendars&enhancement=gold-foiling&paper=coated-paper  ✅ Multi-dimensional
```

---

## 🔍 Search System Architecture

### Base URL Structure
```
/[locale]/search
```

### Query Parameters
All filters are applied through URL query parameters, enabling:
- **Bookmarkable searches**
- **Shareable product combinations**
- **SEO-friendly URLs**
- **Browser history support**

---

## 📊 Filter Dimensions

### 1. Product Type (Single Choice)
**Parameter:** `product`

```typescript
enum ProductType {
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
```

**Example URLs:**
```
/en/search?product=flyers
/en/search?product=business-cards
/en/search?product=calendars
```

### 2. Enhancement Options (Single Choice)
**Parameter:** `enhancement`

```typescript
enum Enhancement {
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
```

**Example URLs:**
```
/en/search?product=business-cards&enhancement=gold-foiling
/en/search?product=posters&enhancement=spot-uv-varnish
```

### 3. Paper Substrate (Single Choice)
**Parameter:** `paper`

```typescript
enum PaperSubstrate {
  COATED_PAPER = 'coated-paper',
  ECO_FRIENDLY_PAPER = 'eco-friendly-paper',
  OFFSET_PAPER = 'offset-paper',
  DECORATIVE_PAPER = 'decorative-paper',
  SELF_ADHESIVE_PAPER = 'self-adhesive-paper',
  CARDBOARD = 'cardboard',
  PLASTIC_MATERIAL = 'plastic-material'
}
```

**Example URLs:**
```
/en/search?product=flyers&paper=eco-friendly-paper
/en/search?product=labels-stickers&paper=self-adhesive-paper
```

### 4. Collection (Single Choice)
**Parameter:** `collection`

```typescript
enum Collection {
  NEW = 'new',
  ECO = 'eco',
  BESTSELLER = 'bestseller',
  OFF_THE_SHELF = 'off-the-shelf'
}
```

**Example URLs:**
```
/en/search?collection=new
/en/search?product=business-cards&collection=bestseller
```

### 5. Industry (Single Choice)
**Parameter:** `industry`

```typescript
enum Industry {
  FOR_OFFICE = 'for-office',
  FOR_SCHOOLS = 'for-schools',
  HOSPITALITY = 'hospitality',
  FOR_FASHION_BRANDS = 'for-fashion-brands'
}
```

**Example URLs:**
```
/en/search?industry=hospitality
/en/search?product=presentation-folders&industry=for-office
```

---

## 🛠 Implementation Details

### Frontend Components

#### SearchPage Component
```typescript
// /src/app/[locale]/search/page.tsx
interface SearchPageProps {
  searchParams: {
    product?: ProductType;
    enhancement?: Enhancement;
    paper?: PaperSubstrate;
    collection?: Collection;
    industry?: Industry;
    page?: string;
    sort?: SortOption;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  // Implementation details
}
```

#### Filter Sidebar Component
```typescript
// /src/components/search/FilterSidebar.tsx
interface FilterSidebarProps {
  currentFilters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  availableOptions: FilterOptions;
}

export function FilterSidebar({ currentFilters, onFilterChange, availableOptions }: FilterSidebarProps) {
  // Render filter options with counts
  // Handle single-choice selections
  // Update URL parameters
}
```

#### Product Grid Component
```typescript
// /src/components/search/ProductGrid.tsx
interface ProductGridProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductGrid({ products, loading, currentPage, totalPages, onPageChange }: ProductGridProps) {
  // Render product cards
  // Handle pagination
  // Show loading states
}
```

### Backend API

#### Search Endpoint
```typescript
// /src/app/api/search/route.ts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const filters: SearchFilters = {
    product: searchParams.get('product') as ProductType,
    enhancement: searchParams.get('enhancement') as Enhancement,
    paper: searchParams.get('paper') as PaperSubstrate,
    collection: searchParams.get('collection') as Collection,
    industry: searchParams.get('industry') as Industry,
    page: parseInt(searchParams.get('page') || '1'),
    sort: searchParams.get('sort') as SortOption || 'relevance'
  };
  
  const results = await searchProducts(filters);
  
  return NextResponse.json(results);
}
```

#### Search Service
```typescript
// /src/lib/search-service.ts
interface SearchResults {
  products: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: {
    availableProducts: ProductType[];
    availableEnhancements: Enhancement[];
    availablePapers: PaperSubstrate[];
    availableCollections: Collection[];
    availableIndustries: Industry[];
  };
}

export async function searchProducts(filters: SearchFilters): Promise<SearchResults> {
  // Build database query based on filters
  // Apply pagination
  // Calculate available filter options based on current selection
  // Return structured results
}
```

---

## 🎨 User Experience Design

### Filter Interface Design

#### Filter Categories Layout
```
┌─────────────────────────────────────┐
│ PRODUCT TYPE                        │
├─────────────────────────────────────┤
│ ○ Flyers (234)                     │
│ ● Business Cards (567)              │
│ ○ Catalogs (89)                    │
│ ○ Books (45)                       │
│ ○ Posters (123)                    │
│ ○ Calendars (78)                   │
│ [Show more...]                      │
├─────────────────────────────────────┤
│ ENHANCEMENT                         │
├─────────────────────────────────────┤
│ ○ Gold Foiling (45)                │
│ ○ Silver Foiling (67)              │
│ ○ Spot UV Varnish (23)             │
│ [Show more...]                      │
├─────────────────────────────────────┤
│ PAPER SUBSTRATE                     │
├─────────────────────────────────────┤
│ ○ Coated Paper (345)               │
│ ○ Eco-Friendly Paper (234)         │
│ ○ Offset Paper (456)               │
│ [Show more...]                      │
└─────────────────────────────────────┘
```

#### Active Filters Display
```
Active Filters: [Business Cards ×] [Gold Foiling ×] [Coated Paper ×] [Clear All]
```

### URL Examples

#### Progressive Filter Application
```
1. Start:           /en/search
2. Select Product:  /en/search?product=business-cards
3. Add Enhancement: /en/search?product=business-cards&enhancement=gold-foiling
4. Add Paper:       /en/search?product=business-cards&enhancement=gold-foiling&paper=coated-paper
5. Add Collection:  /en/search?product=business-cards&enhancement=gold-foiling&paper=coated-paper&collection=bestseller
```

#### Direct Access URLs
```
# Popular combinations
/en/search?product=business-cards&enhancement=gold-foiling
/en/search?product=flyers&paper=eco-friendly-paper&collection=eco
/en/search?product=posters&enhancement=spot-uv-varnish&industry=hospitality
/en/search?collection=new
/en/search?industry=for-office
```

---

## 🔧 Technical Implementation

### State Management
```typescript
// /src/stores/search-store.ts
interface SearchState {
  filters: SearchFilters;
  results: SearchResults | null;
  loading: boolean;
  error: string | null;
}

interface SearchActions {
  setFilter: (key: keyof SearchFilters, value: string | null) => void;
  clearFilter: (key: keyof SearchFilters) => void;
  clearAllFilters: () => void;
  search: (filters: SearchFilters) => Promise<void>;
}

export const useSearchStore = create<SearchState & SearchActions>((set, get) => ({
  // Implementation
}));
```

### URL Synchronization
```typescript
// /src/hooks/useSearchParams.ts
export function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback((newParams: Partial<SearchFilters>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  return { searchParams, updateSearchParams };
}
```

### Database Schema
```sql
-- Products table with filter columns
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name JSONB NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    product_type VARCHAR(50) NOT NULL,
    available_enhancements TEXT[],
    available_papers TEXT[],
    collections TEXT[],
    target_industries TEXT[],
    base_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for efficient filtering
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_products_enhancements ON products USING gin(available_enhancements);
CREATE INDEX idx_products_papers ON products USING gin(available_papers);
CREATE INDEX idx_products_collections ON products USING gin(collections);
CREATE INDEX idx_products_industries ON products USING gin(target_industries);
CREATE INDEX idx_products_status ON products(status);
```

---

## 🚀 SEO Optimization

### Meta Tags Generation
```typescript
// /src/app/[locale]/search/page.tsx
export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const filters = parseSearchParams(searchParams);
  
  const title = generateSEOTitle(filters);
  const description = generateSEODescription(filters);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: generateCanonicalURL(filters)
    }
  };
}
```

### Canonical URLs
```typescript
function generateCanonicalURL(filters: SearchFilters): string {
  const params = new URLSearchParams();
  
  // Add filters in consistent order for SEO
  if (filters.product) params.set('product', filters.product);
  if (filters.enhancement) params.set('enhancement', filters.enhancement);
  if (filters.paper) params.set('paper', filters.paper);
  if (filters.collection) params.set('collection', filters.collection);
  if (filters.industry) params.set('industry', filters.industry);
  
  return `/search?${params.toString()}`;
}
```

### Structured Data
```typescript
// Generate JSON-LD for search results
function generateSearchResultsStructuredData(results: SearchResults): object {
  return {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": results.totalCount,
      "itemListElement": results.products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "url": `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
          "image": product.images[0],
          "offers": {
            "@type": "Offer",
            "price": product.basePrice,
            "priceCurrency": "PLN"
          }
        }
      }))
    }
  };
}
```

---

## 📱 Mobile Experience

### Responsive Filter Interface
- **Desktop**: Sidebar filters + main content
- **Tablet**: Collapsible sidebar
- **Mobile**: Bottom sheet filters with floating action button

### Touch Interactions
- **Filter Selection**: Large touch targets
- **Clear Filters**: Easy-to-find clear buttons
- **Results Navigation**: Swipe-friendly pagination

---

## 🔄 Future Enhancements

### Phase 2 Features
1. **Multi-select Filters**: Allow multiple selections in certain categories
2. **Price Range Filters**: Min/max price sliders
3. **Availability Filters**: In stock, custom orders, etc.
4. **Sorting Options**: Price, popularity, newest, rating
5. **Save Searches**: User accounts can save frequent searches
6. **Search Suggestions**: Auto-complete and suggested combinations

### Phase 3 Features
1. **Visual Filters**: Color, size, orientation
2. **Advanced Search**: Text search within products
3. **Comparison Tool**: Side-by-side product comparison
4. **Recommendation Engine**: "Customers also viewed"
5. **Bulk Operations**: Add multiple products to cart

---

## 🧪 Testing Strategy

### Unit Tests
- Filter logic validation
- URL parameter parsing
- Search result processing

### Integration Tests
- API endpoint functionality
- Database query optimization
- Filter combination scenarios

### E2E Tests
- Complete user journeys
- Mobile responsiveness
- Performance benchmarks

---

## 📈 Analytics & Metrics

### Key Performance Indicators
- **Search Conversion Rate**: Searches → Product views → Orders
- **Filter Usage**: Most popular filter combinations
- **Abandonment Points**: Where users leave the search flow
- **Performance Metrics**: Search response times, page load speeds

### Tracking Implementation
```typescript
// Track search interactions
function trackSearchEvent(eventType: string, filters: SearchFilters, results?: SearchResults) {
  analytics.track('Search Event', {
    event_type: eventType,
    filters: filters,
    result_count: results?.totalCount,
    timestamp: new Date().toISOString()
  });
}
```

---

This comprehensive search and filter system provides a superior user experience compared to traditional category-based navigation, enabling users to find exactly what they need through multiple filter dimensions while maintaining SEO optimization and performance.

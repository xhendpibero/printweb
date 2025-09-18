# Product Page System Specification
## Drukarnia Graften - Individual Product Pages

### 📋 Overview

This document specifies the complete product page system for individual products, using the example of "Raised Spot Gloss Flyers" to define all components, interactions, and functionality.

---

## 🌐 URL Structure

### **Example URL**
```
https://www.drukarnia-graften.pl/en/products/raised-spot-gloss-flyers
```

### **URL Pattern**
```
/[locale]/products/[product-slug]
```

### **SEO Considerations**
- Product slug should be SEO-friendly and descriptive
- Include main keywords (product type + key features)
- Support both English and Polish slugs
- Canonical URLs for duplicate content prevention

---

## 🧭 Page Structure

### **1. Breadcrumb Navigation**
```
Drukarnia Graften > Flyers > Raised Spot Gloss Flyers
```

**Implementation:**
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Drukarnia Graften', href: `/${locale}` },
  { label: 'Flyers', href: `/${locale}/search?product=flyers` },
  { label: 'Raised Spot Gloss Flyers', current: true }
];
```

### **2. Page Title**
```html
<h1>Raised Spot Gloss Flyers</h1>
```

---

## 🖼️ Image Gallery Section

### **Slide Images (5 images)**
- **Dimensions**: 200px × 200px each
- **Navigation**: Thumbnail navigation + arrow controls
- **Main display**: Large image viewer with zoom capability

### **Image Info Actions**
Below each slide image:
```typescript
interface ImageAction {
  icon: IconComponent;
  label: string;
  action: () => void;
}

const imageActions = [
  {
    icon: InfoIcon,
    label: 'Find out more',
    action: () => openInfoModal()
  },
  {
    icon: DownloadIcon,
    label: 'How to prepare files',
    action: () => openFilePreparationGuide()
  }
];
```

---

## ⚙️ Configuration Section

### **1. Format Selection**
**Visual Design**: Options displayed as cards with borders and labels

```typescript
interface FormatOption {
  id: string;
  name: string;
  dimensions: string;
  selected?: boolean;
}

const formatOptions: FormatOption[] = [
  { id: 'a3', name: 'A3', dimensions: '297 x 420 mm' },
  { id: 'a4', name: 'A4', dimensions: '210 x 297 mm' },
  { id: 'a5', name: 'A5', dimensions: '148 x 210 mm' },
  { id: 'a6', name: 'A6', dimensions: '105 x 148 mm' },
  { id: 'a7', name: 'A7', dimensions: '74 x 105 mm' },
  { id: 'dl', name: 'DL', dimensions: '99 x 210 mm' },
  { id: 'custom', name: 'Custom', dimensions: '198 x 210 mm' }
];
```

**UI Implementation:**
```jsx
<div className="grid grid-cols-3 md:grid-cols-4 gap-3">
  {formatOptions.map((format) => (
    <button
      key={format.id}
      className={`p-3 border-2 rounded-lg text-center transition-colors ${
        selectedFormat === format.id
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => setSelectedFormat(format.id)}
    >
      <div className="font-medium text-sm">{format.name}</div>
      <div className="text-xs text-gray-500 mt-1">{format.dimensions}</div>
    </button>
  ))}
</div>
```

### **2. Paper Selection**
**Design**: Custom dropdown with hover preview

```typescript
interface PaperOption {
  id: string;
  name: string;
  weights: PaperWeight[];
  description?: string;
  previewImage?: string;
}

interface PaperWeight {
  weight: string;
  thickness?: string;
  recommended?: boolean;
}

const paperOptions: PaperOption[] = [
  {
    id: 'standard-matte',
    name: 'Standard matte',
    weights: [
      { weight: '170g', thickness: '0.19mm' },
      { weight: '250g', thickness: '0.28mm', recommended: true },
      { weight: '300g', thickness: '0.33mm' },
      { weight: '400g', thickness: '0.44mm' }
    ],
    previewImage: '/images/papers/matte-preview.jpg'
  }
];
```

### **3. Colors Selection**
**Design**: Radio buttons without dots, text with border

```typescript
interface ColorOption {
  id: string;
  name: string;
  description: string;
  sides: string;
}

const colorOptions: ColorOption[] = [
  {
    id: 'color-both',
    name: 'color - both sides',
    description: '4/4',
    sides: 'both'
  },
  {
    id: 'color-one',
    name: 'color - one side',
    description: '4/0',
    sides: 'one'
  }
];
```

---

## 🎨 Surface Finishings Section

### **1. Surface Finishings Options**
**Badge Selection**: Front | Both Sides

```typescript
interface FinishingOption {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sides: ('front' | 'both')[];
  selectedSide?: 'front' | 'both';
}

const surfaceFinishings: FinishingOption[] = [
  {
    id: 'soft-skin-foil',
    name: 'Soft Skin foil',
    imageUrl: '/images/finishings/soft-skin-foil.jpg',
    sides: ['front', 'both']
  }
];
```

### **2. Spot Varnish Options**
```typescript
const spotVarnishOptions = [
  {
    id: 'spot-3d-uv',
    name: 'Spot 3D UV',
    imageUrl: '/images/finishings/spot-3d-uv.jpg',
    sides: ['front', 'both']
  }
];
```

### **3. Decorative Foil Options**
```typescript
const decorativeFoilOptions = [
  {
    id: 'gold-foiling',
    name: 'Gold foiling',
    imageUrl: '/images/finishings/gold-foiling.jpg',
    sides: ['front']
  },
  {
    id: 'silver-foiling',
    name: 'Silver foiling',
    imageUrl: '/images/finishings/silver-foiling.jpg',
    sides: ['front']
  }
];
```

---

## 📁 Project Preparation Section

### **Project Upload Options**
```typescript
interface ProjectPreparationOption {
  id: string;
  name: string;
  description: string;
  available: boolean;
  features?: string[];
}

const preparationOptions: ProjectPreparationOption[] = [
  {
    id: 'upload-ready-file',
    name: 'I will upload ready file',
    description: 'Upload your print-ready files',
    available: true
  },
  {
    id: 'chroma-upload-3d',
    name: 'Chroma Upload 3D',
    description: 'See how your project will look',
    available: true,
    features: ['3D Preview', 'Real-time visualization']
  }
];
```

---

## 📦 Shipping & Print Run Section

### **Quantity Tiers with Pricing**
```typescript
interface QuantityTier {
  quantity: number;
  priceNet: number;
  pricePerCopy: number;
  deliveryDate: string;
  orderDeadline: string;
  shipping: ShippingInfo;
}

interface ShippingInfo {
  region: string;
  cost: number;
  details?: string;
}

const quantityTiers: QuantityTier[] = [
  {
    quantity: 50,
    priceNet: 49.54,
    pricePerCopy: 0.99,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85, details: 'Standard delivery' }
  },
  {
    quantity: 100,
    priceNet: 57.16,
    pricePerCopy: 0.57,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  // ... continue for all tiers
];
```

### **Quantity Input & Controls**
```typescript
interface QuantityControlProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  tiers: QuantityTier[];
}

// Range: 50 to 20,000 copies
// Snap to predefined tiers or allow custom quantities
```

### **Export Options**
```typescript
interface ExportOption {
  format: 'CSV' | 'JSON';
  filename: string;
  data: any;
}

const exportOptions = [
  { format: 'CSV', filename: 'pricing-tiers.csv' },
  { format: 'JSON', filename: 'configuration.json' }
];
```

---

## 🛒 Order Summary & Cart

### **Configuration Summary**
```typescript
interface OrderSummary {
  productName: string;
  quantity: number;
  configuration: {
    format: string;
    paper: string;
    colors: string;
    finishings: string[];
    projectPreparation: string;
  };
  pricing: {
    printingCost: number;
    deliveryCost: number;
    netPrice: number;
    currency: 'PLN' | 'EUR';
  };
  delivery: {
    estimatedDate: string;
    orderDeadline: string;
  };
}
```

### **Add to Cart Functionality**
```typescript
interface AddToCartProps {
  productId: string;
  configuration: ProductConfiguration;
  quantity: number;
  pricing: PricingDetails;
}

const handleAddToCart = (orderData: AddToCartProps) => {
  // Validate configuration completeness
  // Calculate final pricing
  // Add to cart store
  // Show success feedback
  // Optional: Navigate to cart
};
```

### **Configuration Sharing**
```typescript
const handleCopyConfigurationLink = () => {
  const configUrl = generateConfigurationURL(currentConfiguration);
  navigator.clipboard.writeText(configUrl);
  showSuccessMessage('Configuration link copied to clipboard');
};

function generateConfigurationURL(config: ProductConfiguration): string {
  const params = new URLSearchParams({
    format: config.format,
    paper: config.paper,
    colors: config.colors,
    quantity: config.quantity.toString(),
    // ... other config options
  });
  
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}
```

---

## 📑 Product Information Tabs

### **Tab 1: About the Product**
**Content Management**: WordPress-like editor with custom components

```typescript
interface ContentBlock {
  id: string;
  type: 'hero' | 'text' | 'list' | 'image-text' | 'gallery';
  data: any;
}

interface HeroBlock {
  type: 'hero';
  data: {
    imageUrl: string;
    title: string;
    subtitle?: string;
    overlay?: boolean;
  };
}

interface TextBlock {
  type: 'text';
  data: {
    content: string; // Rich HTML content
    alignment?: 'left' | 'center' | 'right';
  };
}

interface ImageTextBlock {
  type: 'image-text';
  data: {
    imageUrl: string;
    imagePosition: 'left' | 'right';
    title: string;
    content: string;
  };
}
```

### **Tab 2: Specifications and Mock-ups**

#### **Left Side: File Specifications**
```typescript
interface FileSpecification {
  title: string;
  downloadUrl?: string;
  mockupUrl?: string;
  instructions: string;
  fileFormats: FileFormat[];
  keyDetails: SpecificationDetail[];
}

interface FileFormat {
  extension: string;
  description: string;
  recommended?: boolean;
}

interface SpecificationDetail {
  label: string;
  value: string;
  description?: string;
}

const fileSpecification: FileSpecification = {
  title: 'Specification of files (to print)',
  downloadUrl: '/downloads/specifications/flyers-spec.pdf',
  mockupUrl: '/downloads/mockups/flyers-mockup.zip',
  instructions: 'Choose the appropriate file variant, prepare your project according to the specifications',
  fileFormats: [
    { extension: 'pdf', description: 'Print-ready PDF', recommended: true }
  ],
  keyDetails: [
    { label: 'Resolution', value: '300 dpi', description: 'Minimum required resolution' },
    { label: 'Colors', value: 'color - both sides (4/4) CMYK', description: 'Full color printing' },
    { label: 'Gross format', value: '77 × 108 mm', description: 'Format with bleed added' },
    { label: 'Net format', value: '74 × 105 mm', description: 'The design\'s final size' },
    { label: 'Bleed', value: '1.5 mm', description: 'Required bleed area' }
  ]
};
```

#### **Right Side: PDF Preview**
```typescript
interface PDFPreviewProps {
  pdfUrl: string;
  title: string;
  downloadable?: boolean;
}

// Embedded PDF viewer with download capability
<div className="bg-gray-100 rounded-lg p-4 h-96">
  <iframe
    src={`/api/pdf-viewer?url=${encodeURIComponent(pdfUrl)}`}
    className="w-full h-full border-0"
    title="Print specification preview"
  />
  <div className="mt-2 text-center">
    <button className="text-indigo-600 hover:text-indigo-700 text-sm">
      Download PDF
    </button>
  </div>
</div>
```

---

## 💰 Dynamic Pricing System

### **Real-time Price Calculation**
```typescript
interface PricingCalculator {
  basePrice: number;
  quantity: number;
  configuration: ProductConfiguration;
  
  calculatePricing(): PricingResult;
}

interface PricingResult {
  printingCost: number;
  deliveryCost: number;
  netPrice: number;
  pricePerCopy: number;
  currency: 'PLN' | 'EUR';
  deliveryDate: string;
  orderDeadline: string;
}

class FlyrsPricingCalculator implements PricingCalculator {
  calculatePricing(): PricingResult {
    // Apply quantity discounts
    // Add enhancement costs
    // Calculate paper upgrades
    // Apply finishing costs
    // Calculate delivery costs
    // Return final pricing
  }
}
```

### **Quantity Tier Display**
```typescript
interface QuantityTierProps {
  tiers: QuantityTier[];
  selectedQuantity: number;
  onQuantitySelect: (quantity: number) => void;
}

// Table format with expandable rows
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr>
        <th>Amount</th>
        <th>Price net</th>
        <th>Per copy</th>
        <th>Delivery</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {tiers.map((tier) => (
        <QuantityTierRow 
          key={tier.quantity}
          tier={tier}
          selected={selectedQuantity === tier.quantity}
          onSelect={() => onQuantitySelect(tier.quantity)}
        />
      ))}
    </tbody>
  </table>
</div>
```

---

## 🔧 Component Architecture

### **Main Product Page Component**
```typescript
// /src/app/[locale]/products/[slug]/page.tsx
interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { locale, slug } = await params;
  const config = await searchParams;
  
  // Fetch product data
  const product = await getProductBySlug(slug, locale);
  
  // Parse configuration from URL
  const initialConfiguration = parseConfigurationFromURL(config);
  
  return (
    <MainLayout>
      <ProductPageContent 
        product={product}
        initialConfiguration={initialConfiguration}
        locale={locale}
      />
    </MainLayout>
  );
}
```

### **Required Components**

#### **1. ProductImageGallery**
```typescript
interface ProductImageGalleryProps {
  images: ProductImage[];
  selectedIndex: number;
  onImageSelect: (index: number) => void;
}

interface ProductImage {
  url: string;
  alt: string;
  thumbnail: string;
}
```

#### **2. ProductConfigurator**
```typescript
interface ProductConfiguratorProps {
  product: Product;
  configuration: ProductConfiguration;
  onConfigurationChange: (config: ProductConfiguration) => void;
  pricing: PricingResult;
}
```

#### **3. FormatSelector**
```typescript
interface FormatSelectorProps {
  options: FormatOption[];
  selected?: string;
  onSelect: (formatId: string) => void;
}
```

#### **4. PaperSelector**
```typescript
interface PaperSelectorProps {
  options: PaperOption[];
  selected?: string;
  onSelect: (paperId: string, weight?: string) => void;
}
```

#### **5. SurfaceFinishingSelector**
```typescript
interface SurfaceFinishingSelectorProps {
  categories: FinishingCategory[];
  selected: SelectedFinishings;
  onSelect: (categoryId: string, optionId: string, side: 'front' | 'both') => void;
}
```

#### **6. QuantityPricingTable**
```typescript
interface QuantityPricingTableProps {
  tiers: QuantityTier[];
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  configuration: ProductConfiguration;
}
```

#### **7. OrderSummaryCard**
```typescript
interface OrderSummaryCardProps {
  summary: OrderSummary;
  onAddToCart: () => void;
  onCopyLink: () => void;
  loading?: boolean;
}
```

#### **8. ProductTabs**
```typescript
interface ProductTabsProps {
  tabs: ProductTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

interface ProductTab {
  id: string;
  label: string;
  content: React.ReactNode;
}
```

#### **9. FileSpecificationPanel**
```typescript
interface FileSpecificationPanelProps {
  specification: FileSpecification;
  configuration: ProductConfiguration;
}
```

#### **10. PDFPreviewPanel**
```typescript
interface PDFPreviewPanelProps {
  pdfUrl: string;
  title: string;
  downloadable?: boolean;
}
```

---

## 📊 Data Flow

### **Configuration State Management**
```typescript
// /src/stores/product-configurator-store.ts
interface ProductConfiguratorState {
  product: Product | null;
  configuration: ProductConfiguration;
  pricing: PricingResult | null;
  loading: boolean;
  error: string | null;
}

interface ProductConfiguratorActions {
  setProduct: (product: Product) => void;
  updateConfiguration: (updates: Partial<ProductConfiguration>) => void;
  calculatePricing: () => Promise<void>;
  addToCart: () => Promise<void>;
  copyConfigurationLink: () => void;
}
```

### **API Integration**
```typescript
// /src/lib/api/products.ts
export async function getProductBySlug(slug: string, locale: string): Promise<Product> {
  const response = await fetch(`/api/products/${slug}?locale=${locale}`);
  return response.json();
}

export async function calculateProductPricing(
  productId: string, 
  configuration: ProductConfiguration
): Promise<PricingResult> {
  const response = await fetch('/api/pricing/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, configuration })
  });
  return response.json();
}
```

---

## 🎨 Sample Book Integration

### **Sample Book CTA Sections**
```typescript
interface SampleBookCTAProps {
  type: 'paper' | 'embellishments';
  title: string;
  description: string;
}

// Paper sample book
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
  <p className="text-sm text-blue-800 mb-3">
    Not sure which paper to choose? Order our sample book.
  </p>
  <div className="flex space-x-3">
    <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
      Add to cart
    </button>
    <a href="/samples/paper" className="text-blue-600 hover:text-blue-700 text-sm underline">
      Learn more
    </a>
  </div>
</div>

// Embellishments sample book
<div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
  <p className="text-sm text-purple-800 mb-3">
    Not sure which embellishments to choose? Order our sample book.
  </p>
  <div className="flex space-x-3">
    <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
      Add to cart
    </button>
    <a href="/samples/finishings" className="text-purple-600 hover:text-purple-700 text-sm underline">
      Learn more
    </a>
  </div>
</div>
```

---

This specification covers all the detailed requirements for the product page system, providing a complete blueprint for implementation.

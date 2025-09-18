# UI Components Specification
## Product Page - Detailed Component Requirements

### 🎨 Visual Design Requirements

#### **1. Product Image Gallery**
```typescript
// Component: ProductImageGallery
interface ProductImageGalleryProps {
  images: ProductImage[];
  selectedIndex: number;
  onImageSelect: (index: number) => void;
}

// Visual Requirements:
// - Main image: 400px × 400px display area
// - Thumbnails: 200px × 200px each (5 total)
// - Zoom functionality on main image
// - Smooth transitions between images
// - Image loading states
```

**Layout:**
```
┌─────────────────────────┐  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│                         │  │ T1  │ │ T2  │ │ T3  │ │ T4  │ │ T5  │
│     Main Image          │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
│     400 × 400           │  
│                         │  ┌─────────────┐ ┌─────────────────┐
└─────────────────────────┘  │ (i) Find    │ │ (↓) How to      │
                             │ out more    │ │ prepare files   │
                             └─────────────┘ └─────────────────┘
```

#### **2. Format Selection Cards**
```typescript
// Component: FormatSelector
// Visual: Image-based cards with border selection

interface FormatCardProps {
  format: FormatOption;
  selected: boolean;
  onSelect: () => void;
}

// Card Design:
// ┌─────────────────┐
// │     [Icon]      │
// │       A4        │
// │  210 x 297 mm   │
// └─────────────────┘
// Selected: Blue border + blue background
// Hover: Gray border
```

#### **3. Paper Selection Dropdown**
```typescript
// Component: PaperSelector
// Custom dropdown with hover preview

interface PaperDropdownProps {
  options: PaperOption[];
  selected?: string;
  onSelect: (paperId: string, weight: string) => void;
}

// Dropdown Design:
// ┌─────────────────────────────┐
// │ Standard matte          ▼   │
// └─────────────────────────────┘
//   ┌─────────────────────────────┐
//   │ ○ matte 170g                │
//   │ ● matte 250g (recommended)  │
//   │ ○ matte 300g                │
//   │ ○ matte 400g                │
//   └─────────────────────────────┘
```

#### **4. Color Selection (Radio without dots)**
```typescript
// Component: ColorSelector
// Radio buttons styled as bordered text

interface ColorSelectorProps {
  options: ColorOption[];
  selected?: string;
  onSelect: (colorId: string) => void;
}

// Design:
// ┌─────────────────────┐  ┌─────────────────────┐
// │ color - both sides  │  │ color - one side    │
// │      (4/4)          │  │       (4/0)         │
// └─────────────────────┘  └─────────────────────┘
// Selected: Blue border + blue background
```

#### **5. Surface Finishings with Badge Selection**
```typescript
// Component: SurfaceFinishingSelector
// Cards with side selection badges

interface FinishingCardProps {
  finishing: FinishingOption;
  selectedSide?: 'front' | 'both';
  onSelect: (side: 'front' | 'both') => void;
}

// Card Design:
// ┌─────────────────────────────┐
// │  ┌─────────┐ ┌─────────────┐ │
// │  │ front   │ │ both sides  │ │  <- Badge selection
// │  └─────────┘ └─────────────┘ │
// │                             │
// │     [Finishing Image]       │
// │                             │
// │      Soft Skin foil         │
// └─────────────────────────────┘
```

#### **6. Quantity Pricing Table**
```typescript
// Component: QuantityPricingTable
// Interactive table with quantity selection

interface PricingTableRowProps {
  tier: QuantityTier;
  selected: boolean;
  onSelect: () => void;
}

// Table Design:
// ┌────────┬──────────┬──────────┬─────────────┬────────┐
// │ Amount │ Price    │ Per copy │ Shipping    │ Action │
// ├────────┼──────────┼──────────┼─────────────┼────────┤
// │ 50     │ €49.54   │ €0.99    │ Thu (09/18) │ [Add]  │
// │ 100    │ €57.16   │ €0.57    │ Thu (09/18) │ [Add]  │
// │ 250    │ €59.15   │ €0.24    │ Thu (09/18) │ [Add]  │
// └────────┴──────────┴──────────┴─────────────┴────────┘
// Selected row: Blue background
```

#### **7. Order Summary Card**
```typescript
// Component: OrderSummaryCard
// Sticky card with configuration details

interface OrderSummaryProps {
  productName: string;
  quantity: number;
  configuration: ProductConfiguration;
  pricing: PricingResult;
  onAddToCart: () => void;
  onCopyLink: () => void;
}

// Card Design:
// ┌─────────────────────────────────┐
// │ Raised Spot Gloss Flyers        │
// │ 1,000 quantity                  │
// │ ┌─────────────────────────────┐ │
// │ │ Add order name              │ │
// │ └─────────────────────────────┘ │
// │                                 │
// │ Configuration details           │
// │ • Format: A7 (74 × 105 mm)     │
// │ • Paper: matte 250g             │
// │ • Colors: both sides (4/4)      │
// │                                 │
// │ Printing cost (net): €71.79     │
// │ Delivery cost (net): €4.85      │
// │ ─────────────────────────────   │
// │ Net price: €76.64               │
// │                                 │
// │ ┌─────────────────────────────┐ │
// │ │        Add to cart          │ │
// │ └─────────────────────────────┘ │
// │                                 │
// │ Copy the link to this config    │
// └─────────────────────────────────┘
```

---

## 📱 Mobile Responsive Design

### **Mobile Layout Adaptations**

#### **Image Gallery (Mobile)**
```
┌─────────────────────────────────┐
│         Main Image              │
│         300 × 300               │
└─────────────────────────────────┘
┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
│T1 │ │T2 │ │T3 │ │T4 │ │T5 │  <- Horizontal scroll
└───┘ └───┘ └───┘ └───┘ └───┘
```

#### **Configuration (Mobile)**
- Accordion-style sections
- Full-width format cards (2 per row)
- Bottom sheet for paper selection
- Sticky order summary at bottom

#### **Pricing Table (Mobile)**
- Horizontal scroll
- Simplified columns
- Tap to select quantity

---

## 🔄 Interactive Behaviors

### **1. Configuration Changes**
```typescript
// Real-time updates when any option changes
const handleConfigurationChange = async (updates: Partial<ProductConfiguration>) => {
  // Update configuration state
  setConfiguration(prev => ({ ...prev, ...updates }));
  
  // Trigger price recalculation
  setLoading(true);
  try {
    const newPricing = await calculatePricing(productId, newConfiguration);
    setPricing(newPricing);
  } catch (error) {
    setError('Failed to calculate pricing');
  } finally {
    setLoading(false);
  }
  
  // Update URL with new configuration
  updateURL(newConfiguration);
};
```

### **2. Add to Cart Flow**
```typescript
const handleAddToCart = async () => {
  // Validate configuration completeness
  const validation = validateConfiguration(configuration);
  if (!validation.valid) {
    showValidationErrors(validation.errors);
    return;
  }
  
  // Add to cart store
  const cartItem = createCartItem(product, configuration, quantity, pricing);
  addToCart(cartItem);
  
  // Show success feedback
  showSuccessMessage('Product added to cart');
  
  // Optional: Navigate to cart or show cart preview
};
```

### **3. URL Configuration Sharing**
```typescript
const handleCopyConfigurationLink = () => {
  const configURL = generateConfigurationURL(configuration);
  
  navigator.clipboard.writeText(configURL).then(() => {
    showSuccessMessage('Configuration link copied to clipboard');
  }).catch(() => {
    // Fallback for older browsers
    fallbackCopyToClipboard(configURL);
  });
};
```

---

## 🧪 Sample Book Integration

### **Sample Book CTA Components**
```typescript
// Component: SampleBookCTA
interface SampleBookCTAProps {
  type: 'paper' | 'finishings';
  title: string;
  description: string;
  ctaText: string;
  learnMoreUrl: string;
}

// Paper Sample Book CTA
<SampleBookCTA
  type="paper"
  title="Not sure which paper to choose?"
  description="Order our sample book to feel the quality of different paper types."
  ctaText="Add to cart"
  learnMoreUrl="/samples/paper-guide"
/>

// Finishings Sample Book CTA  
<SampleBookCTA
  type="finishings"
  title="Not sure which embellishments to choose?"
  description="Order our sample book to see all finishing options."
  ctaText="Add to cart"
  learnMoreUrl="/samples/finishings-guide"
/>
```

---

## 📊 Content Management System Integration

### **Product Content Structure**
```typescript
interface ProductContent {
  aboutProduct: ContentBlock[];
  specifications: FileSpecification;
  mockups: MockupFile[];
  sampleFiles: SampleFile[];
}

interface ContentBlock {
  id: string;
  type: 'hero' | 'text' | 'list' | 'image-text' | 'gallery';
  data: any;
  order: number;
}

// WordPress-like editor components
interface HeroBlock {
  type: 'hero';
  data: {
    backgroundImage: string;
    title: string;
    subtitle?: string;
    overlayOpacity: number;
    textAlignment: 'left' | 'center' | 'right';
  };
}

interface TextBlock {
  type: 'text';
  data: {
    content: string; // Rich HTML
    fontSize: 'sm' | 'base' | 'lg' | 'xl';
    alignment: 'left' | 'center' | 'right';
  };
}

interface ListBlock {
  type: 'list';
  data: {
    title?: string;
    items: string[];
    listStyle: 'bullet' | 'numbered' | 'checkmark';
  };
}

interface ImageTextBlock {
  type: 'image-text';
  data: {
    imageUrl: string;
    imagePosition: 'left' | 'right';
    imageSize: 'small' | 'medium' | 'large';
    title: string;
    content: string;
  };
}
```

---

This specification provides complete UI/UX requirements for all product page components with detailed visual layouts and interactive behaviors.

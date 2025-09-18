# Product Configurator Logic
## Dynamic Pricing & Configuration System

### 🧮 Pricing Engine Architecture

#### **Base Pricing Model**
```typescript
interface PricingEngine {
  calculatePrice(
    product: Product,
    configuration: ProductConfiguration,
    quantity: number
  ): Promise<PricingResult>;
}

interface PricingResult {
  basePrice: number;
  enhancementCosts: number;
  paperUpgradeCost: number;
  finishingCosts: number;
  quantityDiscount: number;
  subtotal: number;
  deliveryCost: number;
  netPrice: number;
  pricePerCopy: number;
  currency: 'PLN' | 'EUR';
  deliveryDate: string;
  orderDeadline: string;
}
```

#### **Quantity Tier Calculations**
```typescript
interface QuantityTier {
  minQuantity: number;
  maxQuantity: number;
  basePrice: number;
  setupCost: number;
  discountPercentage: number;
}

// Example: Flyers pricing tiers
const flyersPricingTiers: QuantityTier[] = [
  { minQuantity: 50, maxQuantity: 99, basePrice: 1.20, setupCost: 25.00, discountPercentage: 0 },
  { minQuantity: 100, maxQuantity: 249, basePrice: 1.00, setupCost: 25.00, discountPercentage: 5 },
  { minQuantity: 250, maxQuantity: 499, basePrice: 0.80, setupCost: 25.00, discountPercentage: 10 },
  { minQuantity: 500, maxQuantity: 999, basePrice: 0.60, setupCost: 25.00, discountPercentage: 15 },
  { minQuantity: 1000, maxQuantity: 1999, basePrice: 0.45, setupCost: 25.00, discountPercentage: 20 },
  { minQuantity: 2000, maxQuantity: 4999, basePrice: 0.35, setupCost: 25.00, discountPercentage: 25 },
  { minQuantity: 5000, maxQuantity: 9999, basePrice: 0.30, setupCost: 25.00, discountPercentage: 30 },
  { minQuantity: 10000, maxQuantity: 20000, basePrice: 0.25, setupCost: 25.00, discountPercentage: 35 }
];
```

---

## 🎛️ Configuration Dependencies

### **Format → Paper Compatibility**
```typescript
interface FormatPaperCompatibility {
  formatId: string;
  compatiblePapers: string[];
  recommendedPaper?: string;
}

// Some papers may not be available for certain formats
const formatPaperMatrix: FormatPaperCompatibility[] = [
  {
    formatId: 'a7',
    compatiblePapers: ['matte-170g', 'matte-250g', 'matte-300g'],
    recommendedPaper: 'matte-250g'
  },
  {
    formatId: 'a3',
    compatiblePapers: ['matte-170g', 'matte-250g', 'matte-300g', 'matte-400g'],
    recommendedPaper: 'matte-300g'
  }
];
```

### **Paper → Finishing Compatibility**
```typescript
interface PaperFinishingCompatibility {
  paperId: string;
  compatibleFinishings: string[];
  restrictedFinishings: string[];
  recommendations?: FinishingRecommendation[];
}

interface FinishingRecommendation {
  finishingId: string;
  reason: string;
  alternative?: string;
}

// Some finishings may not work with certain papers
const paperFinishingMatrix: PaperFinishingCompatibility[] = [
  {
    paperId: 'matte-170g',
    compatibleFinishings: ['soft-skin-foil', 'spot-uv'],
    restrictedFinishings: ['3d-uv'], // Too thin for 3D UV
    recommendations: [
      {
        finishingId: '3d-uv',
        reason: 'Paper too thin for 3D UV effect',
        alternative: 'spot-uv'
      }
    ]
  }
];
```

### **Quantity → Delivery Time**
```typescript
interface DeliveryTimeCalculator {
  calculateDeliveryDate(
    quantity: number,
    configuration: ProductConfiguration,
    orderTime: Date
  ): DeliveryEstimate;
}

interface DeliveryEstimate {
  productionDays: number;
  shippingDays: number;
  deliveryDate: string;
  orderDeadline: string;
  expressAvailable: boolean;
  expressDeliveryDate?: string;
}

// Production time based on quantity and complexity
const productionTimeMatrix = {
  simple: { // No finishings
    '1-100': 1,
    '101-500': 2,
    '501-1000': 3,
    '1001-5000': 4,
    '5001+': 5
  },
  complex: { // With finishings
    '1-100': 2,
    '101-500': 3,
    '501-1000': 4,
    '1001-5000': 5,
    '5001+': 7
  }
};
```

---

## 🔄 Real-time Configuration Updates

### **Configuration State Management**
```typescript
// /src/stores/product-configurator-store.ts
interface ConfiguratorState {
  product: Product | null;
  configuration: ProductConfiguration;
  pricing: PricingResult | null;
  availableOptions: AvailableOptions;
  loading: boolean;
  errors: ConfigurationError[];
}

interface ConfiguratorActions {
  setProduct: (product: Product) => void;
  updateFormat: (formatId: string) => Promise<void>;
  updatePaper: (paperId: string, weight: string) => Promise<void>;
  updateColors: (colorId: string) => Promise<void>;
  updateFinishing: (finishingId: string, side: 'front' | 'both') => Promise<void>;
  updateQuantity: (quantity: number) => Promise<void>;
  validateConfiguration: () => ConfigurationValidation;
  calculatePricing: () => Promise<void>;
  addToCart: () => Promise<void>;
}

export const useProductConfigurator = create<ConfiguratorState & ConfiguratorActions>((set, get) => ({
  // Implementation with real-time updates
  updateFormat: async (formatId: string) => {
    set(state => ({
      configuration: { ...state.configuration, format: formatId }
    }));
    
    // Update available options based on format
    const availableOptions = await getAvailableOptions(formatId);
    set({ availableOptions });
    
    // Recalculate pricing
    await get().calculatePricing();
  },
  
  calculatePricing: async () => {
    set({ loading: true });
    try {
      const pricing = await calculateProductPricing(
        get().product!.id,
        get().configuration
      );
      set({ pricing, loading: false });
    } catch (error) {
      set({ loading: false, errors: [{ type: 'pricing', message: 'Failed to calculate price' }] });
    }
  }
}));
```

### **Option Availability Logic**
```typescript
// /src/lib/configurator-logic.ts
export class ConfiguratorLogic {
  static getAvailablePapers(formatId: string): PaperOption[] {
    const compatibility = formatPaperMatrix.find(m => m.formatId === formatId);
    return allPapers.filter(paper => 
      compatibility?.compatiblePapers.includes(paper.id)
    );
  }
  
  static getAvailableFinishings(
    formatId: string, 
    paperId: string
  ): FinishingOption[] {
    const paperCompatibility = paperFinishingMatrix.find(m => m.paperId === paperId);
    return allFinishings.filter(finishing => 
      !paperCompatibility?.restrictedFinishings.includes(finishing.id)
    );
  }
  
  static validateConfiguration(config: ProductConfiguration): ConfigurationValidation {
    const errors: ConfigurationError[] = [];
    
    // Check format-paper compatibility
    if (!this.isFormatPaperCompatible(config.format, config.paper)) {
      errors.push({
        type: 'compatibility',
        field: 'paper',
        message: 'Selected paper is not available for this format'
      });
    }
    
    // Check paper-finishing compatibility
    config.finishings.forEach(finishing => {
      if (!this.isPaperFinishingCompatible(config.paper, finishing.id)) {
        errors.push({
          type: 'compatibility',
          field: 'finishings',
          message: `${finishing.name} is not compatible with selected paper`
        });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
```

---

## 📊 Pricing Calculation Logic

### **Multi-factor Pricing Algorithm**
```typescript
export class PricingCalculator {
  static async calculatePrice(
    product: Product,
    configuration: ProductConfiguration,
    quantity: number
  ): Promise<PricingResult> {
    
    // 1. Base price calculation
    const basePrice = this.calculateBasePrice(product, configuration.format, quantity);
    
    // 2. Paper upgrade costs
    const paperCost = this.calculatePaperCost(configuration.paper, quantity);
    
    // 3. Color printing costs
    const colorCost = this.calculateColorCost(configuration.colors, quantity);
    
    // 4. Surface finishing costs
    const finishingCost = this.calculateFinishingCost(configuration.finishings, quantity);
    
    // 5. Quantity discounts
    const discount = this.calculateQuantityDiscount(quantity, basePrice);
    
    // 6. Delivery costs
    const deliveryCost = this.calculateDeliveryCost(quantity, configuration);
    
    // 7. Delivery time estimation
    const deliveryEstimate = this.calculateDeliveryTime(quantity, configuration);
    
    const subtotal = basePrice + paperCost + colorCost + finishingCost - discount;
    const netPrice = subtotal + deliveryCost;
    
    return {
      basePrice,
      enhancementCosts: paperCost + colorCost,
      finishingCosts: finishingCost,
      quantityDiscount: discount,
      subtotal,
      deliveryCost,
      netPrice,
      pricePerCopy: netPrice / quantity,
      currency: 'EUR', // Based on user preference
      deliveryDate: deliveryEstimate.deliveryDate,
      orderDeadline: deliveryEstimate.orderDeadline
    };
  }
  
  private static calculateBasePrice(
    product: Product, 
    format: string, 
    quantity: number
  ): number {
    const tier = this.getQuantityTier(quantity);
    const formatMultiplier = this.getFormatMultiplier(format);
    
    return tier.basePrice * formatMultiplier * quantity + tier.setupCost;
  }
  
  private static calculateFinishingCost(
    finishings: SelectedFinishing[],
    quantity: number
  ): number {
    return finishings.reduce((total, finishing) => {
      const finishingData = getFinishingById(finishing.id);
      const sideCost = finishing.side === 'both' ? finishingData.costPerSide * 2 : finishingData.costPerSide;
      return total + (sideCost * quantity);
    }, 0);
  }
}
```

---

## 🔗 URL Configuration System

### **Configuration URL Generation**
```typescript
export function generateConfigurationURL(
  productSlug: string,
  configuration: ProductConfiguration,
  locale: string
): string {
  const baseUrl = `/${locale}/products/${productSlug}`;
  const params = new URLSearchParams();
  
  // Add configuration parameters
  if (configuration.format) params.set('format', configuration.format);
  if (configuration.paper) params.set('paper', configuration.paper);
  if (configuration.colors) params.set('colors', configuration.colors);
  if (configuration.quantity) params.set('quantity', configuration.quantity.toString());
  
  // Add finishings as comma-separated values
  if (configuration.finishings.length > 0) {
    const finishingsParam = configuration.finishings
      .map(f => `${f.id}:${f.side}`)
      .join(',');
    params.set('finishings', finishingsParam);
  }
  
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}
```

### **Configuration URL Parsing**
```typescript
export function parseConfigurationFromURL(
  searchParams: URLSearchParams
): Partial<ProductConfiguration> {
  const configuration: Partial<ProductConfiguration> = {};
  
  if (searchParams.has('format')) {
    configuration.format = searchParams.get('format')!;
  }
  
  if (searchParams.has('paper')) {
    configuration.paper = searchParams.get('paper')!;
  }
  
  if (searchParams.has('colors')) {
    configuration.colors = searchParams.get('colors')!;
  }
  
  if (searchParams.has('quantity')) {
    configuration.quantity = parseInt(searchParams.get('quantity')!);
  }
  
  if (searchParams.has('finishings')) {
    const finishingsParam = searchParams.get('finishings')!;
    configuration.finishings = finishingsParam
      .split(',')
      .map(f => {
        const [id, side] = f.split(':');
        return { id, side: side as 'front' | 'both' };
      });
  }
  
  return configuration;
}
```

---

## 🎯 Configuration Validation

### **Validation Rules Engine**
```typescript
interface ValidationRule {
  id: string;
  name: string;
  validate: (config: ProductConfiguration) => ValidationResult;
  errorMessage: string;
  severity: 'error' | 'warning' | 'info';
}

interface ValidationResult {
  valid: boolean;
  message?: string;
  suggestedFix?: ConfigurationUpdate;
}

const validationRules: ValidationRule[] = [
  {
    id: 'format-paper-compatibility',
    name: 'Format Paper Compatibility',
    validate: (config) => {
      const compatible = ConfiguratorLogic.isFormatPaperCompatible(
        config.format, 
        config.paper
      );
      return {
        valid: compatible,
        message: compatible ? undefined : 'Selected paper is not available for this format',
        suggestedFix: compatible ? undefined : {
          field: 'paper',
          value: ConfiguratorLogic.getRecommendedPaper(config.format)
        }
      };
    },
    errorMessage: 'Paper not compatible with selected format',
    severity: 'error'
  },
  
  {
    id: 'minimum-quantity',
    name: 'Minimum Quantity',
    validate: (config) => ({
      valid: config.quantity >= 50,
      message: config.quantity < 50 ? 'Minimum order quantity is 50 copies' : undefined,
      suggestedFix: config.quantity < 50 ? { field: 'quantity', value: 50 } : undefined
    }),
    errorMessage: 'Quantity below minimum',
    severity: 'error'
  },
  
  {
    id: 'finishing-paper-compatibility',
    name: 'Finishing Paper Compatibility',
    validate: (config) => {
      const incompatibleFinishings = config.finishings.filter(finishing =>
        !ConfiguratorLogic.isPaperFinishingCompatible(config.paper, finishing.id)
      );
      
      return {
        valid: incompatibleFinishings.length === 0,
        message: incompatibleFinishings.length > 0 
          ? `${incompatibleFinishings.map(f => f.name).join(', ')} not compatible with selected paper`
          : undefined
      };
    },
    errorMessage: 'Some finishings are not compatible with selected paper',
    severity: 'warning'
  }
];
```

---

## 📅 Delivery Time Calculation

### **Lead Time Engine**
```typescript
interface DeliveryTimeCalculator {
  calculateDeliveryTime(
    quantity: number,
    configuration: ProductConfiguration,
    orderTime: Date
  ): DeliveryEstimate;
}

export class DeliveryTimeCalculator {
  static calculateDeliveryTime(
    quantity: number,
    configuration: ProductConfiguration,
    orderTime: Date = new Date()
  ): DeliveryEstimate {
    
    // 1. Calculate production time
    const productionDays = this.calculateProductionTime(quantity, configuration);
    
    // 2. Check order deadline
    const orderDeadline = this.getOrderDeadline(orderTime);
    const canStartToday = orderTime <= orderDeadline;
    
    // 3. Calculate delivery date
    const startDate = canStartToday ? orderTime : this.getNextBusinessDay(orderTime);
    const productionEndDate = this.addBusinessDays(startDate, productionDays);
    const deliveryDate = this.addBusinessDays(productionEndDate, 1); // 1 day shipping
    
    return {
      productionDays,
      shippingDays: 1,
      deliveryDate: this.formatDeliveryDate(deliveryDate),
      orderDeadline: this.formatOrderDeadline(orderDeadline),
      expressAvailable: quantity <= 1000,
      expressDeliveryDate: quantity <= 1000 
        ? this.formatDeliveryDate(this.addBusinessDays(startDate, 1))
        : undefined
    };
  }
  
  private static calculateProductionTime(
    quantity: number,
    configuration: ProductConfiguration
  ): number {
    let baseDays = 1;
    
    // Quantity-based production time
    if (quantity > 5000) baseDays = 3;
    else if (quantity > 1000) baseDays = 2;
    else baseDays = 1;
    
    // Finishing complexity
    const hasComplexFinishing = configuration.finishings.some(f => 
      ['3d-uv', 'gold-foiling', 'silver-foiling'].includes(f.id)
    );
    
    if (hasComplexFinishing) baseDays += 1;
    
    // Both-sides finishing adds time
    const hasBothSidesFinishing = configuration.finishings.some(f => f.side === 'both');
    if (hasBothSidesFinishing) baseDays += 1;
    
    return Math.max(baseDays, 1); // Minimum 1 day
  }
  
  private static getOrderDeadline(orderTime: Date): Date {
    const deadline = new Date(orderTime);
    deadline.setHours(18, 0, 0, 0); // 18:00 deadline
    
    // If it's weekend, move to Monday
    if (deadline.getDay() === 0 || deadline.getDay() === 6) {
      deadline.setDate(deadline.getDate() + (8 - deadline.getDay()));
    }
    
    return deadline;
  }
}
```

---

## 🛒 Add to Cart Logic

### **Cart Item Generation**
```typescript
interface CartItemGenerator {
  createCartItem(
    product: Product,
    configuration: ProductConfiguration,
    quantity: number,
    pricing: PricingResult
  ): CartItem;
}

export function createCartItem(
  product: Product,
  configuration: ProductConfiguration,
  quantity: number,
  pricing: PricingResult
): CartItem {
  // Generate configuration fingerprint for cart deduplication
  const configFingerprint = generateConfigFingerprint(configuration);
  
  return {
    itemId: `${product.slug}-${configFingerprint}`,
    slug: product.slug,
    quantity,
    configuration: {
      format: configuration.format,
      paper: configuration.paper,
      colors: configuration.colors,
      finishings: configuration.finishings.map(f => `${f.id}:${f.side}`)
    },
    priceVersion: pricing.priceVersion || 1,
    configFingerprint,
    thumbnail: product.images[0]?.thumbnail,
    pricing: {
      unitPrice: pricing.pricePerCopy,
      totalPrice: pricing.netPrice,
      currency: pricing.currency
    },
    delivery: {
      estimatedDate: pricing.deliveryDate,
      orderDeadline: pricing.orderDeadline
    }
  };
}

function generateConfigFingerprint(config: ProductConfiguration): string {
  const configString = JSON.stringify({
    format: config.format,
    paper: config.paper,
    colors: config.colors,
    finishings: config.finishings.sort((a, b) => a.id.localeCompare(b.id))
  });
  
  // Simple hash function for fingerprint
  return btoa(configString).substring(0, 12);
}
```

---

## 📋 Configuration Persistence

### **URL State Synchronization**
```typescript
// /src/hooks/useConfigurationURL.ts
export function useConfigurationURL(productSlug: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const updateConfigurationURL = useCallback((config: ProductConfiguration) => {
    const newURL = generateConfigurationURL(productSlug, config, locale);
    
    // Update URL without page reload
    router.replace(newURL, { scroll: false });
  }, [router, productSlug, locale]);
  
  const getConfigurationFromURL = useCallback((): Partial<ProductConfiguration> => {
    return parseConfigurationFromURL(searchParams);
  }, [searchParams]);
  
  return {
    updateConfigurationURL,
    getConfigurationFromURL
  };
}
```

### **Configuration Sharing**
```typescript
export function useConfigurationSharing(
  productSlug: string,
  configuration: ProductConfiguration
) {
  const copyConfigurationLink = useCallback(async () => {
    const configURL = generateConfigurationURL(productSlug, configuration, locale);
    const fullURL = `${window.location.origin}${configURL}`;
    
    try {
      await navigator.clipboard.writeText(fullURL);
      toast.success('Configuration link copied to clipboard');
    } catch (error) {
      // Fallback for older browsers
      fallbackCopyToClipboard(fullURL);
    }
  }, [productSlug, configuration]);
  
  const shareConfiguration = useCallback(async () => {
    const configURL = generateConfigurationURL(productSlug, configuration, locale);
    const shareData = {
      title: `${product.name} Configuration`,
      text: 'Check out this product configuration',
      url: configURL
    };
    
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await copyConfigurationLink();
    }
  }, [productSlug, configuration, copyConfigurationLink]);
  
  return {
    copyConfigurationLink,
    shareConfiguration
  };
}
```

---

This document provides the complete logic system for product configurators with real-time pricing, validation, and state management.

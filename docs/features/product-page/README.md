# Product Page Feature Documentation
## Individual Product Configuration & Ordering System

### 📋 Overview

This folder contains comprehensive documentation for the individual product page system, covering everything from UI components to pricing logic and configuration management.

---

## 📚 Documentation Files

### [🏗️ Product Page System](./PRODUCT-PAGE-SYSTEM.md)
Complete system specification covering:
- URL structure and routing
- Page layout and components
- Configuration options and dependencies
- Pricing calculation system
- Content management integration

### [🎨 UI Components Specification](./UI-COMPONENTS-SPEC.md)
Detailed UI/UX requirements including:
- Visual design specifications
- Component layouts and interactions
- Mobile responsive design
- Content block system for CMS integration

### [⚙️ Configurator Logic](./CONFIGURATOR-LOGIC.md)
Technical implementation details for:
- Dynamic pricing calculations
- Configuration validation rules
- Real-time option updates
- Cart integration logic
- URL state management

### [✅ Implementation Checklist](./IMPLEMENTATION-CHECKLIST.md)
Complete implementation checklist organized by phases:
- Phase 1: Core page structure
- Phase 2: Configuration components
- Phase 3: Surface finishings
- Phase 4: Project preparation
- Phase 5: Shipping & pricing
- Phase 6: Order summary & cart
- Phase 7: Product information tabs
- Phase 8: Advanced features
- Phase 9: Mobile optimization
- Phase 10: Testing & quality

---

## 🎯 Example Product: Raised Spot Gloss Flyers

### **URL Structure**
```
https://www.drukarnia-graften.pl/en/products/raised-spot-gloss-flyers
```

### **Configuration URL Example**
```
/en/products/raised-spot-gloss-flyers?format=a7&paper=matte-250g&colors=both-sides&finishings=spot-3d-uv:front&quantity=1000
```

### **Breadcrumb Navigation**
```
Drukarnia Graften > Flyers > Raised Spot Gloss Flyers
```

---

## 🔧 Key Components

### **Configuration Section**
1. **Format Selection**: Visual cards (A3, A4, A5, A6, A7, DL, Custom)
2. **Paper Selection**: Custom dropdown with weight options
3. **Color Selection**: Radio buttons without dots (4/4, 4/0)
4. **Surface Finishings**: Cards with front/both sides badges
5. **Project Preparation**: Upload options with 3D preview

### **Pricing Section**
1. **Quantity Input**: Range 50-20,000 with tier suggestions
2. **Pricing Table**: 10 quantity tiers with delivery dates
3. **Export Options**: CSV and JSON download
4. **Order Summary**: Sticky card with configuration details

### **Information Tabs**
1. **About Product**: CMS-managed content with rich blocks
2. **Specifications**: File requirements + PDF preview

---

## 📊 Configuration Options

### **Format Options (7 total)**
```typescript
A3 - 297 x 420 mm
A4 - 210 x 297 mm  
A5 - 148 x 210 mm
A6 - 105 x 148 mm
A7 - 74 x 105 mm
DL - 99 x 210 mm
Custom - 198 x 210 mm
```

### **Paper Options**
```typescript
Standard matte:
  - matte 170g
  - matte 250g (recommended)
  - matte 300g  
  - matte 400g
```

### **Color Options**
```typescript
- color - both sides (4/4)
- color - one side (4/0)
```

### **Surface Finishings**
```typescript
Surface finishings: [front | both sides]
  - (blank)
  - Soft Skin foil

Spot varnish: [front | both sides]  
  - (blank)
  - Spot 3D UV

Decorative foil: [front only]
  - Gold foiling
  - Silver foiling
```

### **Project Preparation**
```typescript
- I will upload ready file
- Chroma Upload 3D — see how your project will look
```

---

## 💰 Pricing Structure

### **Quantity Tiers with Delivery**
```
50 copy    → €49.54 (€0.99/copy)  → Thursday (09/18) → Order today until 18:00
100 copy   → €57.16 (€0.57/copy)  → Thursday (09/18) → Order today until 18:00  
250 copy   → €59.15 (€0.24/copy)  → Thursday (09/18) → Order today until 18:00
500 copy   → €63.17 (€0.13/copy)  → Thursday (09/18) → Order today until 18:00
1,000 copy → €71.79 (€0.072/copy) → Thursday (09/18) → Order today until 18:00
2,000 copy → €95.09 (€0.048/copy) → Thursday (09/18) → Order today until 18:00
2,500 copy → €106.75 (€0.043/copy) → Thursday (09/18) → Order today until 18:00
5,000 copy → €163.71 (€0.033/copy) → Friday (09/19) → Order today until 18:00
10,000 copy → €294.82 (€0.029/copy) → Friday (09/19) → Order today until 18:00
20,000 copy → €552.53 (€0.028/copy) → Friday (09/19) → Order today until 18:00
```

### **Order Summary Example**
```
Raised Spot Gloss Flyers
1,000 quantity
[Add order name input field]

Configuration details:
• Format: A7 (74 × 105 mm)
• Paper: matte 250g
• Colors: both sides (4/4)
• Finishing: Spot 3D UV (front)

Printing cost (net): €71.79
Delivery cost (net): €4.85
─────────────────────────
Net price: €76.64

[Add to cart button]
Copy the link to this configuration
```

---

## 📑 Content Management

### **About Product Tab**
WordPress-like editor with custom components:
- **Hero blocks**: Image with text overlay
- **Text blocks**: Rich text with custom formatting
- **List blocks**: Bullet points and numbered lists  
- **Image-text blocks**: Two-column layouts
- **Gallery blocks**: Multiple image displays

### **Specifications Tab**
```
Left Side:                    Right Side:
┌─────────────────────────┐  ┌─────────────────────────┐
│ Specification of files  │  │                         │
│ (to print)              │  │    PDF Preview          │
│                         │  │    [Embedded Viewer]    │
│ Download sample mockups │  │                         │
│                         │  │    [Download Button]    │
│ Choose appropriate      │  │                         │
│ file variant           │  │                         │
│                         │  │                         │
│ Key details:            │  │                         │
│ • Resolution: 300 dpi   │  │                         │
│ • Colors: 4/4 CMYK      │  │                         │
│ • Gross: 77 × 108 mm    │  │                         │
│ • Net: 74 × 105 mm      │  │                         │
│ • Bleed: 1.5 mm         │  │                         │
└─────────────────────────┘  └─────────────────────────┘
```

---

## 🚀 Implementation Priority

### **High Priority (Week 1)**
1. ✅ Product page routing and basic layout
2. ✅ Image gallery with thumbnails
3. ✅ Format selection cards
4. ✅ Basic pricing display
5. ✅ Order summary card

### **Medium Priority (Week 2)**  
1. ✅ Paper selection dropdown
2. ✅ Color selection radio buttons
3. ✅ Surface finishing cards with badges
4. ✅ Quantity pricing table
5. ✅ Add to cart functionality

### **Low Priority (Week 3)**
1. ✅ Project preparation options
2. ✅ Sample book CTAs
3. ✅ Product information tabs
4. ✅ PDF preview integration
5. ✅ Mobile optimization

---

This documentation provides a complete blueprint for implementing the sophisticated product page system with all the detailed requirements specified.

# Technical Architecture - Project A
## Online Printing House Platform

### System Overview

The platform follows a modern headless architecture with clear separation of concerns, enabling scalability, maintainability, and optimal performance.

---

## 1. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Next.js)     │  Mobile Web      │  Admin Panel       │
│  - Product Catalog     │  - Responsive    │  - CMS Interface   │
│  - Configurators       │  - Touch UI      │  - Order Mgmt      │
│  - Shopping Cart       │  - Offline       │  - Analytics       │
│  - User Account        │  - PWA Features  │  - Reports         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes    │  GraphQL Layer   │  REST API          │
│  - Authentication     │  - Data Fetching │  - Third-party     │
│  - Rate Limiting      │  - Caching       │  - Webhooks        │
│  - Request Validation │  - Optimization  │  - Integrations    │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BUSINESS LOGIC LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  Order Service        │  Payment Service │  Shipping Service   │
│  - Order Processing   │  - Stripe API    │  - Carrier API      │
│  - Status Tracking    │  - Webhooks      │  - Label Gen        │
│  - Notifications      │  - Refunds       │  - Tracking         │
│                       │                  │                     │
│  Product Service      │  Config Service  │  Production Service │
│  - Catalog Mgmt       │  - Price Calc    │  - File Generation  │
│  - Inventory          │  - Validation    │  - Hot Folder       │
│  - Categories         │  - Rules Engine  │  - Metadata         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL           │  Redis Cache     │  File Storage       │
│  - Transactional     │  - Sessions      │  - AWS S3           │
│  - Product Data      │  - Cart Data     │  - Images           │
│  - Order History     │  - Price Cache   │  - Print Files      │
│  - User Accounts     │  - Config Cache  │  - Documents        │
│                      │                  │                     │
│  Strapi CMS          │  Background Jobs │  Monitoring         │
│  - Content Mgmt      │  - Bull Queue    │  - Sentry           │
│  - Media Library     │  - Email Jobs    │  - LogRocket        │
│  - Translations      │  - File Proc     │  - Analytics        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack Details

### 2.1 Frontend Technologies

#### Core Framework
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "typescript": "^5.0.0"
}
```

**Justification**: Next.js 14 provides excellent performance with App Router, Server Components, and built-in optimization features.

#### UI & Styling
```json
{
  "tailwindcss": "^3.3.0",
  "@headlessui/react": "^1.7.0",
  "framer-motion": "^10.16.0",
  "react-hook-form": "^7.45.0",
  "@hookform/resolvers": "^3.3.0",
  "zod": "^3.22.0"
}
```

**Features**:
- Utility-first CSS with custom design system
- Accessible UI components
- Smooth animations and micro-interactions
- Type-safe form validation

#### State Management
```json
{
  "zustand": "^4.4.0",
  "@tanstack/react-query": "^4.32.0",
  "swr": "^2.2.0"
}
```

**Architecture**:
- Zustand for client-side state (cart, UI state)
- React Query for server state management
- SWR for real-time data synchronization

### 2.2 Backend Technologies

#### Core Framework
```json
{
  "@nestjs/core": "^10.0.0",
  "@nestjs/common": "^10.0.0",
  "@nestjs/typeorm": "^10.0.0",
  "typeorm": "^0.3.17"
}
```

**Benefits**:
- Enterprise-grade architecture
- Built-in dependency injection
- Extensive ecosystem
- TypeScript-first approach

#### Database & Caching
```json
{
  "pg": "^8.11.0",
  "typeorm": "^0.3.17",
  "redis": "^4.6.0",
  "ioredis": "^5.3.0"
}
```

**Configuration**:
- PostgreSQL with connection pooling
- Redis for session storage and caching
- Database migrations and seeding
- Automated backups

#### Integrations
```json
{
  "stripe": "^13.0.0",
  "nodemailer": "^6.9.0",
  "bull": "^4.11.0",
  "sharp": "^0.32.0"
}
```

### 2.3 Content Management

#### Strapi CMS
```json
{
  "@strapi/strapi": "^4.12.0",
  "@strapi/plugin-i18n": "^4.12.0",
  "@strapi/plugin-users-permissions": "^4.12.0"
}
```

**Custom Plugins**:
- Product configurator management
- Pricing rules engine
- Translation workflow
- Media optimization

---

## 3. Database Schema Design

### 3.1 Core Entities

#### Products & Categories
```sql
-- Categories with hierarchical structure
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name JSONB NOT NULL, -- Multi-language support
    slug VARCHAR(255) UNIQUE NOT NULL,
    parent_id UUID REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Products with configurable options
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name JSONB NOT NULL,
    description JSONB,
    category_id UUID REFERENCES categories(id),
    base_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    configurator_id UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Configurator System
```sql
-- Configurator definitions
CREATE TABLE configurators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    fields JSONB NOT NULL, -- Field definitions
    pricing_rules JSONB NOT NULL, -- Pricing logic
    validation_rules JSONB NOT NULL, -- Validation logic
    created_at TIMESTAMP DEFAULT NOW()
);

-- User configurations (cart items)
CREATE TABLE configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    user_id UUID,
    session_id VARCHAR(255),
    configuration JSONB NOT NULL, -- User selections
    calculated_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Order Management
```sql
-- Orders with comprehensive tracking
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID,
    status VARCHAR(50) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PLN',
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    stripe_payment_intent_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items with configurations
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    configuration JSONB NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    production_files JSONB, -- Generated files info
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 3.2 Performance Optimizations

#### Indexing Strategy
```sql
-- Performance indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Full-text search indexes
CREATE INDEX idx_products_search ON products USING gin((name || description));
CREATE INDEX idx_categories_search ON categories USING gin(name);
```

#### Partitioning
```sql
-- Partition orders by month for better performance
CREATE TABLE orders_y2024m01 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

---

## 4. API Design

### 4.1 RESTful Endpoints

#### Product Catalog
```typescript
// Product endpoints
GET    /api/products              // List products with filters
GET    /api/products/:id          // Get product details
GET    /api/categories            // Get category tree
GET    /api/categories/:id        // Get category with products

// Configurator endpoints
GET    /api/configurators/:id     // Get configurator definition
POST   /api/configurations        // Save configuration
PUT    /api/configurations/:id    // Update configuration
POST   /api/configurations/price  // Calculate price
```

#### Order Management
```typescript
// Cart operations
GET    /api/cart                  // Get cart contents
POST   /api/cart/items            // Add item to cart
PUT    /api/cart/items/:id        // Update cart item
DELETE /api/cart/items/:id        // Remove cart item

// Checkout process
POST   /api/checkout/validate     // Validate cart
POST   /api/checkout/payment      // Process payment
GET    /api/orders/:id            // Get order details
GET    /api/orders                // List user orders
```

### 4.2 GraphQL Schema

#### Product Queries
```graphql
type Product {
  id: ID!
  name: String!
  description: String
  category: Category!
  basePrice: Float!
  configurator: Configurator
  images: [Image!]!
}

type Configurator {
  id: ID!
  fields: [ConfiguratorField!]!
  pricingRules: [PricingRule!]!
}

type Query {
  products(
    categoryId: ID
    search: String
    limit: Int
    offset: Int
  ): ProductConnection!
  
  product(id: ID!): Product
  categories: [Category!]!
}
```

#### Mutation Examples
```graphql
type Mutation {
  addToCart(
    productId: ID!
    configuration: ConfigurationInput!
    quantity: Int!
  ): CartItem!
  
  createOrder(
    items: [OrderItemInput!]!
    shippingAddress: AddressInput!
    paymentMethod: PaymentMethodInput!
  ): Order!
}
```

---

## 5. Security Implementation

### 5.1 Authentication & Authorization

#### JWT Implementation
```typescript
interface JWTPayload {
  sub: string // user ID
  email: string
  role: UserRole
  permissions: Permission[]
  iat: number
  exp: number
}

// Token refresh strategy
interface TokenPair {
  accessToken: string  // 15 minutes
  refreshToken: string // 7 days
}
```

#### Role-Based Access Control
```typescript
enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  EDITOR = 'editor',
  PRODUCTION = 'production'
}

interface Permission {
  resource: string
  action: 'read' | 'write' | 'delete'
  conditions?: Record<string, any>
}
```

### 5.2 Data Protection

#### Input Validation
```typescript
// Zod schemas for validation
const ProductConfigurationSchema = z.object({
  productId: z.string().uuid(),
  options: z.record(z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.array(z.string())
  ])),
  quantity: z.number().int().min(1).max(10000)
})

// Express middleware
const validateInput = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' })
    }
  }
}
```

#### SQL Injection Prevention
```typescript
// Using TypeORM query builder
const products = await productRepository
  .createQueryBuilder('product')
  .where('product.categoryId = :categoryId', { categoryId })
  .andWhere('product.name ILIKE :search', { search: `%${search}%` })
  .getMany()
```

---

## 6. Performance Optimization

### 6.1 Frontend Performance

#### Code Splitting Strategy
```typescript
// Route-based splitting
const ProductPage = dynamic(() => import('../components/ProductPage'))
const ConfiguratorPage = dynamic(() => import('../components/ConfiguratorPage'))

// Component-based splitting
const HeavyComponent = dynamic(
  () => import('../components/HeavyComponent'),
  { loading: () => <Skeleton /> }
)
```

#### Image Optimization
```typescript
// Next.js Image component with optimization
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={300}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 6.2 Backend Performance

#### Caching Strategy
```typescript
// Redis caching implementation
class CacheService {
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key)
    return cached ? JSON.parse(cached) : null
  }
  
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value))
  }
  
  // Cache invalidation patterns
  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern)
    if (keys.length > 0) {
      await this.redis.del(...keys)
    }
  }
}
```

#### Database Optimization
```typescript
// Connection pooling
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  poolSize: 20,
  extra: {
    connectionLimit: 20,
    acquireTimeout: 60000,
    timeout: 60000
  }
})
```

---

## 7. Monitoring & Observability

### 7.1 Application Monitoring

#### Error Tracking
```typescript
// Sentry configuration
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event, hint) {
    // Filter sensitive data
    if (event.request?.data) {
      delete event.request.data.password
      delete event.request.data.creditCard
    }
    return event
  }
})
```

#### Performance Monitoring
```typescript
// Custom metrics collection
class MetricsService {
  async recordConfiguratorUsage(productId: string, duration: number) {
    await this.metrics.increment('configurator.usage', {
      productId,
      duration: duration.toString()
    })
  }
  
  async recordOrderConversion(source: string, amount: number) {
    await this.metrics.increment('order.conversion', {
      source,
      amount: amount.toString()
    })
  }
}
```

### 7.2 Infrastructure Monitoring

#### Health Checks
```typescript
// Health check endpoints
@Controller('health')
export class HealthController {
  @Get()
  async check(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkExternalAPIs()
    ])
    
    return {
      status: checks.every(c => c.status === 'fulfilled') ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      services: this.formatChecks(checks)
    }
  }
}
```

---

## 8. Deployment Architecture

### 8.1 Container Strategy

#### Docker Configuration
```dockerfile
# Multi-stage build for Next.js
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### 8.2 CI/CD Pipeline

#### GitHub Actions Workflow
```yaml
name: Deploy Production
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          docker build -t printing-platform .
          docker push ${{ secrets.REGISTRY_URL }}/printing-platform:latest
          kubectl set image deployment/app app=${{ secrets.REGISTRY_URL }}/printing-platform:latest
```

---

This technical architecture provides a solid foundation for building a scalable, secure, and performant online printing platform that can handle complex product configurations, real-time pricing, and automated production workflows.

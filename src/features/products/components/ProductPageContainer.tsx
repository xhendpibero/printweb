'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import type { Product } from '@/shared/types'
import { useCartStore } from '@/stores/cart-store'
import { addToast } from '@/components/ui/Toast'
import { useProductConfiguration } from '../hooks'
import { createAddToCartData } from '../utils'
import { MainLayout } from '@/components/layout'
import { ProductImageGallery } from '@/components/product/ProductImageGallery'
import { Breadcrumb } from '@/components/product/Breadcrumb'
import { SampleBookCTA } from '@/components/product/SampleBookCTA'
import { QuantityPricingTable } from '@/components/product/QuantityPricingTable'
import { OrderSummaryCard } from '@/components/product/OrderSummaryCard'
import { ProductTabs } from '@/components/product/ProductTabs'
import { FileSpecificationPanel } from '@/components/product/FileSpecificationPanel'
import { PDFPreviewPanel } from '@/components/product/PDFPreviewPanel'
import { ProductConfigurator } from './ProductConfigurator'

// Mock product data - in real app would come from CMS/API
const mockProducts: Record<string, Product> = {
  'raised-spot-gloss-flyers': {
    id: '1',
    name: 'Raised Spot Gloss Flyers',
    description: 'High-quality flyers with raised spot gloss finishing for premium presentation.',
    slug: 'raised-spot-gloss-flyers',
    basePrice: 49.54,
    category: {
      id: '1',
      name: 'Flyers',
      slug: 'flyers',
      sortOrder: 1
    },
    images: [
      '/images/products/flyers-1.jpg',
      '/images/products/flyers-2.jpg',
      '/images/products/flyers-3.jpg',
      '/images/products/flyers-4.jpg',
      '/images/products/flyers-5.jpg'
    ],
    status: 'active'
  },
  'business-cards': {
    id: '2',
    name: 'Business Cards',
    description: 'Professional business cards with various finishing options.',
    slug: 'business-cards',
    basePrice: 29.99,
    category: {
      id: '2',
      name: 'Business Cards',
      slug: 'business-cards',
      sortOrder: 2
    },
    images: [
      '/images/products/business-cards-1.webp',
      '/images/products/business-cards-2.webp',
      '/images/products/business-cards-3.webp'
    ],
    status: 'active'
  }
}

export function ProductPageContainer() {
  const params = useParams()
  const slug = params.slug as string
  const locale = params.locale as string
  
  const product = mockProducts[slug] || mockProducts['raised-spot-gloss-flyers']
  const addItem = useCartStore((s) => s.addItem)
  const [loading, setLoading] = useState(false)

  const {
    configuration,
    updateConfiguration,
    validation,
    summary
  } = useProductConfiguration(product?.name || '')

  if (!product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
            <p className="text-gray-600 mt-2">The product you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  const handleAddToCart = async () => {
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        addToast({ type: 'error', title: 'Configuration Error', message: error })
      })
      return
    }

    setLoading(true)
    try {
      const cartItemData = createAddToCartData(
        slug,
        configuration,
        product.images[0]
      )

      addItem({
        slug: cartItemData.slug,
        quantity: cartItemData.quantity,
        configuration: {
          format: cartItemData.configuration.format,
          paper: cartItemData.configuration.paper,
          colors: cartItemData.configuration.colors,
          finishings: cartItemData.configuration.finishings
        },
        priceVersion: cartItemData.priceVersion,
        configFingerprint: cartItemData.configFingerprint,
        thumbnail: cartItemData.thumbnail
      })

      addToast({ 
        type: 'success', 
        title: 'Added to cart', 
        message: `${product.name} has been added to your cart` 
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast({ 
        type: 'error', 
        title: 'Failed to add to cart', 
        message: 'Please try again' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: `/${locale}` },
            { label: product.category.name, href: `/${locale}/search?product=${product.category.slug}` },
            { label: product.name, current: true }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Product Images */}
          <div>
            <ProductImageGallery images={product.images} />
            
            <div className="mt-6">
              <SampleBookCTA 
                type="paper"
                title="Free Sample Book"
                description="Get a free sample book to see our paper quality and finishes"
                ctaText="Request samples"
                learnMoreText="Learn more"
                learnMoreUrl="/samples"
              />
            </div>
          </div>

          {/* Right Column - Product Configuration */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <ProductConfigurator
              configuration={configuration}
              onConfigurationChange={updateConfiguration}
              product={product}
            />
          </div>
        </div>

        {/* Bottom Section - Quantity, Pricing, and Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <QuantityPricingTable
              onQuantitySelect={(selectedQuantity) => {
                updateConfiguration({ quantity: selectedQuantity })
              }}
            />
          </div>
          
          <div>
            <OrderSummaryCard
              summary={summary}
              onAddToCart={handleAddToCart}
              onCopyLink={() => {
                navigator.clipboard.writeText(window.location.href)
                addToast({ 
                  type: 'success', 
                  title: 'Link copied', 
                  message: 'Configuration link copied to clipboard' 
                })
              }}
              loading={loading}
            />
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-12">
          <ProductTabs
            tabs={[
              {
                id: 'description',
                label: 'Description',
                content: (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                    <p className="text-gray-700">
                      {product.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Specifications</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Category: {product.category.name}</li>
                        <li>Starting Price: ${product.basePrice}</li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                id: 'file-specs',
                label: 'File Specifications',
                content: <FileSpecificationPanel />,
              },
              {
                id: 'pdf-preview',
                label: 'PDF Preview',
                content: <PDFPreviewPanel />,
              },
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}

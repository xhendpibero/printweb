'use client'

import { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { FormatSelector } from '@/components/product/FormatSelector';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { Breadcrumb } from '@/components/product/Breadcrumb';
import { SampleBookCTA } from '@/components/product/SampleBookCTA';
import { PaperSelector } from '@/components/product/PaperSelector';
import { ColorSelector } from '@/components/product/ColorSelector';
import { SurfaceFinishingSelector } from '@/components/product/SurfaceFinishingSelector';
import { ProjectPreparationSelector } from '@/components/product/ProjectPreparationSelector';
import { QuantityPricingTable } from '@/components/product/QuantityPricingTable';
import { OrderSummaryCard } from '@/components/product/OrderSummaryCard';
import { ProductTabs } from '@/components/product/ProductTabs';
import { FileSpecificationPanel } from '@/components/product/FileSpecificationPanel';
import { PDFPreviewPanel } from '@/components/product/PDFPreviewPanel';

// Mock product data for now
const mockProducts = {
  'raised-spot-gloss-flyers': {
    name: 'Raised Spot Gloss Flyers',
    category: 'Flyers',
    description: 'High-quality flyers with raised spot gloss finishing for premium presentation.',
    basePrice: 49.54,
    images: [
      '/images/products/flyers-1.jpg',
      '/images/products/flyers-2.jpg',
      '/images/products/flyers-3.jpg',
      '/images/products/flyers-4.jpg',
      '/images/products/flyers-5.jpg'
    ]
  },
  'business-cards': {
    name: 'Business Cards',
    category: 'Business Cards',
    description: 'Professional business cards with various finishing options.',
    basePrice: 29.99,
    images: [
      '/images/products/business-cards-1.webp',
      '/images/products/business-cards-2.webp',
      '/images/products/business-cards-3.webp'
    ]
  },
  'calendars': {
    name: 'Calendars',
    category: 'Calendars',
    description: 'Custom calendars for business and personal use.',
    basePrice: 15.99,
    images: [
      '/images/products/calendars-1.jpg',
      '/images/products/calendars-2.jpg'
    ]
  }
};

export default function ProductPage() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;
  const [loading, setLoading] = useState(false);
  
  // Get product data (mock for now)
  const product = mockProducts[slug as keyof typeof mockProducts] || mockProducts['raised-spot-gloss-flyers'];
  
  if (!product) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Drukarnia Graften', href: `/${locale}` },
              { label: product.category, href: `/${locale}/search?product=${slug.split('-')[0]}` },
              { label: product.name, current: true }
            ]}
          />

          {/* Product Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {product.name}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Image Gallery */}
            <div>
              <ProductImageGallery
                images={product.images.map((url) => ({ url, alt: product.name }))}
                onImageSelect={(index) => {
                  console.log('Selected image:', index);
                }}
                onInfoClick={() => {
                  console.log('Info clicked');
                  // TODO: Open info modal
                }}
                onDownloadClick={() => {
                  console.log('Download clicked');
                  // TODO: Open file preparation guide
                }}
              />

              {/* Format Selection */}
              <FormatSelector 
                onSelect={(formatId) => {
                  console.log('Selected format:', formatId);
                  // TODO: Update configuration state
                }}
              />

              {/* Paper Selection */}
              <PaperSelector 
                onSelect={(paperId, weight) => {
                  console.log('Selected paper:', paperId, weight);
                  // TODO: Update configuration state
                }}
              />

              {/* Sample Book CTA */}
              <SampleBookCTA
                type="paper"
                title="Not sure which paper to choose?"
                description="Order our sample book to feel the quality of different paper types."
                learnMoreUrl={`/${locale}/samples/paper-guide`}
                onAddToCart={() => {
                  console.log('Add paper sample book to cart');
                  // TODO: Add sample book to cart
                }}
              />

              {/* Color Selection */}
              <ColorSelector 
                onSelect={(colorId) => {
                  console.log('Selected color:', colorId);
                  // TODO: Update configuration state
                }}
              />

              {/* Finishings Sample Book CTA */}
              <SampleBookCTA
                type="finishings"
                title="Not sure which embellishments to choose?"
                description="Order our sample book to see all finishing options."
                learnMoreUrl={`/${locale}/samples/finishings-guide`}
                onAddToCart={() => {
                  console.log('Add finishings sample book to cart');
                  // TODO: Add sample book to cart
                }}
              />

              {/* Surface Finishings */}
              <SurfaceFinishingSelector
                title="Surface finishings"
                options={[
                  { 
                    id: 'blank-surface', 
                    name: '(blank)', 
                    description: 'No surface finishing',
                    sides: ['front', 'both'] 
                  },
                  { 
                    id: 'soft-skin-foil', 
                    name: 'Soft Skin foil', 
                    description: 'Soft touch surface finishing',
                    sides: ['front', 'both'],
                    imageUrl: '/images/finishings/Soft Skin foil.webp'
                  }
                ]}
                onSelect={(finishingId) => {
                  console.log('Selected surface finishing:', finishingId);
                }}
                onSideSelect={(side) => {
                  console.log('Selected surface finishing side:', side);
                }}
              />

              {/* Spot Varnish */}
              <SurfaceFinishingSelector
                title="Spot varnish"
                options={[
                  { 
                    id: 'blank-varnish', 
                    name: '(blank)', 
                    description: 'No spot varnish',
                    sides: ['front', 'both'] 
                  },
                  { 
                    id: 'spot-3d-uv', 
                    name: 'Spot 3D UV', 
                    description: '3D UV varnish effect',
                    sides: ['front', 'both'],
                    imageUrl: '/images/finishings/Spot 3D UV.webp'
                  }
                ]}
                onSelect={(finishingId) => {
                  console.log('Selected spot varnish:', finishingId);
                }}
                onSideSelect={(side) => {
                  console.log('Selected spot varnish side:', side);
                }}
              />

              {/* Decorative Foil */}
              <SurfaceFinishingSelector
                title="Decorative foil"
                options={[
                  { 
                    id: 'blank-foil', 
                    name: '(blank)', 
                    description: 'No decorative foil',
                    sides: ['front'] 
                  },
                  { 
                    id: 'gold-foiling', 
                    name: 'Gold foiling', 
                    description: 'Premium gold foil finishing',
                    sides: ['front'],
                    imageUrl: '/images/finishings/Gold foiling.webp'
                  },
                  { 
                    id: 'silver-foiling', 
                    name: 'Silver foiling', 
                    description: 'Premium silver foil finishing',
                    sides: ['front'],
                    imageUrl: '/images/finishings/Silver foiling.webp'
                  }
                ]}
                onSelect={(finishingId) => {
                  console.log('Selected decorative foil:', finishingId);
                }}
                onSideSelect={(side) => {
                  console.log('Selected decorative foil side:', side);
                }}
              />

              {/* Project Preparation */}
              <ProjectPreparationSelector
                onSelect={(optionId) => {
                  console.log('Selected preparation method:', optionId);
                }}
              />
            </div>

            {/* Middle - Configuration */}
            <div>
              {/* Quantity & Pricing Table */}
              <QuantityPricingTable
                onQuantitySelect={(quantity) => {
                  console.log('Selected quantity:', quantity);
                  // TODO: Update configuration state and pricing
                }}
              />
              <OrderSummaryCard
                summary={{
                  productName: product.name,
                  quantity: 1000, // Default quantity
                  configuration: {
                    format: 'A7 (74 × 105 mm)',
                    paper: 'matte 250g',
                    colors: 'both sides (4/4)',
                    finishings: ['Spot 3D UV (front)'],
                    projectPreparation: 'I will upload ready file'
                  },
                  pricing: {
                    printingCost: 71.79,
                    deliveryCost: 4.85,
                    netPrice: 76.64,
                    currency: 'EUR'
                  },
                  delivery: {
                    estimatedDate: 'Thursday (09/18)',
                    orderDeadline: 'Order today until 18:00'
                  }
                }}
                onAddToCart={() => {
                  console.log('Add to cart clicked');
                  // TODO: Add to cart functionality
                }}
                onCopyLink={() => {
                  console.log('Copy link clicked');
                  // TODO: Copy configuration URL
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
                  id: 'about',
                  label: 'About the product',
                  content: (
                    <div className="prose max-w-none">
                      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-8 text-white mb-8">
                        <h2 className="text-3xl font-bold mb-4">
                          Premium Raised Spot Gloss Flyers
                        </h2>
                        <p className="text-xl opacity-90">
                          Make your marketing materials stand out with our premium raised spot gloss finishing.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Why Choose Raised Spot Gloss?
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Creates a tactile, premium feel</li>
                            <li>• Highlights specific design elements</li>
                            <li>• Increases brand perception and value</li>
                            <li>• Perfect for logos, headlines, and call-to-actions</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Perfect For
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Business promotions and marketing</li>
                            <li>• Event announcements</li>
                            <li>• Product launches</li>
                            <li>• High-end brand communications</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                          Professional Tip
                        </h3>
                        <p className="text-blue-800">
                          For best results, use raised spot gloss on logos, headlines, or key design elements. 
                          Avoid covering large areas as it may affect readability.
                        </p>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'specifications',
                  label: 'Specifications and mock-ups',
                  content: (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Side - File Specifications */}
                      <div>
                        <FileSpecificationPanel
                          downloadUrl="/downloads/specifications/flyers-spec.pdf"
                          mockupUrl="/downloads/mockups/flyers-mockup.zip"
                        />
                      </div>

                      {/* Right Side - PDF Preview */}
                      <div>
                        <PDFPreviewPanel
                          pdfUrl="/samples/flyers-specification.pdf"
                          title="Flyers specification preview"
                        />
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

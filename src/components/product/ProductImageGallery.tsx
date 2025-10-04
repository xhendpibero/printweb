'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Info, Download } from 'lucide-react';

interface ProductImage {
  url: string;
  alt: string;
  thumbnail?: string;
}

interface ProductImageGalleryProps {
  images: (ProductImage | string)[];
  selectedIndex?: number;
  onImageSelect?: (index: number) => void;
  onInfoClick?: () => void;
  onDownloadClick?: () => void;
}

export function ProductImageGallery({ 
  images, 
  selectedIndex = 0, 
  onImageSelect,
  onInfoClick,
  onDownloadClick 
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handleImageSelect = (index: number) => {
    setCurrentIndex(index);
    onImageSelect?.(index);
  };

  const normalizeImage = (image: ProductImage | string): ProductImage => {
    if (typeof image === 'string') {
      return {
        url: image,
        alt: 'Product image'
      }
    }
    return image
  }

  const normalizedImages = images.map(normalizeImage)
  const currentImage = normalizedImages[currentIndex] || normalizedImages[0];

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image */}
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
        {currentImage ? (
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            width={400}
            height={400}
            className="w-full h-full object-cover cursor-zoom-in"
            placeholder="blur"
            blurDataURL="blur.png"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {normalizedImages.slice(0, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageSelect(index)}
            className={`aspect-square rounded border-2 overflow-hidden transition-colors ${
              currentIndex === index
                ? 'border-indigo-500'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            {image.thumbnail || image.url ? (
              <Image
                src={image.thumbnail || image.url}
                alt={`${image.alt} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-400">{index + 1}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Info Actions */}
      <div className="flex space-x-4">
        <button 
          onClick={onInfoClick}
          className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <Info className="w-4 h-4" />
          <span>Find out more</span>
        </button>
        <button 
          onClick={onDownloadClick}
          className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>How to prepare files</span>
        </button>
      </div>
    </div>
  );
}

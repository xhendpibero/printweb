'use client'

import { useState } from 'react';
import { Copy, ShoppingCart } from 'lucide-react';

interface OrderSummary {
  productName: string;
  quantity: number;
  configuration: {
    format?: string;
    paper?: string;
    colors?: string;
    finishings: string[];
    projectPreparation?: string;
  };
  pricing: {
    printingCost: number;
    deliveryCost: number;
    netPrice: number;
    currency: 'PLN' | 'EUR';
  };
  delivery?: {
    estimatedDate: string;
    orderDeadline: string;
  };
}

interface OrderSummaryCardProps {
  summary: OrderSummary;
  onAddToCart?: () => void;
  onCopyLink?: () => void;
  loading?: boolean;
}

export function OrderSummaryCard({ 
  summary, 
  onAddToCart, 
  onCopyLink, 
  loading = false 
}: OrderSummaryCardProps) {
  const [orderName, setOrderName] = useState('');
  const [currency, setCurrency] = useState<'PLN' | 'EUR'>(summary.pricing.currency);

  const formatPrice = (amount: number, curr: 'PLN' | 'EUR' = currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleCopyLink = () => {
    onCopyLink?.();
    // Show feedback
    const button = document.activeElement as HTMLElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
      {/* Product Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {summary.productName}
        </h3>
        <p className="text-sm text-gray-600">
          {summary.quantity.toLocaleString()} quantity
        </p>
      </div>

      {/* Order Name Input */}
      <div className="mb-4">
        <input
          type="text"
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)}
          placeholder="Add order name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Configuration Details */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Configuration details
        </h4>
        <div className="space-y-1 text-sm text-gray-600">
          {summary.configuration.format && (
            <div>• Format: {summary.configuration.format}</div>
          )}
          {summary.configuration.paper && (
            <div>• Paper: {summary.configuration.paper}</div>
          )}
          {summary.configuration.colors && (
            <div>• Colors: {summary.configuration.colors}</div>
          )}
          {summary.configuration.finishings.length > 0 && (
            <div>• Finishings: {summary.configuration.finishings.join(', ')}</div>
          )}
          {summary.configuration.projectPreparation && (
            <div>• Preparation: {summary.configuration.projectPreparation}</div>
          )}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Printing cost (net):</span>
            <span className="font-medium text-gray-900">
              {formatPrice(summary.pricing.printingCost)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery cost (net):</span>
            <span className="font-medium text-gray-900">
              {formatPrice(summary.pricing.deliveryCost)}
            </span>
          </div>
          <hr className="my-2" />
          
          {/* Currency Toggle */}
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Net price:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrency('PLN')}
                className={`px-2 py-1 text-xs rounded ${
                  currency === 'PLN' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                PLN
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-2 py-1 text-xs rounded ${
                  currency === 'EUR' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                EUR
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span></span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(summary.pricing.netPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      {summary.delivery && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-800">
            <div className="font-medium">Delivery: {summary.delivery.estimatedDate}</div>
            <div className="text-xs mt-1">{summary.delivery.orderDeadline}</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onAddToCart}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{loading ? 'Adding...' : 'Add to cart'}</span>
        </button>
        
        <button
          onClick={handleCopyLink}
          className="w-full text-indigo-600 hover:text-indigo-700 py-2 text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Copy className="w-4 h-4" />
          <span>Copy the link to this configuration</span>
        </button>
      </div>
    </div>
  );
}

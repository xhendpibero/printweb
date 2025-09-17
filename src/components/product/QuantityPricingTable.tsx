'use client'

import { useState } from 'react';
import { Download } from 'lucide-react';

interface QuantityTier {
  quantity: number;
  priceNet: number;
  pricePerCopy: number;
  deliveryDate: string;
  orderDeadline: string;
  shipping: {
    region: string;
    cost: number;
  };
}

interface QuantityPricingTableProps {
  tiers?: QuantityTier[];
  selectedQuantity?: number;
  onQuantitySelect?: (quantity: number) => void;
  currency?: 'EUR' | 'PLN';
}

const defaultQuantityTiers: QuantityTier[] = [
  {
    quantity: 50,
    priceNet: 49.54,
    pricePerCopy: 0.99,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 100,
    priceNet: 57.16,
    pricePerCopy: 0.57,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 250,
    priceNet: 59.15,
    pricePerCopy: 0.24,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 500,
    priceNet: 63.17,
    pricePerCopy: 0.13,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 1000,
    priceNet: 71.79,
    pricePerCopy: 0.072,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 2000,
    priceNet: 95.09,
    pricePerCopy: 0.048,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 2500,
    priceNet: 106.75,
    pricePerCopy: 0.043,
    deliveryDate: 'Thursday (09/18)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 5000,
    priceNet: 163.71,
    pricePerCopy: 0.033,
    deliveryDate: 'Friday (09/19)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 10000,
    priceNet: 294.82,
    pricePerCopy: 0.029,
    deliveryDate: 'Friday (09/19)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  },
  {
    quantity: 20000,
    priceNet: 552.53,
    pricePerCopy: 0.028,
    deliveryDate: 'Friday (09/19)',
    orderDeadline: 'Order today until 18:00',
    shipping: { region: 'Poland', cost: 4.85 }
  }
];

export function QuantityPricingTable({ 
  tiers = defaultQuantityTiers, 
  selectedQuantity, 
  onQuantitySelect,
  currency = 'EUR'
}: QuantityPricingTableProps) {
  const [selected, setSelected] = useState(selectedQuantity || 0);

  const handleQuantitySelect = (quantity: number) => {
    setSelected(quantity);
    onQuantitySelect?.(quantity);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatQuantity = (quantity: number) => {
    return new Intl.NumberFormat('en-US').format(quantity);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Amount', 'Price Net', 'Per Copy', 'Delivery', 'Shipping'],
      ...tiers.map(tier => [
        formatQuantity(tier.quantity),
        formatPrice(tier.priceNet),
        formatPrice(tier.pricePerCopy),
        tier.deliveryDate,
        `${tier.shipping.region} - ${formatPrice(tier.shipping.cost)}`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pricing-tiers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(tiers, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'configuration.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Shipping and print run
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>
          <button
            onClick={exportToJSON}
            className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Download className="w-4 h-4" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Number of copies (from 50 to 20,000)
      </p>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price net
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Per copy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipping
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tiers.map((tier) => (
                <tr
                  key={tier.quantity}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                    selected === tier.quantity ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                  }`}
                  onClick={() => handleQuantitySelect(tier.quantity)}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatQuantity(tier.quantity)} copy
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(tier.priceNet)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({formatPrice(tier.pricePerCopy)}/copy)
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatPrice(tier.pricePerCopy)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {tier.shipping.region}
                    </div>
                    <div className="text-xs text-gray-500">
                      {tier.deliveryDate}
                    </div>
                    <div className="text-xs text-gray-500">
                      {tier.orderDeadline}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantitySelect(tier.quantity);
                      }}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        selected === tier.quantity
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selected === tier.quantity ? 'Selected' : 'Add'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected > 0 && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
          <div className="text-sm text-indigo-900">
            Selected: {formatQuantity(selected)} copies - {formatPrice(tiers.find(t => t.quantity === selected)?.priceNet || 0)}
          </div>
        </div>
      )}
    </div>
  );
}

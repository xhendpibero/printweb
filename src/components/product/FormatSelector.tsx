'use client'

import { useState } from 'react';

interface FormatOption {
  id: string;
  name: string;
  dimensions: string;
}

interface FormatSelectorProps {
  options?: FormatOption[];
  selected?: string;
  onSelect?: (formatId: string) => void;
}

const defaultFormatOptions: FormatOption[] = [
  { id: 'a3', name: 'A3', dimensions: '297 x 420 mm' },
  { id: 'a4', name: 'A4', dimensions: '210 x 297 mm' },
  { id: 'a5', name: 'A5', dimensions: '148 x 210 mm' },
  { id: 'a6', name: 'A6', dimensions: '105 x 148 mm' },
  { id: 'a7', name: 'A7', dimensions: '74 x 105 mm' },
  { id: 'dl', name: 'DL', dimensions: '99 x 210 mm' },
  { id: 'custom', name: 'Custom', dimensions: '198 x 210 mm' }
];

export function FormatSelector({ 
  options = defaultFormatOptions, 
  selected, 
  onSelect 
}: FormatSelectorProps) {
  const [selectedFormat, setSelectedFormat] = useState(selected || '');

  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
    onSelect?.(formatId);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Format</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {options.map((format) => (
          <button
            key={format.id}
            onClick={() => handleFormatSelect(format.id)}
            className={`p-3 border-2 rounded-lg text-center transition-colors ${
              selectedFormat === format.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="font-medium text-sm">{format.name}</div>
            <div className="text-xs text-gray-500 mt-1">{format.dimensions}</div>
          </button>
        ))}
      </div>
      
      {selectedFormat && (
        <div className="mt-3 text-sm text-indigo-600">
          Selected: {options.find(f => f.id === selectedFormat)?.name} ({options.find(f => f.id === selectedFormat)?.dimensions})
        </div>
      )}
    </div>
  );
}

'use client'

import { useState } from 'react';

interface ColorOption {
  id: string;
  name: string;
  description: string;
  sides: string;
}

interface ColorSelectorProps {
  options?: ColorOption[];
  selected?: string;
  onSelect?: (colorId: string) => void;
}

const defaultColorOptions: ColorOption[] = [
  {
    id: 'color-both',
    name: 'color - both sides',
    description: '4/4',
    sides: 'both'
  },
  {
    id: 'color-one',
    name: 'color - one side',
    description: '4/0',
    sides: 'one'
  }
];

export function ColorSelector({ 
  options = defaultColorOptions, 
  selected, 
  onSelect 
}: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(selected || '');

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
    onSelect?.(colorId);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Colors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorSelect(color.id)}
            className={`p-4 border-2 rounded-lg text-center transition-colors ${
              selectedColor === color.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="font-medium text-sm">{color.name}</div>
            <div className="text-xs text-gray-500 mt-1">({color.description})</div>
          </button>
        ))}
      </div>
      
      {selectedColor && (
        <div className="mt-3 text-sm text-indigo-600">
          Selected: {options.find(c => c.id === selectedColor)?.name} 
          ({options.find(c => c.id === selectedColor)?.description})
        </div>
      )}
    </div>
  );
}

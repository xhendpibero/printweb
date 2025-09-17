'use client'

import { useState } from 'react';
import Image from 'next/image';

interface FinishingOption {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sides: ('front' | 'both')[];
}

interface SelectedFinishing {
  id: string;
  side: 'front' | 'both';
}

interface SurfaceFinishingSelectorProps {
  title: string;
  options: FinishingOption[];
  selectedOption?: string;
  selectedSide?: 'front' | 'both';
  onSelect?: (finishingId: string) => void;
  onSideSelect?: (side: 'front' | 'both') => void;
}

export function SurfaceFinishingSelector({ 
  title,
  options, 
  selectedOption, 
  selectedSide = 'front',
  onSelect,
  onSideSelect 
}: SurfaceFinishingSelectorProps) {
  const [currentOption, setCurrentOption] = useState(selectedOption || '');
  const [currentSide, setCurrentSide] = useState<'front' | 'both'>(selectedSide);

  const handleFinishingSelect = (finishingId: string) => {
    setCurrentOption(finishingId);
    onSelect?.(finishingId);
  };

  const handleSideSelect = (side: 'front' | 'both') => {
    setCurrentSide(side);
    onSideSelect?.(side);
  };

  // Check if any option supports both sides
  const supportsBothSides = options.some(option => option.sides.includes('both'));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        
        {/* Side Selection Badges - Top Level */}
        {supportsBothSides && (
          <div className="flex space-x-2">
            <button
              onClick={() => handleSideSelect('front')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                currentSide === 'front'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              front
            </button>
            <button
              onClick={() => handleSideSelect('both')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                currentSide === 'both'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              both sides
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((finishing) => (
          <button
            key={finishing.id}
            onClick={() => handleFinishingSelect(finishing.id)}
            className={`border-2 rounded-lg p-4 text-left transition-colors ${
              currentOption === finishing.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Finishing Image */}
            <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-3 overflow-hidden">
              {finishing.imageUrl ? (
                <Image
                  src={finishing.imageUrl}
                  alt={finishing.name}
                  width={150}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">{finishing.name}</span>
                </div>
              )}
            </div>

            {/* Finishing Name */}
            <h3 className="font-medium text-gray-900 text-center">
              {finishing.name}
            </h3>
            
            {finishing.description && (
              <p className="text-xs text-gray-600 text-center mt-1">
                {finishing.description}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Selected Summary */}
      {currentOption && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
          <div className="text-sm text-indigo-700">
            Selected: {options.find(o => o.id === currentOption)?.name} 
            {supportsBothSides && ` (${currentSide === 'front' ? 'front only' : 'both sides'})`}
          </div>
        </div>
      )}
    </div>
  );
}

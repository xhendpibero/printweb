'use client'

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PaperWeight {
  weight: string;
  thickness?: string;
  recommended?: boolean;
}

interface PaperOption {
  id: string;
  name: string;
  weights: PaperWeight[];
  description?: string;
}

interface PaperSelectorProps {
  options?: PaperOption[];
  selected?: { paperId: string; weight: string };
  onSelect?: (paperId: string, weight: string) => void;
}

const defaultPaperOptions: PaperOption[] = [
  {
    id: 'standard-matte',
    name: 'Standard matte',
    weights: [
      { weight: '170g', thickness: '0.19mm' },
      { weight: '250g', thickness: '0.28mm', recommended: true },
      { weight: '300g', thickness: '0.33mm' },
      { weight: '400g', thickness: '0.44mm' }
    ],
    description: 'Premium matte finish paper'
  }
];

export function PaperSelector({ 
  options = defaultPaperOptions, 
  selected, 
  onSelect 
}: PaperSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(selected?.paperId || '');
  const [selectedWeight, setSelectedWeight] = useState(selected?.weight || '');

  const handlePaperSelect = (paperId: string, weight: string) => {
    setSelectedPaper(paperId);
    setSelectedWeight(weight);
    setIsOpen(false);
    onSelect?.(paperId, weight);
  };

  const selectedOption = options.find(option => option.id === selectedPaper);
  const selectedWeightOption = selectedOption?.weights.find(w => w.weight === selectedWeight);

  const displayText = selectedOption && selectedWeightOption
    ? `${selectedOption.name} - ${selectedWeightOption.weight}`
    : 'Select paper type';

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Paper</h2>
      
      <div className="relative">
        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 border rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors ${
            isOpen ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-300'
          }`}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {displayText}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Content */}
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20">
              {options.map((paperOption) => (
                <div key={paperOption.id} className="p-2">
                  <div className="text-sm font-medium text-gray-900 px-3 py-2">
                    {paperOption.name}
                  </div>
                  <div className="space-y-1">
                    {paperOption.weights.map((weight) => (
                      <button
                        key={weight.weight}
                        onClick={() => handlePaperSelect(paperOption.id, weight.weight)}
                        className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          selectedPaper === paperOption.id && selectedWeight === weight.weight
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedPaper === paperOption.id && selectedWeight === weight.weight
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-gray-300'
                          }`} />
                          <span>
                            {paperOption.name} {weight.weight}
                            {weight.thickness && ` (${weight.thickness})`}
                          </span>
                        </div>
                        {weight.recommended && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedOption && selectedWeightOption && (
        <div className="mt-3 text-sm text-indigo-600">
          Selected: {selectedOption.name} {selectedWeightOption.weight}
          {selectedWeightOption.thickness && ` (${selectedWeightOption.thickness})`}
          {selectedWeightOption.recommended && ' - Recommended'}
        </div>
      )}
    </div>
  );
}

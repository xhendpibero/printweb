'use client'

import { useState } from 'react';
import { Upload, Eye } from 'lucide-react';

interface ProjectPreparationOption {
  id: string;
  name: string;
  description: string;
  available: boolean;
  features?: string[];
  icon?: 'upload' | '3d';
}

interface ProjectPreparationSelectorProps {
  options?: ProjectPreparationOption[];
  selected?: string;
  onSelect?: (optionId: string) => void;
}

const defaultPreparationOptions: ProjectPreparationOption[] = [
  {
    id: 'upload-ready-file',
    name: 'I will upload ready file',
    description: 'Upload your print-ready files directly',
    available: true,
    icon: 'upload'
  },
  {
    id: 'chroma-upload-3d',
    name: 'Chroma Upload 3D',
    description: 'See how your project will look',
    available: true,
    features: ['3D Preview', 'Real-time visualization'],
    icon: '3d'
  }
];

export function ProjectPreparationSelector({ 
  options = defaultPreparationOptions, 
  selected, 
  onSelect 
}: ProjectPreparationSelectorProps) {
  const [selectedOption, setSelectedOption] = useState(selected || '');

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    onSelect?.(optionId);
  };

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'upload':
        return <Upload className="w-6 h-6" />;
      case '3d':
        return <Eye className="w-6 h-6" />;
      default:
        return <Upload className="w-6 h-6" />;
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Way to prepare the project
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Currently only one project preparation option is available.
      </p>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            disabled={!option.available}
            className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
              selectedOption === option.id
                ? 'border-indigo-500 bg-indigo-50'
                : option.available
                ? 'border-gray-200 hover:border-gray-300'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 p-2 rounded-lg ${
                selectedOption === option.id
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {getIcon(option.icon)}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-medium ${
                  option.available ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {option.name}
                </h3>
                <p className={`text-sm mt-1 ${
                  option.available ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {option.description}
                </p>
                
                {option.features && option.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {option.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Radio indicator */}
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === option.id
                  ? 'border-indigo-500'
                  : 'border-gray-300'
              }`}>
                {selectedOption === option.id && (
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="mt-3 text-sm text-indigo-600">
          Selected: {options.find(o => o.id === selectedOption)?.name}
        </div>
      )}
    </div>
  );
}

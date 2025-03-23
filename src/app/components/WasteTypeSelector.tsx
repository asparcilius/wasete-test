'use client';

import { useState } from 'react';

interface WasteType {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

interface WasteTypeSelectorProps {
  onSelect: (wasteType: string) => void;
  onBack: () => void;
}

const wasteTypes: WasteType[] = [
  {
    id: 'household',
    title: 'Household Waste',
    description: 'General household items and furniture',
    examples: ['Furniture', 'Garden waste', 'Appliances', 'General household items'],
    icon: '🏠'
  },
  {
    id: 'construction',
    title: 'Construction Waste',
    description: 'Building materials and renovation debris',
    examples: ['Bricks', 'Timber', 'Concrete', 'Plasterboard'],
    icon: '🏗️'
  },
  {
    id: 'garden',
    title: 'Garden Waste',
    description: 'Green waste and landscaping materials',
    examples: ['Soil', 'Branches', 'Plants', 'Grass cuttings'],
    icon: '🌿'
  },
  {
    id: 'commercial',
    title: 'Commercial Waste',
    description: 'Business and office clearance',
    examples: ['Office furniture', 'Shop fittings', 'Equipment', 'Commercial debris'],
    icon: '🏢'
  }
];

export const WasteTypeSelector = ({ onSelect, onBack }: WasteTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (typeId: string) => {
    setSelectedType(typeId);
    onSelect(typeId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Which type of waste best describes what you are disposing of?</h2>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-blue-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>You can select multiple waste types. Some items may require special handling:</p>
        </div>
        <ul className="mt-2 ml-7 text-gray-300 list-disc">
          <li>Plasterboard and drywall materials</li>
          <li>Heavy construction materials (soil, concrete, etc.)</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wasteTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedType === type.id
                ? 'border-blue-500 bg-gray-800'
                : 'border-gray-700 bg-gray-900 hover:border-gray-600'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{type.icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{type.title}</h3>
                <p className="text-gray-400 mb-3">{type.description}</p>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, index) => (
                      <span
                        key={index}
                        className="text-sm text-gray-300"
                      >
                        {example}
                        {index < type.examples.length - 1 && ' • '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => selectedType && onSelect(selectedType)}
          disabled={!selectedType}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedType
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}; 
'use client';

import { useState } from 'react';
import { HeavyWasteModal } from './HeavyWasteModal';

interface WasteType {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

interface WasteTypeSelectorProps {
  onSelect: (wasteType: string[]) => void;
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
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showHeavyWasteModal, setShowHeavyWasteModal] = useState(false);

  const handleSelect = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleContinue = () => {
    setShowHeavyWasteModal(true);
  };

  const handleHeavyWasteConfirm = (heavyWasteTypes: string[]) => {
    const allWasteTypes = heavyWasteTypes.length > 0 
      ? [...selectedTypes, ...heavyWasteTypes]
      : selectedTypes;
    
    onSelect(allWasteTypes);
    setShowHeavyWasteModal(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Select Waste Types
        </h1>
        <p className="text-lg text-white/60 mt-2">
          Choose the types of waste you need to dispose of
        </p>
      </div>

      <div className="space-y-8 backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10">
        {/* Info Box */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-white/5">
              <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="space-y-3">
              <p className="text-white/80">You can select multiple waste types. Some items may require special handling:</p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                  Plasterboard and drywall materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                  Heavy construction materials (soil, concrete, etc.)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Waste Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wasteTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`group p-6 rounded-2xl border transition-all duration-200 ${
                selectedTypes.includes(type.id)
                  ? 'border-emerald-400/50 bg-emerald-400/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl transition-colors ${
                  selectedTypes.includes(type.id)
                    ? 'bg-emerald-400/20'
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}>
                  <span className="text-2xl">{type.icon}</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-medium text-white mb-1">{type.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{type.description}</p>
                  <div>
                    <p className="text-white/40 text-sm mb-2">Examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((example, index) => (
                        <span
                          key={index}
                          className="text-sm text-white/60"
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

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="px-6 py-4 rounded-2xl font-medium bg-white/5 text-white hover:bg-white/10 transition-all duration-200 flex items-center group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={selectedTypes.length === 0}
            className={`px-6 py-4 rounded-2xl font-medium transition-all duration-200 flex items-center group ${
              selectedTypes.length > 0
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-black hover:from-emerald-500 hover:to-teal-500'
                : 'bg-white/5 text-white/40 cursor-not-allowed'
            }`}
          >
            Continue
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <HeavyWasteModal
        isOpen={showHeavyWasteModal}
        onClose={() => setShowHeavyWasteModal(false)}
        onConfirm={handleHeavyWasteConfirm}
      />
    </div>
  );
}; 
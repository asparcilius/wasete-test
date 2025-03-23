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
    <div className="relative h-[100dvh] flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 text-center mb-4">
        <h1 className="text-4xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          What are you disposing of?
        </h1>
        <p className="text-lg text-white/60 mt-2">
          Select all the types of waste you need to dispose of
        </p>
      </div>

      {/* Scrollable Selections */}
      <div className="flex-1 overflow-y-auto overscroll-contain -webkit-overflow-scrolling-touch">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-4 pb-24">
          {wasteTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`group relative backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
                selectedTypes.includes(type.id)
                  ? 'bg-emerald-400/10 border-emerald-400/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-colors ${
                  selectedTypes.includes(type.id)
                    ? 'bg-emerald-400/20'
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}>
                  <span className="text-xl sm:text-2xl">{type.icon}</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-base sm:text-lg font-medium text-white mb-0.5 sm:mb-1">{type.title}</h3>
                  <p className="text-sm text-white/60 mb-3 sm:mb-4">{type.description}</p>
                  <div>
                    <p className="text-xs sm:text-sm text-white/40 mb-1.5 sm:mb-2">Examples:</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {type.examples.map((example, index) => (
                        <span
                          key={index}
                          className="text-xs sm:text-sm text-white/60"
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
      </div>

      {/* Fixed Bottom Actions */}
      <div className="flex flex-row items-center justify-between gap-3 fixed bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-lg border-t border-white/10">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 rounded-xl font-medium bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center group"
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
          className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center group ${
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

      {/* Heavy Waste Modal */}
      <HeavyWasteModal
        isOpen={showHeavyWasteModal}
        onClose={() => setShowHeavyWasteModal(false)}
        onConfirm={handleHeavyWasteConfirm}
      />
    </div>
  );
}; 
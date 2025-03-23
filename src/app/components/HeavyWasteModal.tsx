'use client';

import { useState } from 'react';

interface HeavyWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (heavyWasteTypes: string[]) => void;
}

const heavyWasteTypes = [
  {
    id: 'soil',
    title: 'Soil',
    description: 'Including topsoil and subsoil'
  },
  {
    id: 'concrete',
    title: 'Concrete',
    description: 'Blocks, slabs, and foundations'
  },
  {
    id: 'bricks',
    title: 'Bricks',
    description: 'Whole or broken bricks'
  },
  {
    id: 'tiles',
    title: 'Tiles',
    description: 'Ceramic, porcelain, or stone tiles'
  },
  {
    id: 'sand',
    title: 'Sand',
    description: 'Building or garden sand'
  },
  {
    id: 'gravel',
    title: 'Gravel',
    description: 'Stone and aggregate'
  },
  {
    id: 'rubble',
    title: 'Rubble',
    description: 'Mixed construction debris'
  }
];

export const HeavyWasteModal = ({ isOpen, onClose, onConfirm }: HeavyWasteModalProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedTypes);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white/10 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-8 space-y-4 sm:space-y-6 border border-white/10 shadow-2xl">
        <div className="space-y-1 sm:space-y-2">
          <h2 className="text-xl sm:text-2xl font-medium text-white">Heavy Waste Types</h2>
          <p className="text-sm sm:text-base text-white/60">Please select any heavy waste types you need to dispose of</p>
        </div>
        
        {/* Warning Notice */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-full bg-yellow-400/10">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-base text-yellow-400 font-medium">Important Notice</h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Heavy waste types have specific requirements and restrictions. Some skip sizes may not be available for heavy waste disposal.
              </p>
            </div>
          </div>
        </div>

        {/* Heavy Waste Types List */}
        <div className="space-y-2 sm:space-y-3">
          {heavyWasteTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeToggle(type.id)}
              className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
                selectedTypes.includes(type.id)
                  ? 'border-emerald-400/50 bg-emerald-400/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg border transition-colors flex items-center justify-center ${
                selectedTypes.includes(type.id)
                  ? 'bg-emerald-400 border-emerald-400'
                  : 'border-white/20 group-hover:border-white/40'
              }`}>
                {selectedTypes.includes(type.id) && (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm sm:text-base font-medium text-white">{type.title}</div>
                <div className="text-xs sm:text-sm text-white/60">{type.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium bg-white/5 text-white hover:bg-white/10 transition-all duration-200 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium bg-gradient-to-r from-emerald-400 to-teal-400 text-black hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 text-sm sm:text-base"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
}; 
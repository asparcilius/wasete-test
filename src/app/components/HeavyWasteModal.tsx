'use client';

import { useState } from 'react';

interface HeavyWasteType {
  id: string;
  name: string;
  description: string;
}

const HEAVY_WASTE_TYPES: HeavyWasteType[] = [
  { id: 'soil', name: 'Soil', description: 'Including topsoil and subsoil' },
  { id: 'concrete', name: 'Concrete', description: 'Blocks, slabs, and foundations' },
  { id: 'bricks', name: 'Bricks', description: 'Whole or broken bricks' },
  { id: 'tiles', name: 'Tiles', description: 'Ceramic, porcelain, or stone tiles' },
  { id: 'sand', name: 'Sand', description: 'Building or garden sand' },
  { id: 'gravel', name: 'Gravel', description: 'Stone and aggregate' },
  { id: 'rubble', name: 'Rubble', description: 'Mixed construction debris' },
];

interface HeavyWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedTypes: string[]) => void;
}

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-6">
      <div className="bg-white/10 rounded-3xl max-w-2xl w-full p-8 space-y-8 border border-white/10 shadow-2xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-white">Heavy Waste Types</h2>
          <p className="text-white/60">Please select any heavy waste types you need to dispose of</p>
        </div>
        
        {/* Warning Notice */}
        <div className="p-6 rounded-2xl bg-yellow-400/10 border border-yellow-400/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-yellow-400/10">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-yellow-400 font-medium">Important Notice</h3>
              <p className="text-white/60 text-sm mt-2">
                Heavy waste types have specific requirements and restrictions. Some skip sizes may not be available for heavy waste disposal.
              </p>
            </div>
          </div>
        </div>

        {/* Checkboxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HEAVY_WASTE_TYPES.map((type) => (
            <label
              key={type.id}
              className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all duration-200 flex items-start gap-4"
            >
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                  className="peer absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="absolute inset-0 rounded border border-white/20 peer-checked:border-emerald-400 peer-checked:bg-emerald-400/20 transition-all duration-200" />
                <svg
                  className="w-3 h-3 text-emerald-400 opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">{type.name}</div>
                <div className="text-sm text-white/60">{type.description}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Info Notice */}
        <div className="p-6 rounded-2xl bg-blue-400/10 border border-blue-400/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-blue-400/10">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white/60 text-sm">
              For safety reasons, heavy waste can only be disposed of in skips up to 8 yards. Larger skips will not be available if heavy waste is selected.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-white/60 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 rounded-2xl font-medium bg-gradient-to-r from-emerald-400 to-teal-400 text-black hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 flex items-center group"
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
    </div>
  );
}; 
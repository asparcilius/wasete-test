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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-lg w-full p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Heavy Waste Types</h2>
        
        <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-600/30">
          <div className="flex items-start gap-3">
            <div className="text-yellow-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-yellow-500 font-medium">Important Notice</h3>
              <p className="text-gray-300 text-sm mt-1">
                Heavy waste types have specific requirements and restrictions. Some skip sizes may not be available for heavy waste disposal.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-gray-300 mb-4">Please select any heavy waste types you need to dispose of:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HEAVY_WASTE_TYPES.map((type) => (
              <label
                key={type.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-white">{type.name}</div>
                  <div className="text-sm text-gray-400">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-600/30">
          <div className="flex items-start gap-3">
            <div className="text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-300">
              For safety reasons, heavy waste can only be disposed of in skips up to 8 yards. Larger skips will not be available if heavy waste is selected.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}; 
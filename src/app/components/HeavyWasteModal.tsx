'use client';

import { useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BottomSheet } from './BottomSheet';
import { heavyWasteTypes, HeavyWasteType } from '../data/heavyWasteTypes';
import { Button } from './Button';
import { GradientButton } from './GradientButton';

interface HeavyWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (heavyWasteTypes: string[]) => void;
}

export const HeavyWasteModal = ({ isOpen, onClose, onConfirm }: HeavyWasteModalProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedTypes);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Heavy Waste Types"
    >
      <div className="space-y-4">
        {/* Description */}
        <p className="text-sm text-white/70">
          Please select any heavy waste types you need to dispose of
        </p>

        {/* Warning Notice */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-400 mb-1">
              Important Notice
            </h4>
            <p className="text-sm text-white/60">
              Heavy waste types have specific requirements and may incur additional charges. 
              Our team will contact you to discuss pricing based on the exact weight and volume.
            </p>
          </div>
        </div>

        {/* Heavy Waste Types List */}
        <div className="space-y-2 max-h-[32vh] overflow-y-auto">
          {heavyWasteTypes.map((type: HeavyWasteType) => (
            <button
              key={type.id}
              onClick={() => handleTypeToggle(type.id)}
              className={`w-full p-3 rounded-xl border transition-all flex items-center gap-3 ${
                selectedTypes.includes(type.id)
                  ? 'border-emerald-400/50 bg-emerald-400/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`w-5 h-5 rounded-md border transition-colors flex items-center justify-center ${
                selectedTypes.includes(type.id)
                  ? 'bg-emerald-400 border-emerald-400'
                  : 'border-white/20'
              }`}>
                {selectedTypes.includes(type.id) && (
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-white">{type.title}</div>
                <div className="text-xs text-white/60">{type.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={onClose}
            variant="secondary"
            size="sm"
            fullWidth
          >
            Cancel
          </Button>
          <GradientButton
            onClick={handleConfirm}
            size="sm"
            fullWidth
          >
            Confirm Selection
          </GradientButton>
        </div>
      </div>
    </BottomSheet>
  );
}; 
'use client';

import { useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BottomSheet } from '../layout/BottomSheet';
import { heavyWasteTypes, HeavyWasteType } from '../../data/heavyWasteTypes';
import { Button } from '../common/Button';
import { GradientButton } from '../common/GradientButton';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { spacing } from '../../styles/common';

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
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Heavy Waste Warning"
    >
      <div className={spacing.section}>
        {/* Warning Message */}
        <Badge
          variant="warning"
          icon={<ExclamationTriangleIcon className="w-5 h-5" />}
        >
          Please Identify Heavy Waste Items
        </Badge>
        
        <p className="text-sm text-white/60">
          For safety and compliance, we need to know if you&apos;re disposing of any heavy waste materials.
          Please select all that apply:
        </p>

        {/* Heavy Waste Types List */}
        <div className="space-y-2.5 max-h-[45vh] pt-4 overflow-y-auto px-2.5 -mx-0.5">
          {heavyWasteTypes.map((type: HeavyWasteType) => (
            <Card
              key={type.id}
              onClick={() => handleTypeToggle(type.id)}
              isSelected={selectedTypes.includes(type.id)}
              className="p-2.5 flex items-center gap-2.5"
            >
              <div className={`w-4 h-4 rounded-md border transition-colors flex items-center justify-center ${
                selectedTypes.includes(type.id)
                  ? 'bg-emerald-400 border-emerald-400'
                  : 'border-white/20'
              }`}>
                {selectedTypes.includes(type.id) && (
                  <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-white leading-tight">{type.title}</div>
                <div className="text-xs text-white/60 leading-tight">{type.description}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3">
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
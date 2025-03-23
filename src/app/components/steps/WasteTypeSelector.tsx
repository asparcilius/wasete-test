'use client';

import { useState } from 'react';
import { HeavyWasteModal } from '../modals/HeavyWasteModal';
import { wasteTypes, WasteType } from '../../data/wasteTypes';
import { Button } from '../common/Button';
import { GradientButton } from '../common/GradientButton';
import { Card } from '../common/Card';
import { GradientHeading } from '../common/GradientHeading';
import { commonStyles } from '../../styles/common';

interface WasteTypeSelectorProps {
  onSelect: (wasteType: string[]) => void;
  onBack: () => void;
}

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
        <GradientHeading size="xl">
          What are you disposing of?
        </GradientHeading>
        <p className="text-lg text-white/60 mt-2">
          Select all the types of waste you need to dispose of
        </p>
      </div>

      {/* Scrollable Selections */}
      <div className="flex-1 overflow-hidden">
        <div className="h-[500px] overflow-y-auto overscroll-contain grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-4 pb-24 p-2">
          {wasteTypes.map((type: WasteType) => (
            <Card
              key={type.id}
              onClick={() => handleSelect(type.id)}
              isSelected={selectedTypes.includes(type.id)}
              className="p-4 sm:p-5"
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
            </Card>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className={`flex flex-row items-center justify-between gap-3 ${commonStyles.stickyBar}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-row gap-3">
            <Button
              onClick={onBack}
              variant="primary"
              icon={
                <svg
                  className="w-5 h-5"
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
              }
              iconPosition="left"
              fullWidth
            >
              Back
            </Button>
            <GradientButton
              onClick={handleContinue}
              disabled={selectedTypes.length === 0}
              icon={
                <svg
                  className="w-5 h-5"
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
              }
              fullWidth
            >
              Continue
            </GradientButton>
          </div>
        </div>
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

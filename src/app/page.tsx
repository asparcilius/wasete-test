'use client';

import { useState } from 'react';
import { PostcodeInput } from './components/PostcodeInput';
import { WasteTypeSelector } from './components/WasteTypeSelector';
import { SkipSelector } from './components/SkipSelector';
import type { Address } from './types/address';

type Step = 'postcode' | 'waste-type' | 'skip-select';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('postcode');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [wasteType, setWasteType] = useState('');

  const handleAddressSubmit = (address: Address) => {
    setSelectedAddress(address);
    setCurrentStep('waste-type');
  };

  const handleWasteTypeSelect = (selectedType: string) => {
    setWasteType(selectedType);
    setCurrentStep('skip-select');
  };

  const handleSkipSelect = (skip: any) => {
    // Handle skip selection - this would typically involve proceeding to payment
    console.log('Selected skip:', skip);
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'waste-type':
        setCurrentStep('postcode');
        break;
      case 'skip-select':
        setCurrentStep('waste-type');
        break;
      default:
        break;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'postcode' ? 'bg-blue-600' : 'bg-blue-600'
              }`}>
                1
              </div>
              <div className={`h-1 w-16 mx-2 ${
                currentStep !== 'postcode' ? 'bg-blue-600' : 'bg-gray-700'
              }`} />
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'waste-type' ? 'bg-blue-600' : currentStep === 'skip-select' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                2
              </div>
              <div className={`h-1 w-16 mx-2 ${
                currentStep === 'skip-select' ? 'bg-blue-600' : 'bg-gray-700'
              }`} />
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'skip-select' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between px-2 mt-2 text-sm text-gray-400">
            <span>Postcode</span>
            <span>Waste Type</span>
            <span>Select Skip</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 'postcode' && (
            <PostcodeInput onSubmit={handleAddressSubmit} />
          )}
          {currentStep === 'waste-type' && (
            <WasteTypeSelector
              onSelect={handleWasteTypeSelect}
              onBack={handleBack}
            />
          )}
          {currentStep === 'skip-select' && selectedAddress && (
            <SkipSelector
              postcode={selectedAddress.postcode}
              area={selectedAddress.city}
              onSelect={handleSkipSelect}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </main>
  );
}

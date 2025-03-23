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
  const [wasteTypes, setWasteTypes] = useState<string[]>([]);

  const handleAddressSubmit = (address: Address) => {
    setSelectedAddress(address);
    setCurrentStep('waste-type');
  };

  const handleWasteTypeSelect = (selectedTypes: string[]) => {
    setWasteTypes(selectedTypes);
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

  const steps = [
    { id: 'postcode', number: 1, label: 'Postcode' },
    { id: 'waste-type', number: 2, label: 'Waste Type' },
    { id: 'skip-select', number: 3, label: 'Select Skip' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative flex justify-between px-2">
            {/* Progress Line - Behind steps */}
            <div className="absolute top-5 left-[20px] w-[calc(100%-50px)] h-[2px] -z-0">
              <div className="relative w-full h-full bg-white/5">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
                  style={{
                    width: currentStep === 'postcode' 
                      ? '0%' 
                      : currentStep === 'waste-type'
                      ? '50%'
                      : '100%'
                  }}
                />
              </div>
            </div>

            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    currentStep === step.id
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-400/20 scale-110'
                      : currentStep === steps[index + 1]?.id || currentStep === steps[index + 2]?.id
                      ? 'bg-emerald-400/20 text-emerald-400'
                      : 'bg-white/5 text-white/40'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    currentStep === step.id
                      ? 'text-black'
                      : currentStep === steps[index + 1]?.id || currentStep === steps[index + 2]?.id
                      ? 'text-emerald-400'
                      : 'text-white/40'
                  }`}>{step.number}</span>
                </div>
                <span 
                  className={`mt-2 text-sm transition-all duration-500 ${
                    currentStep === step.id
                      ? 'text-white font-medium'
                      : currentStep === steps[index + 1]?.id || currentStep === steps[index + 2]?.id
                      ? 'text-emerald-400/80'
                      : 'text-white/40'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
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

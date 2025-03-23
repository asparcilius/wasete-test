'use client';

import { useState } from 'react';
import { PostcodeInput } from './components/PostcodeInput';
import { WasteTypeSelector } from './components/WasteTypeSelector';
import { SkipSelector } from './components/SkipSelector';
import { ThankYou } from './components/ThankYou';
import type { Address } from './types/address';
import type { Skip } from './services/skipService';
import { MapPinIcon, TrashIcon, TruckIcon } from '@heroicons/react/24/outline';

type Step = 'postcode' | 'waste-type' | 'skip-select' | 'thank-you';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('postcode');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const handleAddressSubmit = (address: Address) => {
    setSelectedAddress(address);
    setCurrentStep('waste-type');
  };

  const handleWasteTypeSelect = () => {
    setCurrentStep('skip-select');
  };

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
    setCurrentStep('thank-you');
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
    { 
      id: 'postcode', 
      number: 1, 
      label: 'Location', 
      time: '30 sec',
      icon: MapPinIcon,
      tooltip: 'Enter your postcode to check availability'
    },
    { 
      id: 'waste-type', 
      number: 2, 
      label: 'Waste Type', 
      time: '1 min',
      icon: TrashIcon,
      tooltip: "Tell us what you're disposing of"
    },
    { 
      id: 'skip-select', 
      number: 3, 
      label: 'Choose Skip', 
      time: '1 min',
      icon: TruckIcon,
      tooltip: 'Select the right skip size'
    }
  ];

  const getStepProgress = (stepId: string) => {
    switch (stepId) {
      case 'postcode':
        return selectedAddress ? 'completed' : currentStep === 'postcode' ? 'current' : 'upcoming';
      case 'waste-type':
        return currentStep === 'waste-type' ? 'current' : currentStep === 'skip-select' || currentStep === 'thank-you' ? 'completed' : 'upcoming';
      case 'skip-select':
        return currentStep === 'skip-select' ? 'current' : currentStep === 'thank-you' ? 'completed' : 'upcoming';
      default:
        return 'upcoming';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
            Skip Hire
          </h1>
        </div>

        {/* Progress Steps - Only show if not on thank you page */}
        {currentStep !== 'thank-you' && (
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="relative">
              {/* Mobile Progress Bar */}
              <div className="sm:hidden mb-6">
                <div className="text-sm text-white/60">
                  Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}
                </div>
                <div className="mt-2 h-1 bg-white/5 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${((steps.findIndex(s => s.id === currentStep) + 1) / steps.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Desktop Progress Steps */}
              <div className="hidden sm:block">
                <div className="relative flex justify-between">
                  {/* Progress Line */}
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

                  {steps.map((step) => {
                    const status = getStepProgress(step.id);
                    const Icon = step.icon;
                    
                    return (
                      <div key={step.id} className="flex flex-col items-center relative z-10 group">
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 text-center">
                          <div className="bg-gray-800 text-white text-xs rounded-lg py-1 px-2">
                            {step.tooltip}
                          </div>
                        </div>
                        
                        <div 
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            status === 'current'
                              ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-400/20 scale-110'
                              : status === 'completed'
                              ? 'bg-emerald-400/20 text-emerald-400'
                              : 'bg-white/5 text-white/40'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span 
                          className={`mt-2 text-sm transition-all duration-500 ${
                            status === 'current'
                              ? 'text-white font-medium'
                              : status === 'completed'
                              ? 'text-emerald-400/80'
                              : 'text-white/40'
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-xs text-white/40 mt-1">{step.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

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
          {currentStep === 'thank-you' && selectedSkip && selectedAddress && (
            <ThankYou
              skip={selectedSkip}
              address={{
                postcode: selectedAddress.postcode,
                city: selectedAddress.city
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}

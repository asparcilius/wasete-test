'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { addressService } from '../services/addressService';
import type { Address } from '../types/address';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { GradientButton } from './GradientButton';

interface PostcodeInputProps {
  onSubmit: (address: Address) => void;
}

export const PostcodeInput = ({ onSubmit }: PostcodeInputProps) => {
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressList, setShowAddressList] = useState(false);
  const addressListRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Form fields
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressListRef.current && !addressListRef.current.contains(event.target as Node)) {
        setShowAddressList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePostcodeSearch = useCallback(async () => {
    if (!postcode.trim()) {
      return;
    }
    
    // Basic UK postcode validation
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!postcodeRegex.test(postcode.trim())) {
      setError('Please enter a valid UK postcode');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const results = await addressService.searchAddresses(postcode.trim());
      setAddresses(results);
      setShowAddressList(true);
    } catch (error) {
      console.error('Error searching addresses:', error);
      setError('Failed to find addresses. Please try again.');
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [postcode]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (postcode.length >= 5) {
      searchTimeoutRef.current = setTimeout(() => {
        handlePostcodeSearch();
      }, 300);
    } else {
      setAddresses([]);
      setShowAddressList(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [postcode, handlePostcodeSearch]);

  const handleAddressSelect = async (address: Address) => {
    try {
      setLoading(true);
      setError('');
      const details = await addressService.getAddressDetails(address.id);
      setSelectedAddress(details);
      setShowAddressList(false);
      
      // Populate form fields
      setCity(details.city);
      setStreet(details.street);
      setHouseNumber(details.buildingNumber);
      
    } catch (error) {
      console.error('Error fetching address details:', error);
      setError('Failed to fetch address details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (selectedAddress) {
      onSubmit(selectedAddress);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Find Available Skips
        </h1>
        <p className="text-base sm:text-lg text-white/60 mt-2">
          Enter your postcode to see skip hire options in your area
        </p>
      </div>
      
      <div className="space-y-4 sm:space-y-6 backdrop-blur-xl bg-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/10">
        <div className="space-y-4 sm:space-y-6">
          {/* Postcode Input */}
          <div>
            <label htmlFor="postcode" className="block text-white/80 text-sm font-medium mb-1.5 sm:mb-2">
              Postcode
            </label>
            <div className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="postcode"
                  className="flex-1 bg-white/5 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none border border-white/10 focus:border-white/20 transition-colors placeholder:text-white/40 text-base"
                  placeholder="Enter your postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                />
                {loading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                  </div>
                )}
              </div>
              
              {error && (
                <p className="text-red-400 mt-2 text-sm">{error}</p>
              )}

              {showAddressList && addresses.length > 0 && (
                <div 
                  ref={addressListRef}
                  className="absolute left-0 right-0 top-full mt-2 bg-gray-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <div className="max-h-[240px] overflow-y-auto">
                    {addresses.map((address) => (
                      <button
                        key={address.id}
                        onClick={() => handleAddressSelect(address)}
                        className="w-full px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center">
                            <MapPinIcon className="w-3 h-3 text-emerald-400" />
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-white">{address.line1}</div>
                          <div className="text-xs text-white/60 mt-0.5">{address.fullAddress}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Address Fields */}
          {selectedAddress && (
            <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
              <div>
                <label htmlFor="city" className="block text-white/80 text-sm font-medium mb-1.5 sm:mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full bg-white/5 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none border border-white/10 focus:border-white/20 transition-colors text-base"
                  value={city}
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="street" className="block text-white/80 text-sm font-medium mb-1.5 sm:mb-2">
                  Street Name
                </label>
                <input
                  type="text"
                  id="street"
                  className="w-full bg-white/5 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none border border-white/10 focus:border-white/20 transition-colors text-base"
                  value={street}
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="houseNumber" className="block text-white/80 text-sm font-medium mb-1.5 sm:mb-2">
                  House/Flat Number
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  className="w-full bg-white/5 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none border border-white/10 focus:border-white/20 transition-colors text-base"
                  value={houseNumber}
                  readOnly
                />
              </div>

              {/* Continue Button */}
              <GradientButton
                onClick={handleSubmit}
                fullWidth
                size="lg"
                className="mt-6 sm:mt-8"
                icon={
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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
              >
                Continue
              </GradientButton>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-white/40">
        Liviu Vasilescu Demo
      </div>
    </div>
  );
}; 
'use client';

import { useState, useEffect, useRef } from 'react';
import { addressService } from '../services/addressService';
import type { Address } from '../types/address';

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

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (postcode.length >= 5) { // Start searching when postcode is at least 5 characters
      // Add a small delay to prevent too many API calls while typing
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
  }, [postcode]);

  const handlePostcodeSearch = async () => {
    if (!postcode.trim()) {
      return;
    }
    
    // Basic UK postcode validation
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!postcodeRegex.test(postcode.trim())) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      const results = await addressService.searchAddresses(postcode.trim());
      setAddresses(results);
      setShowAddressList(true);
    } catch (err) {
      setError('Failed to find addresses. Please try again.');
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

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
      
      // Don't submit yet - wait for user to click Continue
    } catch (err) {
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
                  className="absolute z-10 w-full mt-2 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl max-h-[280px] overflow-y-auto"
                >
                  {addresses.map((address) => (
                    <button
                      key={address.id}
                      onClick={() => handleAddressSelect(address)}
                      className="w-full px-6 py-4 text-left hover:bg-white/5 focus:outline-none focus:bg-white/5 border-b border-white/5 last:border-0 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                          <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">{address.line1}</p>
                          <p className="text-sm text-white/60">{address.city}</p>
                        </div>
                      </div>
                    </button>
                  ))}
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
              <button
                onClick={handleSubmit}
                className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 flex items-center justify-center group text-base"
              >
                Continue
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 group-hover:translate-x-0.5 transition-transform"
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
          )}
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-white/40">
        Liviu Vasilescu Demo
      </div>
    </div>
  );
}; 
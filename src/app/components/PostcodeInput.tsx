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
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">SKIP HIRE</h1>
        <p className="text-xl text-gray-600">With A Difference</p>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
        <div className="space-y-4">
          {/* Postcode Input */}
          <div>
            <label htmlFor="postcode" className="block text-white mb-2">
              Postcode
            </label>
            <div className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="postcode"
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                />
                {loading && (
                  <div className="absolute right-3 top-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              
              {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
              )}

              {showAddressList && addresses.length > 0 && (
                <div
                  ref={addressListRef}
                  className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                >
                  {addresses.map((address) => (
                    <button
                      key={address.id}
                      onClick={() => handleAddressSelect(address)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700 border-b border-gray-700 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-white">{address.line1}</p>
                          <p className="text-sm text-gray-400">{address.city}</p>
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
            <div className="space-y-4 mt-6">
              <div>
                <label htmlFor="city" className="block text-white mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={city}
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="street" className="block text-white mb-2">
                  Street Name
                </label>
                <input
                  type="text"
                  id="street"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={street}
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="houseNumber" className="block text-white mb-2">
                  House/Flat Number
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={houseNumber}
                  readOnly
                />
              </div>

              {/* Continue Button */}
              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                Continue
                <svg
                  className="w-5 h-5 ml-2"
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
      
      <div className="mt-4 text-center text-sm text-gray-500">
       Liviu Vasilescu Demo
      </div>
    </div>
  );
}; 
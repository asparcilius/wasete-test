'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { skipService, Skip } from '../services/skipService';
import { ApiResponseError } from '../utils/api';
import { Loading } from './Loading';

interface SkipSelectorProps {
  postcode: string;
  area: string;
  onSelect: (skip: Skip) => void;
  onBack: () => void;
}

export const SkipSelector = ({ postcode, area, onSelect, onBack }: SkipSelectorProps) => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const data = await skipService.getSkipsByLocation({ postcode, area });
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSkips(data);
        setError('');
      } catch (err) {
        console.error('Error fetching skips:', err);
        if (err instanceof ApiResponseError) {
          setError(err.message);
        } else {
          setError('Unable to load skip options. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [postcode, area]);

  const handleSelect = (skip: Skip) => {
    setSelectedSkip(skip);
    onSelect(skip);
  };

  if (loading) {
    return <Loading message="Loading available skips..." />;
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Choose Your Skip Size</h2>
      <p className="text-gray-400 mb-8">Select the skip size that best suits your needs</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skips.map((skip) => (
          <div
            key={skip.id}
            className={`relative rounded-lg overflow-hidden transition-transform duration-200 transform hover:scale-102 ${
              selectedSkip?.id === skip.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="relative h-48">
              <Image
                src="/images/skip-placeholder.jpeg"
                alt={`${skip.size} Yard Skip`}
                fill
                className="object-cover brightness-75"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
                {skip.size} Yards
              </div>
              {skip.isPrivateOnly && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-yellow-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Private Property Only</span>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-900">
              <h3 className="text-xl font-semibold mb-2">{skip.size} Yard Skip</h3>
              <p className="text-gray-400 mb-4">{skip.period} day hire period</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-blue-500">£{skip.price.toFixed(2)}</span>
                <span className="text-gray-400">per week</span>
              </div>
              <button
                onClick={() => handleSelect(skip)}
                className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                Select This Skip
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
      </div>

      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-blue-500">£</span>
              <span className="text-2xl font-bold">{selectedSkip.size} Yard Skip</span>
              <span className="text-gray-400">{selectedSkip.period} day hire</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => onSelect(selectedSkip)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
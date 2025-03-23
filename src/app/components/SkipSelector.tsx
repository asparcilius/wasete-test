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
  };

  const handleContinue = () => {
    if (selectedSkip) {
      onSelect(selectedSkip);
    }
  };

  if (loading) {
    return <Loading message="Loading available skips..." />;
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="space-y-8 backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10">
          <div className="p-6 rounded-2xl bg-red-400/10 border border-red-400/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-red-400/10">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-red-400 font-medium">Error Loading Skips</p>
                <p className="text-white/60 text-sm">{error}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-full px-6 py-4 rounded-2xl font-medium bg-white/5 text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center group"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-0.5 transition-transform"
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
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Choose Your Skip
        </h1>
        <p className="text-lg text-white/60 mt-2">
          Select the skip size that best suits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {skips.map((skip) => (
          <div
            key={skip.id}
            onClick={() => handleSelect(skip)}
            className={`group relative backdrop-blur-xl rounded-2xl transition-all duration-300 cursor-pointer ${
              selectedSkip?.id === skip.id
                ? 'bg-gradient-to-b from-emerald-600/20 to-emerald-600/5 ring-2 ring-emerald-400/50 ring-offset-2 ring-offset-black'
                : 'bg-white/5 hover:bg-white/8'
            }`}
          >
            <div className="absolute inset-0 rounded-2xl transition-opacity bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100"></div>
            
            <div className="relative h-40 rounded-t-2xl overflow-hidden">
              <Image
                src="/images/skip-placeholder.jpeg"
                alt={`${skip.size} Yard Skip`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-3 right-3">
                <div className="px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md text-white text-sm font-medium border border-white/10">
                  {skip.size} Yards
                </div>
              </div>
              {skip.isPrivateOnly && (
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-400/10 backdrop-blur-md border border-yellow-400/20">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-yellow-400 font-medium">Private Property Only</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
                  {skip.size} Yard Skip
                </h3>
                <p className="text-white/60 text-sm mt-0.5">{skip.period} day hire period</p>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-medium bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  £{skip.price.toFixed(2)}
                </span>
                <span className="text-sm text-white/40">per week</span>
              </div>

              <div
                className={`w-full py-3 rounded-xl font-medium transition-all duration-200 text-center ${
                  selectedSkip?.id === skip.id
                    ? 'bg-emerald-400 text-black'
                    : 'bg-white/10 text-white group-hover:bg-white/15'
                }`}
              >
                {selectedSkip?.id === skip.id ? 'Selected' : 'Select This Skip'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Bar */}
      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl font-medium bg-white/5 text-white hover:bg-white/10 transition-all duration-200 flex items-center group"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:-translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <div className="flex items-baseline gap-2">
                <span className="text-white/60">Selected:</span>
                <span className="text-white font-medium">{selectedSkip.size} Yard Skip</span>
                <span className="text-2xl font-medium bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent ml-4">
                  £{selectedSkip.price.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => onSelect(selectedSkip)}
              className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-emerald-400 to-teal-400 text-black hover:from-emerald-300 hover:to-teal-300 transition-all duration-200 flex items-center group"
            >
              Continue
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 
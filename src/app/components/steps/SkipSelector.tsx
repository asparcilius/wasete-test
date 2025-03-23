'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { skipService, Skip } from '../../services/skipService';
import { ApiResponseError } from '../../utils/api';
import { Loading } from '../common/Loading';
import { TruckIcon } from '@heroicons/react/24/outline';
import { Button } from '../common/Button';
import { GradientButton } from '../common/GradientButton';
import { Card } from '../common/Card';
import { GradientHeading } from '../common/GradientHeading';
import { Badge } from '../common/Badge';
import { commonStyles, spacing } from '../../styles/common';

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

  if (loading) {
    return <Loading message="Loading available skips..." />;
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <Card className={spacing.largeContainer}>
          <Badge
            variant="error"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            Error Loading Skips
          </Badge>
          <p className="text-white/60 text-sm mt-4">{error}</p>
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
            className="mt-6"
          >
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative pb-24 sm:pb-28">
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <GradientHeading size="xl">
            Choose Your Skip
          </GradientHeading>
          <p className="text-lg text-white/60 mt-2">
            Select the skip size that best suits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skips.map((skip) => (
            <Card
              key={skip.id}
              onClick={() => handleSelect(skip)}
              isSelected={selectedSkip?.id === skip.id}
              className="group"
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
                  <Badge>
                    {skip.size} Yards
                  </Badge>
                </div>
                {skip.isPrivateOnly && (
                  <div className="absolute bottom-3 left-3">
                    <Badge
                      variant="warning"
                      icon={
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      }
                    >
                      Private Property Only
                    </Badge>
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
                  <span className={`text-3xl font-medium ${commonStyles.gradientText}`}>
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
            </Card>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className={commonStyles.stickyBar}>
        <div className="container mx-auto px-4 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-4xl mx-auto">
            {selectedSkip ? (
              <>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                      <TruckIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{selectedSkip.size} Yard Skip</div>
                      <div className="text-sm text-white/60">£{selectedSkip.price} per week</div>
                    </div>
                  </div>
                </div>
                <GradientButton
                  onClick={() => onSelect(selectedSkip)}
                  size="md"
                  className="flex-shrink-0 w-full sm:w-auto"
                >
                  Continue
                </GradientButton>
              </>
            ) : (
              <div className="text-sm text-white/60 text-center w-full py-2">
                Select a skip size to continue
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 
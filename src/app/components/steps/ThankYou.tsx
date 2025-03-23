'use client';

import { motion } from 'framer-motion';
import { Skip } from '../../services/skipService';
import { GradientHeading } from '../common/GradientHeading';
import { commonStyles } from '../../styles/common';

interface ThankYouProps {
  skip: Skip;
  address: {
    postcode: string;
    city: string;
  };
}

export const ThankYou = ({ skip, address }: ThankYouProps) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10">
          <div className="relative">
            <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-emerald-400 to-teal-400 flex items-center justify-center">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="text-center pt-10 sm:pt-12 space-y-2 sm:space-y-4">
              <GradientHeading size="xl">
                Thank You!
              </GradientHeading>
              <p className="text-sm sm:text-lg text-white/60">
                Your skip hire request has been confirmed
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
              <div className="bg-black/40 rounded-xl p-3 sm:p-6 border border-white/5">
                <h3 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">Order Summary</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Skip Size</span>
                    <span className="text-white font-medium">{skip.size} Yards</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Hire Period</span>
                    <span className="text-white font-medium">{skip.period} Days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Delivery Area</span>
                    <span className="text-white font-medium">{address.city}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Postcode</span>
                    <span className="text-white font-medium">{address.postcode}</span>
                  </div>
                  <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Total Price</span>
                      <span className={`text-xl sm:text-2xl font-medium ${commonStyles.gradientText}`}>
                        £{skip.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/40 rounded-xl p-3 sm:p-6 border border-emerald-400/20">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-1.5 sm:p-2 rounded-full bg-emerald-400/10">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-emerald-400 font-medium">What happens next?</p>
                    <p className="text-xs sm:text-sm text-white/60 mt-1 sm:mt-2">
                      We&apos;ll send you an email confirmation with your order details and delivery instructions. 
                      Our team will contact you shortly to arrange the delivery time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 
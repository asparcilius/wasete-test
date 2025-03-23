'use client';

import { motion } from 'framer-motion';
import { Skip } from '../services/skipService';

interface ThankYouProps {
  skip: Skip;
  address: {
    postcode: string;
    city: string;
  };
}

export const ThankYou = ({ skip, address }: ThankYouProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
      >
        <div className="relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-b from-emerald-400 to-teal-400 flex items-center justify-center">
              <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="text-center pt-12 space-y-4">
          <h1 className="text-4xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Thank You!
          </h1>
          <p className="text-lg text-white/60">
            Your skip hire request has been confirmed
          </p>
        </div>

        <div className="space-y-6 pt-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-4">Order Summary</h3>
            <div className="space-y-3">
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
              <div className="pt-3 mt-3 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Total Price</span>
                  <span className="text-2xl font-medium bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    £{skip.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-400/10 border border-emerald-400/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-emerald-400/10">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-emerald-400 font-medium">What happens next?</p>
                <p className="text-white/60 text-sm mt-2">
                  We'll send you an email confirmation with your order details and delivery instructions. 
                  Our team will contact you shortly to arrange the delivery time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 
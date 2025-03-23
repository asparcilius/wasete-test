'use client';

import { motion } from 'framer-motion';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export const SwipeIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="fixed left-4 bottom-8 z-50 pointer-events-none sm:hidden"
    >
      <motion.div
        animate={{
          x: [-8, 0, -8],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 1.5,
          repeat: 0,
          ease: "easeInOut"
        }}
        className="flex items-center gap-2 bg-emerald-400/10 backdrop-blur-sm rounded-full px-4 py-3 border border-emerald-400/20 shadow-lg shadow-emerald-400/10"
      >
        <ChevronLeftIcon className="w-5 h-5 text-emerald-400" />
        <span className="text-sm font-medium text-emerald-400">Back to waste types</span>
      </motion.div>
    </motion.div>
  );
}; 
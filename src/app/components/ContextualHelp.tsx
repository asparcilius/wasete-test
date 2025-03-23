'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ContextualHelpProps {
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const ContextualHelp = ({ title, content, position = 'top' }: ContextualHelpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-white/40 hover:text-white/60 transition-colors"
        aria-label="Help"
      >
        <QuestionMarkCircleIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div 
            className={`absolute z-50 ${positionClasses[position]} w-64 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl p-3 text-left`}
          >
            <h4 className="font-medium text-sm text-white mb-1">{title}</h4>
            <p className="text-xs text-white/70">{content}</p>
          </div>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}; 
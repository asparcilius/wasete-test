'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { LottieRefCurrentProps } from 'lottie-react';
import animationData from '../../../public/animations/animation2.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1);
    }
  }, []);

  return (
    <div className="w-full h-96 flex flex-col items-center justify-center">
      <div className="w-64 h-64">
        <Lottie lottieRef={lottieRef} animationData={animationData} loop={true} />
      </div>
      <p className="text-gray-400 mt-4">{message}</p>
    </div>
  );
}; 
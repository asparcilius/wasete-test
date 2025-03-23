'use client';

import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SwipeIndicator } from './SwipeIndicator';

interface SwipeContainerProps {
  children: React.ReactNode;
  onSwipeRight?: () => void;
  canSwipeRight?: boolean;
  canSwipeLeft?: boolean;
}

export const SwipeContainer = ({
  children,
  onSwipeRight,
  canSwipeRight = true,
  canSwipeLeft = false
}: SwipeContainerProps) => {
  const controls = useAnimation();
  const [showIndicator, setShowIndicator] = useState(true);

  // Hide indicator after 5 seconds
  useEffect(() => {
    if (canSwipeRight) {
      setShowIndicator(true);
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowIndicator(false);
    }
  }, [canSwipeRight]);

  const handleDragStart = () => {
    setShowIndicator(false);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const SWIPE_THRESHOLD = 50;
    const velocity = Math.abs(info.velocity.x);
    const offset = Math.abs(info.offset.x);

    if (velocity > 200 || offset > SWIPE_THRESHOLD) {
      if (info.offset.x > 0 && canSwipeRight && onSwipeRight) {
        controls.start({ x: 200, opacity: 0 }).then(() => {
          controls.set({ x: 0, opacity: 1 });
          onSwipeRight();
        });
      } else {
        // Animate back to original position with a spring effect
        controls.start({ 
          x: 0, 
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 30
          }
        });
      }
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  useEffect(() => {
    controls.set({ x: 0, opacity: 1 });
  }, [controls]);

  return (
    <div className="relative">
      {showIndicator && canSwipeRight && <SwipeIndicator />}
      <motion.div
        drag="x"
        dragConstraints={{ 
          left: canSwipeLeft ? -100 : 0, 
          right: canSwipeRight ? 100 : 0 
        }}
        dragElastic={{
          left: 0.1, // More resistance when swiping left (forward)
          right: 0.2  // Less resistance when swiping right (back)
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="touch-pan-y"
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}; 
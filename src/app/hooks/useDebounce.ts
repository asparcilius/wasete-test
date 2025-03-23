import { useEffect, useRef } from 'react';

type DebounceCallback = () => void;

export const useDebounce = (
  callback: DebounceCallback,
  delay: number,
  dependencies: unknown[]
) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay, ...dependencies]);
}; 
import { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function usePreviousWithCallback<T>(
  value: T,
  callback: (previousValue: T | undefined, currentValue: T) => void
): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    const previousValue = ref.current;
    ref.current = value;
    
    if (previousValue !== value) {
      callback(previousValue, value);
    }
  }, [value, callback]);

  return ref.current;
} 
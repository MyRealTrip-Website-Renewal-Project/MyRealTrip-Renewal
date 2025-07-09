import { useRef, useEffect, useCallback, RefObject } from 'react';

export function useFocus<T extends HTMLElement = HTMLElement>(): [RefObject<T>, () => void, boolean] {
  const ref = useRef<T>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const setFocus = useCallback(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    node.addEventListener('focus', handleFocus);
    node.addEventListener('blur', handleBlur);
    return () => {
      node.removeEventListener('focus', handleFocus);
      node.removeEventListener('blur', handleBlur);
    };
  }, [ref]);

  return [ref, setFocus, isFocused];
} 
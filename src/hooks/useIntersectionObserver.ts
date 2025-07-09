import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export interface UseIntersectionObserverReturn {
  ref: React.RefObject<Element | null>;
  isIntersecting: boolean;
  intersectionRatio: number;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<Element>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
    setIntersectionRatio(entry.intersectionRatio);
    setEntry(entry);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, options.root, options.rootMargin, options.threshold]);

  return {
    ref,
    isIntersecting,
    intersectionRatio,
    entry,
  };
}

// 무한 스크롤을 위한 특화된 훅
export function useInfiniteScroll(
  onLoadMore: () => void,
  options: UseIntersectionObserverOptions & {
    enabled?: boolean;
    threshold?: number;
  } = {}
) {
  const { enabled = true, threshold = 0.1, ...observerOptions } = options;
  const [isLoading, setIsLoading] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && enabled && !isLoading) {
        setIsLoading(true);
        onLoadMore();
        setIsLoading(false);
      }
    },
    [onLoadMore, enabled, isLoading]
  );

  const { ref, isIntersecting } = useIntersectionObserver({
    ...observerOptions,
    threshold,
  });

  useEffect(() => {
    if (isIntersecting && enabled && !isLoading) {
      setIsLoading(true);
      onLoadMore();
      setIsLoading(false);
    }
  }, [isIntersecting, enabled, isLoading, onLoadMore]);

  return {
    ref,
    isLoading,
    isIntersecting,
  };
} 
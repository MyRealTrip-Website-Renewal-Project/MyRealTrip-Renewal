import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAutocompleteProps<T> {
  fetchSuggestions: (input: string) => Promise<T[]>;
  onSelect?: (item: T) => void;
  initialOpen?: boolean;
}

export function useAutocomplete<T = any>({ fetchSuggestions, onSelect, initialOpen = false }: UseAutocompleteProps<T>) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [open, setOpen] = useState(initialOpen);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 닫힘
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // ESC 키로 닫힘
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // 입력값 변경 시 추천어 fetch
  useEffect(() => {
    if (!open) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    fetchSuggestions(input).then(res => {
      setSuggestions(res);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [input, open, fetchSuggestions]);

  // 아이템 선택
  const handleSelect = useCallback((item: T) => {
    setInput((item as any).name || '');
    setOpen(false);
    onSelect?.(item);
  }, [onSelect]);

  return {
    input, setInput, suggestions, open, setOpen, loading, ref, handleSelect
  };
} 
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('delay 후에 값이 반영된다', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 500 },
    });
    expect(result.current).toBe('a');

    rerender({ value: 'b', delay: 500 });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('b');
  });
}); 
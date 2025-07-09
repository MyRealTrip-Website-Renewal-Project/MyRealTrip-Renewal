import { renderHook, act } from '@testing-library/react';
import { useThrottle } from './useThrottle';

jest.useFakeTimers();

describe('useThrottle', () => {
  it('delay 내에는 값이 반영되지 않는다', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useThrottle(value, delay), {
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
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('초기값을 반환한다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('값을 저장하고 불러온다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    act(() => {
      result.current[1]('new-value');
    });
    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('값을 함수로 업데이트한다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 1));
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(2);
  });

  it('값을 삭제하면 초기값으로 돌아간다', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'init'));
    act(() => {
      result.current[1]('changed');
    });
    expect(result.current[0]).toBe('changed');
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe('init');
    expect(localStorage.getItem('test-key')).toBeNull();
  });
}); 
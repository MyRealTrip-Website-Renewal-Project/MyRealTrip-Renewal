import React from 'react';
import dropdownStyles from '../../styles/Dropdown.module.css';

interface AutoCompleteDropdownProps<T> {
  open: boolean;
  loading: boolean;
  suggestions: T[];
  onSelect: (item: T) => void;
  renderItem: (item: T, idx: number) => React.ReactNode;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  dropdownClassName?: string;
}

export function AutoCompleteDropdown<T = any>({
  open,
  loading,
  suggestions,
  onSelect,
  renderItem,
  inputProps,
  containerRef,
  className = '',
  dropdownClassName = '',
}: AutoCompleteDropdownProps<T>) {
  const showPopularTitle = !inputProps.value;
  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, width: '100%' }}>
        <input {...inputProps} style={{ ...(inputProps.style || {}), flex: 1, minWidth: 0, width: '100%' }} />
        {/* 검색 버튼은 부모에서 직접 렌더링하므로 이곳엔 없음 */}
      </div>
      {open && (
        <div className={dropdownStyles.dropdownWrap + (dropdownClassName ? ' ' + dropdownClassName : '')}>
          {showPopularTitle && (
            <div className={dropdownStyles.dropdownTitle}>인기 여행지</div>
          )}
          {loading ? (
            <div style={{ padding: '10px 18px', textAlign: 'center', color: '#666' }}>검색 중...</div>
          ) : (
            suggestions.map((item, i) => (
              <div key={i} className={dropdownStyles.dropdownItem} onMouseDown={() => onSelect(item)}>
                {renderItem(item, i)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
} 
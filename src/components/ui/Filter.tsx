import React, { useState, useCallback, useMemo } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch, FiFilter, FiX, FiCalendar, FiDollarSign, FiStar, FiMapPin } from 'react-icons/fi';
import styles from './Filter.module.scss';

export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  count?: number;
  disabled?: boolean;
}

export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'range' | 'slider' | 'date-range' | 'search';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

export interface FilterValue {
  [sectionId: string]: string | string[] | number | number[] | { min: number; max: number } | null;
}

export interface FilterProps {
  title: string;
  sections: FilterSection[];
  value?: FilterValue;
  onChange?: (value: FilterValue) => void;
  onApply?: (value: FilterValue) => void;
  onClear?: () => void;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  defaultExpanded?: boolean;
  showCount?: boolean;
  maxHeight?: string;
}

const Filter: React.FC<FilterProps> = ({
  title,
  sections,
  value = {},
  onChange,
  onApply,
  onClear,
  loading = false,
  error,
  disabled = false,
  className = '',
  defaultExpanded = false,
  showCount = true,
  maxHeight = '500px'
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [localValue, setLocalValue] = useState<FilterValue>(value);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 값이 외부에서 변경되면 로컬 상태도 업데이트
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setExpanded(!expanded);
    }
  }, [expanded, disabled]);

  const handleOptionChange = useCallback((sectionId: string, optionValue: string | number, checked: boolean) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const newValue = { ...localValue };
    
    if (section.type === 'checkbox') {
      const currentValues = Array.isArray(newValue[sectionId]) 
        ? newValue[sectionId] as string[] 
        : [];
      
      if (checked) {
        newValue[sectionId] = [...currentValues, optionValue.toString()];
      } else {
        newValue[sectionId] = currentValues.filter(v => v !== optionValue.toString());
      }
    } else if (section.type === 'radio') {
      newValue[sectionId] = optionValue.toString();
    }

    setLocalValue(newValue);
    onChange?.(newValue);
  }, [localValue, sections, onChange]);

  const handleRangeChange = useCallback((sectionId: string, min: number, max: number) => {
    const newValue = { ...localValue };
    newValue[sectionId] = { min, max };
    setLocalValue(newValue);
    onChange?.(newValue);
  }, [localValue, onChange]);

  const handleSliderChange = useCallback((sectionId: string, value: number) => {
    const newValue = { ...localValue };
    newValue[sectionId] = value;
    setLocalValue(newValue);
    onChange?.(newValue);
  }, [localValue, onChange]);

  const handleDateChange = useCallback((sectionId: string, startDate: string, endDate: string) => {
    const newValue = { ...localValue };
    newValue[sectionId] = { startDate, endDate };
    setLocalValue(newValue);
    onChange?.(newValue);
  }, [localValue, onChange]);

  const handleSearchChange = useCallback((sectionId: string, searchTerm: string) => {
    const newValue = { ...localValue };
    newValue[sectionId] = searchTerm;
    setLocalValue(newValue);
    onChange?.(newValue);
  }, [localValue, onChange]);

  const handleApply = useCallback(() => {
    // 유효성 검사
    const newErrors: Record<string, string> = {};
    
    sections.forEach(section => {
      if (section.required && !localValue[section.id]) {
        newErrors[section.id] = '이 필드는 필수입니다.';
        return;
      }

      if (section.validation) {
        const value = localValue[section.id];
        
        if (section.validation.min && typeof value === 'number' && value < section.validation.min) {
          newErrors[section.id] = `최소값은 ${section.validation.min}입니다.`;
        }
        
        if (section.validation.max && typeof value === 'number' && value > section.validation.max) {
          newErrors[section.id] = `최대값은 ${section.validation.max}입니다.`;
        }
        
        if (section.validation.pattern && typeof value === 'string' && !section.validation.pattern.test(value)) {
          newErrors[section.id] = section.validation.message || '형식이 올바르지 않습니다.';
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onApply?.(localValue);
    }
  }, [localValue, sections, onApply]);

  const handleClear = useCallback(() => {
    const clearedValue: FilterValue = {};
    sections.forEach(section => {
      clearedValue[section.id] = null;
    });
    
    setLocalValue(clearedValue);
    setErrors({});
    onClear?.();
    onChange?.(clearedValue);
  }, [sections, onClear, onChange]);

  const selectedCount = useMemo(() => {
    return Object.values(localValue).filter(v => 
      v !== null && v !== undefined && 
      (typeof v === 'string' ? v !== '' : Array.isArray(v) ? v.length > 0 : true)
    ).length;
  }, [localValue]);

  const renderSection = useCallback((section: FilterSection) => {
    const sectionValue = localValue[section.id];
    const sectionError = errors[section.id];

    switch (section.type) {
      case 'checkbox':
        return (
          <div key={section.id} className={styles.filter__section}>
            <h4 className={styles.filter__section_title}>
              {section.icon && <span className={styles.filter__section_icon}>{section.icon}</span>}
              {section.title}
            </h4>
            <div className={styles.filter__options}>
              {section.options?.map(option => {
                const isSelected = Array.isArray(sectionValue) 
                  ? sectionValue.includes(option.value.toString())
                  : false;
                
                return (
                  <label 
                    key={option.id} 
                    className={`${styles.filter__option} ${isSelected ? styles['filter__option--selected'] : ''}`}
                  >
                    <input
                      type="checkbox"
                      className={styles.filter__option_input}
                      checked={isSelected}
                      onChange={(e) => handleOptionChange(section.id, option.value, e.target.checked)}
                      disabled={option.disabled || disabled}
                    />
                    <span className={styles.filter__option_label}>{option.label}</span>
                    {showCount && option.count !== undefined && (
                      <span className={styles.filter__option_count}>{option.count}</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        );

      case 'radio':
        return (
          <div key={section.id} className={styles.filter__section}>
            <h4 className={styles.filter__section_title}>
              {section.icon && <span className={styles.filter__section_icon}>{section.icon}</span>}
              {section.title}
            </h4>
            <div className={styles.filter__options}>
              {section.options?.map(option => {
                const isSelected = sectionValue === option.value.toString();
                
                return (
                  <label 
                    key={option.id} 
                    className={`${styles.filter__option} ${isSelected ? styles['filter__option--selected'] : ''}`}
                  >
                    <input
                      type="radio"
                      name={section.id}
                      className={styles.filter__option_input}
                      checked={isSelected}
                      onChange={(e) => handleOptionChange(section.id, option.value, e.target.checked)}
                      disabled={option.disabled || disabled}
                    />
                    <span className={styles.filter__option_label}>{option.label}</span>
                    {showCount && option.count !== undefined && (
                      <span className={styles.filter__option_count}>{option.count}</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        );

      case 'range':
        return (
          <div key={section.id} className={styles.filter__section}>
            <h4 className={styles.filter__section_title}>
              {section.icon && <span className={styles.filter__section_icon}>{section.icon}</span>}
              {section.title}
            </h4>
            <div className={styles.filter__range}>
              <div className={styles.filter__range_inputs}>
                <input
                  type="number"
                  className={`${styles.filter__range_input} ${sectionError ? styles['filter__range-input--error'] : ''}`}
                  placeholder={section.placeholder || '최소값'}
                  min={section.min}
                  max={section.max}
                  step={section.step}
                  value={typeof sectionValue === 'object' && sectionValue ? (sectionValue as any).min || '' : ''}
                  onChange={(e) => {
                    const min = parseFloat(e.target.value) || 0;
                    const max = typeof sectionValue === 'object' && sectionValue ? (sectionValue as any).max || min : min;
                    handleRangeChange(section.id, min, max);
                  }}
                  disabled={disabled}
                />
                <span className={styles.filter__range_separator}>~</span>
                <input
                  type="number"
                  className={`${styles.filter__range_input} ${sectionError ? styles['filter__range-input--error'] : ''}`}
                  placeholder={section.placeholder || '최대값'}
                  min={section.min}
                  max={section.max}
                  step={section.step}
                  value={typeof sectionValue === 'object' && sectionValue ? (sectionValue as any).max || '' : ''}
                  onChange={(e) => {
                    const max = parseFloat(e.target.value) || 0;
                    const min = typeof sectionValue === 'object' && sectionValue ? (sectionValue as any).min || max : max;
                    handleRangeChange(section.id, min, max);
                  }}
                  disabled={disabled}
                />
              </div>
              {sectionError && <div className={styles.filter__error}>{sectionError}</div>}
            </div>
          </div>
        );

      case 'slider':
        return (
          <div key={section.id} className={styles.filter__section}>
            <h4 className={styles.filter__section_title}>
              {section.icon && <span className={styles.filter__section_icon}>{section.icon}</span>}
              {section.title}
            </h4>
            <div className={styles.filter__slider}>
              <input
                type="range"
                min={section.min}
                max={section.max}
                step={section.step}
                value={typeof sectionValue === 'number' ? sectionValue : section.min || 0}
                onChange={(e) => handleSliderChange(section.id, parseFloat(e.target.value))}
                disabled={disabled}
                className={styles.filter__slider_track}
              />
              <div className={styles.filter__slider_fill} />
              <div className={styles.filter__slider_thumb} />
            </div>
            {sectionError && <div className={styles.filter__error}>{sectionError}</div>}
          </div>
        );

      case 'date-range':
        return (
          <div key={section.id} className={styles.filter__section}>
            <h4 className={styles.filter__section_title}>
              {section.icon && <span className={styles.filter__section_icon}>{section.icon}</span>}
              {section.title}
            </h4>
            <div className={styles.filter__date_range}>
              <input
                type="date"
                className={styles.filter__date_input}
                value={typeof sectionValue === 'object' && sectionValue ? (sectionValue as any).startDate || '' : ''}
                onChange={(e) => {
                  const startDate = e.target.value;
                  const endDate = typeof sectionValue === 'object' && sectionValue ? (sectionValue as any).endDate || startDate : startDate;
                  handleDateChange(section.id, startDate, endDate);
                }}
                disabled={disabled}
              />
              <input
                type="date"
                className={styles.filter__date_input}
                value={typeof sectionValue === 'object' && sectionValue ? (sectionValue as any).endDate || '' : ''}
                onChange={(e) => {
                  const endDate = e.target.value;
                  const startDate = typeof sectionValue === 'object' && sectionValue ? (sectionValue as any).startDate || endDate : endDate;
                  handleDateChange(section.id, startDate, endDate);
                }}
                disabled={disabled}
              />
            </div>
            {sectionError && <div className={styles.filter__error}>{sectionError}</div>}
          </div>
        );

      case 'search':
        return (
          <div key={section.id} className={styles.filter__section}>
            <h4 className={styles.filter__section_title}>
              {section.icon && <span className={styles.filter__section_icon}>{section.icon}</span>}
              {section.title}
            </h4>
            <div className={styles.filter__search}>
              <input
                type="text"
                className={styles.filter__search_input}
                placeholder={section.placeholder || '검색어를 입력하세요'}
                value={typeof sectionValue === 'string' ? sectionValue : ''}
                onChange={(e) => handleSearchChange(section.id, e.target.value)}
                disabled={disabled}
              />
            </div>
            {sectionError && <div className={styles.filter__error}>{sectionError}</div>}
          </div>
        );

      default:
        return null;
    }
  }, [localValue, errors, disabled, showCount, handleOptionChange, handleRangeChange, handleSliderChange, handleDateChange, handleSearchChange]);

  if (loading) {
    return (
      <div className={`${styles.filter} ${className}`}>
        <div className={styles.filter__loading}>
          <FiSearch className="animate-spin" />
          <span>필터를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.filter} ${expanded ? styles['filter--expanded'] : ''} ${className}`}>
      <div className={styles.filter__header} onClick={handleToggle}>
        <h3 className={styles.filter__title}>{title}</h3>
        <div className={styles.filter__toggle}>
          <span>{selectedCount > 0 ? `${selectedCount}개 선택됨` : '필터'}</span>
          <FiChevronDown 
            className={`${styles.filter__toggle_icon} ${expanded ? styles['filter__toggle-icon--expanded'] : ''}`}
          />
        </div>
      </div>

      <div 
        className={`${styles.filter__content} ${expanded ? styles['filter__content--expanded'] : ''}`}
        style={{ maxHeight: expanded ? maxHeight : '0' }}
      >
        <div className={styles.filter__body}>
          {error && <div className={styles.filter__error}>{error}</div>}
          
          {sections.length === 0 ? (
            <div className={styles.filter__empty}>필터 옵션이 없습니다.</div>
          ) : (
            sections.map(renderSection)
          )}
        </div>

        <div className={styles.filter__footer}>
          <div className={styles.filter__actions}>
            <button
              type="button"
              className={`${styles.filter__button} ${styles['filter__button--primary']}`}
              onClick={handleApply}
              disabled={disabled || Object.keys(errors).length > 0}
            >
              적용
            </button>
            <button
              type="button"
              className={`${styles.filter__button} ${styles['filter__button--secondary']}`}
              onClick={handleClear}
              disabled={disabled}
            >
              초기화
            </button>
          </div>
          
          {selectedCount > 0 && (
            <button
              type="button"
              className={styles.filter__clear}
              onClick={handleClear}
              disabled={disabled}
            >
              모두 지우기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter; 
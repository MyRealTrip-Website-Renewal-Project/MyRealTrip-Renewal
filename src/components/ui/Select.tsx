import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/ui/Select.module.scss';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  error?: boolean;
  helperText?: string;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  multiple = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  error = false,
  helperText,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    multiple 
      ? Array.isArray(value) ? value : value ? [value] : []
      : value ? [value] : []
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (multiple) {
      setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
    } else {
      setSelectedValues(value ? [value] : []);
    }
  }, [value, multiple]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return;

    let newValues: (string | number)[];
    
    if (multiple) {
      if (selectedValues.includes(option.value)) {
        newValues = selectedValues.filter(v => v !== option.value);
      } else {
        newValues = [...selectedValues, option.value];
      }
    } else {
      newValues = [option.value];
      setIsOpen(false);
    }

    setSelectedValues(newValues);
    onChange?.(multiple ? newValues : newValues[0]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleToggle();
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  const getDisplayValue = () => {
    if (selectedValues.length === 0) return placeholder;
    
    if (multiple) {
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || placeholder;
      }
      return `${selectedValues.length}개 선택됨`;
    }
    
    const option = options.find(opt => opt.value === selectedValues[0]);
    return option?.label || placeholder;
  };

  const selectClasses = [
    styles.select,
    styles[`select--${size}`],
    styles[`select--${variant}`],
    isOpen && styles.selectOpen,
    disabled && styles.selectDisabled,
    error && styles.selectError,
    className,
  ].filter(Boolean).join(' ');

  const triggerClasses = [
    styles.selectTrigger,
    styles[`selectTrigger--${size}`],
    styles[`selectTrigger--${variant}`],
    isOpen && styles.selectTriggerOpen,
    disabled && styles.selectTriggerDisabled,
    error && styles.selectTriggerError,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      <div className={selectClasses} style={style}>
        <div
          className={triggerClasses}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-describedby={helperText ? `${ariaLabel}-helper` : undefined}
        >
          <span className={styles.selectValue}>{getDisplayValue()}</span>
          <span className={styles.selectArrow}>▼</span>
        </div>
        
        {isOpen && (
          <div className={styles.selectDropdown}>
            <ul
              className={styles.selectOptions}
              role="listbox"
              aria-multiselectable={multiple}
            >
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                const optionClasses = [
                  styles.selectOption,
                  isSelected && styles.selectOptionSelected,
                  option.disabled && styles.selectOptionDisabled,
                ].filter(Boolean).join(' ');

                return (
                  <li
                    key={option.value}
                    className={optionClasses}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        disabled={option.disabled}
                        className={styles.selectCheckbox}
                      />
                    )}
                    {option.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      
      {helperText && (
        <div 
          id={`${ariaLabel}-helper`}
          className={`${styles.selectHelperText} ${error ? styles.selectHelperTextError : ''}`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}; 
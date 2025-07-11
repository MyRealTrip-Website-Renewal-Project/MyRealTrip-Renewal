import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from '@/styles/ui/Menu.module.scss';

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
  shortcut?: string;
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  trigger?: 'click' | 'hover';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  showIcons?: boolean;
  showShortcuts?: boolean;
  maxHeight?: string | number;
  onItemClick?: (key: string, item: MenuItem) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  'aria-label'?: string;
}

export const Menu: React.FC<MenuProps> = ({
  items,
  trigger = 'click',
  placement = 'bottom',
  size = 'md',
  variant = 'default',
  showIcons = true,
  showShortcuts = true,
  maxHeight = '300px',
  onItemClick,
  className = '',
  style,
  children,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // ESC 키 감지
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // 트리거 이벤트 처리
  const handleTriggerClick = useCallback(() => {
    if (trigger === 'click') {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setActiveSubmenu(null);
      }
    }
  }, [trigger, isOpen]);

  const handleTriggerMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      setIsOpen(true);
    }
  }, [trigger]);

  const handleTriggerMouseLeave = useCallback(() => {
    if (trigger === 'hover') {
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  }, [trigger]);

  // 메뉴 아이템 클릭 처리
  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.disabled) return;

    if (item.children && item.children.length > 0) {
      // 서브메뉴가 있는 경우
      setActiveSubmenu(activeSubmenu === item.key ? null : item.key);
    } else {
      // 일반 메뉴 아이템인 경우
      setIsOpen(false);
      setActiveSubmenu(null);
      item.onClick?.();
      onItemClick?.(item.key, item);
    }
  }, [activeSubmenu, onItemClick]);

  // 메뉴 아이템 렌더링
  const renderMenuItem = (item: MenuItem, level: number = 0): React.ReactNode => {
    if (item.divider) {
      return <div key={item.key} className={styles.menuDivider} />;
    }

    const hasSubmenu = item.children && item.children.length > 0;
    const isSubmenuOpen = activeSubmenu === item.key;

    const itemClasses = [
      styles.menuItem,
      styles[`menuItem--${size}`],
      styles[`menuItem--${variant}`],
      item.disabled && styles.menuItemDisabled,
      hasSubmenu && styles.menuItemHasSubmenu,
      isSubmenuOpen && styles.menuItemSubmenuOpen,
    ].filter(Boolean).join(' ');

    const contentClasses = [
      styles.menuItemContent,
      styles[`menuItemContent--${size}`],
    ].filter(Boolean).join(' ');

    const indentStyle = {
      paddingLeft: `${level * 20 + 12}px`,
    };

    return (
      <div key={item.key} className={styles.menuItemContainer}>
        <div
          className={itemClasses}
          style={indentStyle}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => {
            if (trigger === 'hover' && hasSubmenu) {
              setActiveSubmenu(item.key);
            }
          }}
          onMouseLeave={() => {
            if (trigger === 'hover' && hasSubmenu) {
              setActiveSubmenu(null);
            }
          }}
          role="menuitem"
          aria-disabled={item.disabled}
          aria-haspopup={hasSubmenu}
          aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
          tabIndex={item.disabled ? -1 : 0}
        >
          <div className={contentClasses}>
            {showIcons && item.icon && (
              <div className={styles.menuItemIcon}>
                {item.icon}
              </div>
            )}
            
            <div className={styles.menuItemLabel}>
              {item.label}
            </div>
            
            {showShortcuts && item.shortcut && (
              <div className={styles.menuItemShortcut}>
                {item.shortcut}
              </div>
            )}
            
            {hasSubmenu && (
              <div className={styles.menuItemArrow}>
                {isSubmenuOpen ? '◀' : '▶'}
              </div>
            )}
          </div>
        </div>
        
        {hasSubmenu && isSubmenuOpen && (
          <div className={styles.submenu}>
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // 메뉴 클래스
  const menuClasses = [
    styles.menu,
    styles[`menu--${size}`],
    styles[`menu--${variant}`],
    styles[`menu--${placement}`],
    className,
  ].filter(Boolean).join(' ');

  // 트리거 클래스
  const triggerClasses = [
    styles.menuTrigger,
    styles[`menuTrigger--${size}`],
    styles[`menuTrigger--${variant}`],
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.menuContainer}>
      <div
        ref={triggerRef}
        className={triggerClasses}
        onClick={handleTriggerClick}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={ariaLabel || '메뉴'}
      >
        {children}
      </div>
      
      {isOpen && (
        <div
          ref={menuRef}
          className={menuClasses}
          style={{
            ...style,
            maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
          }}
          role="menu"
          aria-label={ariaLabel || '메뉴'}
        >
          {items.map(item => renderMenuItem(item))}
        </div>
      )}
    </div>
  );
}; 
import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from '@/styles/ui/Tabs.module.scss';

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  type?: 'line' | 'card' | 'segment';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  position?: 'top' | 'bottom' | 'left' | 'right';
  showIcons?: boolean;
  closable?: boolean;
  addable?: boolean;
  animated?: boolean;
  onTabChange?: (activeKey: string) => void;
  onTabClose?: (key: string) => void;
  onTabAdd?: () => void;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  type = 'line',
  size = 'md',
  variant = 'default',
  position = 'top',
  showIcons = true,
  closable = false,
  addable = false,
  animated = true,
  onTabChange,
  onTabClose,
  onTabAdd,
  className = '',
  style,
  'aria-label': ariaLabel,
}) => {
  const [activeKey, setActiveKey] = useState(controlledActiveKey || defaultActiveKey || items[0]?.key || '');
  const [tabs, setTabs] = useState(items);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // 제어된 activeKey가 변경되면 업데이트
  useEffect(() => {
    if (controlledActiveKey !== undefined) {
      setActiveKey(controlledActiveKey);
    }
  }, [controlledActiveKey]);

  // items가 변경되면 업데이트
  useEffect(() => {
    setTabs(items);
    if (!items.find(item => item.key === activeKey)) {
      setActiveKey(items[0]?.key || '');
    }
  }, [items, activeKey]);

  // 탭 변경 처리
  const handleTabChange = useCallback((key: string) => {
    if (controlledActiveKey === undefined) {
      setActiveKey(key);
    }
    onTabChange?.(key);
  }, [controlledActiveKey, onTabChange]);

  // 탭 닫기 처리
  const handleTabClose = useCallback((key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const newTabs = tabs.filter(tab => tab.key !== key);
    setTabs(newTabs);
    
    // 닫힌 탭이 현재 활성 탭이었다면 첫 번째 탭으로 이동
    if (key === activeKey && newTabs.length > 0) {
      const newActiveKey = newTabs[0].key;
      handleTabChange(newActiveKey);
    }
    
    onTabClose?.(key);
  }, [tabs, activeKey, handleTabChange, onTabClose]);

  // 탭 추가 처리
  const handleTabAdd = useCallback(() => {
    onTabAdd?.();
  }, [onTabAdd]);

  // 키보드 네비게이션
  const handleKeyDown = useCallback((event: React.KeyboardEvent, key: string) => {
    const currentIndex = tabs.findIndex(tab => tab.key === key);
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (position === 'top' || position === 'bottom') {
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          const prevTab = tabs[prevIndex];
          if (prevTab && !prevTab.disabled) {
            handleTabChange(prevTab.key);
            tabRefs.current.get(prevTab.key)?.focus();
          }
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (position === 'top' || position === 'bottom') {
          const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          const nextTab = tabs[nextIndex];
          if (nextTab && !nextTab.disabled) {
            handleTabChange(nextTab.key);
            tabRefs.current.get(nextTab.key)?.focus();
          }
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (position === 'left' || position === 'right') {
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          const prevTab = tabs[prevIndex];
          if (prevTab && !prevTab.disabled) {
            handleTabChange(prevTab.key);
            tabRefs.current.get(prevTab.key)?.focus();
          }
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (position === 'left' || position === 'right') {
          const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          const nextTab = tabs[nextIndex];
          if (nextTab && !nextTab.disabled) {
            handleTabChange(nextTab.key);
            tabRefs.current.get(nextTab.key)?.focus();
          }
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleTabChange(key);
        break;
    }
  }, [tabs, position, handleTabChange]);

  // 탭 렌더링
  const renderTab = (tab: TabItem, index: number) => {
    const isActive = tab.key === activeKey;
    const isDisabled = tab.disabled;
    const canClose = closable && (tab.closable !== false);

    const tabClasses = [
      styles.tab,
      styles[`tab--${size}`],
      styles[`tab--${type}`],
      styles[`tab--${variant}`],
      styles[`tab--${position}`],
      isActive && styles.tabActive,
      isDisabled && styles.tabDisabled,
    ].filter(Boolean).join(' ');

    const contentClasses = [
      styles.tabContent,
      styles[`tabContent--${size}`],
    ].filter(Boolean).join(' ');

    return (
      <button
        key={tab.key}
        ref={(el) => {
          if (el) tabRefs.current.set(tab.key, el);
        }}
        className={tabClasses}
        onClick={() => !isDisabled && handleTabChange(tab.key)}
        onKeyDown={(e) => handleKeyDown(e, tab.key)}
        disabled={isDisabled}
        role="tab"
        aria-selected={isActive}
        aria-disabled={isDisabled}
        tabIndex={isActive ? 0 : -1}
        aria-label={tab.label}
      >
        <div className={contentClasses}>
          {showIcons && tab.icon && (
            <div className={styles.tabIcon}>
              {tab.icon}
            </div>
          )}
          
          <div className={styles.tabLabel}>
            {tab.label}
          </div>
          
          {canClose && (
            <button
              type="button"
              className={styles.tabClose}
              onClick={(e) => handleTabClose(tab.key, e)}
              aria-label={`${tab.label} 닫기`}
            >
              ×
            </button>
          )}
        </div>
      </button>
    );
  };

  // 탭 패널 렌더링
  const renderTabPanel = (tab: TabItem) => {
    const isActive = tab.key === activeKey;

    const panelClasses = [
      styles.tabPanel,
      styles[`tabPanel--${size}`],
      isActive && styles.tabPanelActive,
      animated && styles.tabPanelAnimated,
    ].filter(Boolean).join(' ');

    return (
      <div
        key={tab.key}
        className={panelClasses}
        role="tabpanel"
        aria-labelledby={`tab-${tab.key}`}
        hidden={!isActive}
      >
        {isActive && tab.content}
      </div>
    );
  };

  // 탭스 컨테이너 클래스
  const tabsClasses = [
    styles.tabs,
    styles[`tabs--${type}`],
    styles[`tabs--${size}`],
    styles[`tabs--${variant}`],
    styles[`tabs--${position}`],
    className,
  ].filter(Boolean).join(' ');

  // 탭 리스트 클래스
  const tabListClasses = [
    styles.tabList,
    styles[`tabList--${type}`],
    styles[`tabList--${size}`],
    styles[`tabList--${variant}`],
    styles[`tabList--${position}`],
  ].filter(Boolean).join(' ');

  return (
    <div
      className={tabsClasses}
      style={style}
      role="tablist"
      aria-label={ariaLabel || '탭 목록'}
    >
      <div ref={tabsContainerRef} className={tabListClasses}>
        {tabs.map((tab, index) => renderTab(tab, index))}
        
        {addable && (
          <button
            type="button"
            className={styles.tabAdd}
            onClick={handleTabAdd}
            aria-label="탭 추가"
          >
            +
          </button>
        )}
      </div>
      
      <div className={styles.tabPanels}>
        {tabs.map(tab => renderTabPanel(tab))}
      </div>
    </div>
  );
}; 
import React, { useState, ReactNode } from 'react';
import styles from './Accordion.module.scss';

export interface AccordionItemProps {
  /** 아이템 제목 */
  title: string;
  /** 아이템 내용 */
  content: ReactNode;
  /** 기본적으로 열려있는지 여부 */
  defaultOpen?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
}

export interface AccordionProps {
  /** 아코디언 아이템들 */
  items: AccordionItemProps[];
  /** 아코디언 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 아코디언 테마 */
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** 여러 아이템을 동시에 열 수 있는지 여부 */
  allowMultiple?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
  /** 아이템 열림/닫힘 상태 변경 콜백 */
  onItemToggle?: (index: number, isOpen: boolean) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  size = 'md',
  theme = 'default',
  allowMultiple = false,
  className = '',
  onItemToggle
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    const initialOpen = new Set<number>();
    items.forEach((item, index) => {
      if (item.defaultOpen) {
        initialOpen.add(index);
      }
    });
    return initialOpen;
  });

  const toggleItem = (index: number) => {
    if (items[index].disabled) return;

    const newOpenItems = new Set(openItems);
    
    if (allowMultiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
    } else {
      newOpenItems.clear();
      if (!newOpenItems.has(index)) {
        newOpenItems.add(index);
      }
    }
    
    setOpenItems(newOpenItems);
    onItemToggle?.(index, newOpenItems.has(index));
  };

  const getAccordionClasses = () => {
    const classes = [
      styles.accordion,
      styles[size],
      theme !== 'default' && styles[theme],
      className
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getItemClasses = (index: number) => {
    const classes = [
      styles.accordionItem,
      items[index].disabled && styles.disabled,
      items[index].className
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getHeaderClasses = (index: number) => {
    const classes = [
      styles.accordionHeader,
      openItems.has(index) && styles.active
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getIconClasses = (index: number) => {
    const classes = [
      styles.accordionIcon,
      openItems.has(index) && styles.active
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  const getContentClasses = (index: number) => {
    const classes = [
      styles.accordionContent,
      openItems.has(index) && styles.active
    ].filter(Boolean);
    
    return classes.join(' ');
  };

  return (
    <div className={getAccordionClasses()}>
      {items.map((item, index) => (
        <div key={index} className={getItemClasses(index)}>
          <button
            className={getHeaderClasses(index)}
            onClick={() => toggleItem(index)}
            disabled={item.disabled}
            aria-expanded={openItems.has(index)}
            aria-controls={`accordion-content-${index}`}
          >
            <h3 className={styles.accordionTitle}>{item.title}</h3>
            <div className={getIconClasses(index)}>
              <svg
                className={`${styles.chevronIcon} ${openItems.has(index) ? styles.active : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </div>
          </button>
          <div
            id={`accordion-content-${index}`}
            className={getContentClasses(index)}
            aria-hidden={!openItems.has(index)}
          >
            <div className={styles.accordionBody}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion; 
import React, { useState } from 'react';
import styles from '@/styles/ui/Accordion.module.scss';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultOpen?: string | string[];
  collapsible?: boolean;
  className?: string;
  onToggle?: (id: string, isOpen: boolean) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultOpen,
  collapsible = true,
  className = '',
  onToggle,
}) => {
  const getInitialOpenState = () => {
    if (!defaultOpen) return new Set<string>();
    
    if (type === 'single') {
      return new Set(typeof defaultOpen === 'string' ? [defaultOpen] : [defaultOpen[0]]);
    }
    
    return new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]);
  };

  const [openItems, setOpenItems] = useState<Set<string>>(getInitialOpenState());

  const handleToggle = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item?.disabled) return;

    const newOpenItems = new Set(openItems);
    const isCurrentlyOpen = newOpenItems.has(id);

    if (type === 'single') {
      newOpenItems.clear();
      if (!isCurrentlyOpen) {
        newOpenItems.add(id);
      }
    } else {
      if (isCurrentlyOpen) {
        if (collapsible || newOpenItems.size > 1) {
          newOpenItems.delete(id);
        }
      } else {
        newOpenItems.add(id);
      }
    }

    setOpenItems(newOpenItems);
    onToggle?.(id, !isCurrentlyOpen);
  };

  const isOpen = (id: string) => openItems.has(id);

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`${styles.accordionItem} ${item.disabled ? styles.accordionItemDisabled : ''}`}
        >
          <button
            className={`${styles.accordionTrigger} ${isOpen(item.id) ? styles.accordionTriggerOpen : ''}`}
            onClick={() => handleToggle(item.id)}
            disabled={item.disabled}
            aria-expanded={isOpen(item.id)}
            aria-controls={`accordion-content-${item.id}`}
            aria-disabled={item.disabled}
          >
            <span className={styles.accordionTitle}>{item.title}</span>
            <span className={`${styles.accordionIcon} ${isOpen(item.id) ? styles.accordionIconOpen : ''}`}>
              ▼
            </span>
          </button>
          
          <div
            id={`accordion-content-${item.id}`}
            className={`${styles.accordionContent} ${isOpen(item.id) ? styles.accordionContentOpen : ''}`}
            aria-hidden={!isOpen(item.id)}
          >
            <div className={styles.accordionContentInner}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 
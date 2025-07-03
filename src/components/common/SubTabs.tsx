import React, { useState, useCallback } from 'react';
import styles from './SubTabs.module.css';
import type { SubTab } from '../../types/subtab';

interface SubTabsProps {
  subTabs: SubTab[];
}

const SubTabs = React.memo(function SubTabs({ subTabs }: SubTabsProps) {
  const [activeTab, setActiveTab] = useState(subTabs.find(tab => tab.active)?.label || subTabs[0]?.label);

  const handleTabClick = useCallback((label: string) => {
    setActiveTab(label);
  }, []);

  return (
    <div className={styles.subTabsContainer}>
      <ul className={styles.subTabsList}>
        {subTabs.map((tab, index) => (
          <li key={index} className={styles.subTabItem}>
            <button
              className={`${styles.subTabButton} ${activeTab === tab.label ? styles.active : ''}`}
              onClick={() => handleTabClick(tab.label)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SubTabs; 
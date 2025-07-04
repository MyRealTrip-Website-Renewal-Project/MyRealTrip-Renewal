import React from 'react';
import styles from './CityTab.module.css';

export interface CityTabProps {
  name: string;
  selected: boolean;
  onClick: () => void;
  tabIndex?: number;
  role?: string;
}

const CityTab: React.FC<CityTabProps> = ({ name, selected, onClick, tabIndex, role = 'tab' }) => (
  <button
    className={selected ? styles.active : styles.tab}
    onClick={onClick}
    type="button"
    aria-selected={selected}
    tabIndex={tabIndex ?? (selected ? 0 : -1)}
    role={role}
    aria-label={name}
  >
    {name}
  </button>
);
export default CityTab; 
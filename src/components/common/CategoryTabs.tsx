import React from 'react';
import styles from './CategoryTabs.module.css';
import type { Category } from '../../types/category';

interface CategoryTabsProps {
  categories: Category[];
}

const CategoryTabs = React.memo(function CategoryTabs({ categories }: CategoryTabsProps) {
  return (
    <div className={styles.categoryTabsContainer}>
      <ul className={styles.categoryTabsList}>
        {categories.map((category, index) => (
          <li key={index} className={styles.categoryTabItem}>
            <button
              className={
                category.selected
                  ? `${styles.categoryTabButton} ${styles.active}`
                  : styles.categoryTabButton
              }
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryLabel}>{category.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default CategoryTabs; 
'use client'

import styles from './SidebarFilters.module.css';

interface SidebarFiltersProps {
  categories: { id: string; label: string }[];
  activeCategory: string | null;
  onCategoryChange: (id: string) => void;
}

export default function SidebarFilters({ 
  categories,
  activeCategory,
  onCategoryChange
}: SidebarFiltersProps) {

  return (
    <div className={styles['sf-section']}>
      <h3 className="sub-header">Food Categories</h3>
      <div className={styles['sf-cat-list']}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`${styles['sf-cat-btn']} ${isActive ? styles['sf-cat-active'] : ''}`}
            >
              <span>{cat.label}</span>
              {isActive && (
                <div className={styles['sf-checkmark']} aria-hidden="true" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
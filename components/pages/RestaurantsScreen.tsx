'use client'

import React, { useState } from 'react'
import Logo from '../common/Logo'
import FoodCategoryCard from '../common/FoodCategoryCard'
import RestaurantCard from '../common/RestaurantCard'
import SidebarFilters from '../common/SidebarFilters'
import ErrorMessage from '../common/ErrorMessage'
import { useFilters } from '@/hooks/useFilters'
import { useRestaurants } from '@/hooks/useRestaurants'
import { API_BASE_URL } from '@/lib/api-client'
import styles from './RestaurantsScreen.module.css'

export default function RestaurantsScreen() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const {
    filters,
    loading: filtersLoading,
    error: filtersError
  } = useFilters();
  const {
    restaurants,
    loading: restaurantsLoading,
    error: restaurantsError
  } = useRestaurants({
    filterIds: activeCategory ? [activeCategory] : undefined
  });
  const error = filtersError || restaurantsError;

  return (
    <div className={styles['rs-container']}>
      <aside className={styles['rs-sidebar']}>
        <div className={styles['rs-sidebar-logo']}>
          <Logo color="black" />
        </div>
        <SidebarFilters
          categories={filters.map(f => ({ id: f.id, label: f.name }))}
          activeCategory={activeCategory}
          onCategoryChange={(id) => setActiveCategory(activeCategory === id ? null : id)}
        />
      </aside>
      <main className={styles['rs-main']}>
        <div className={styles['rs-mobile-header']}>
          <Logo color="black" />
        </div>
        <section className={styles['rs-category-list']}>
          {filtersLoading ? (
            <div className={styles['rs-loading']}>Loading categories...</div>
          ) : (
            filters.map((category) => (
              <FoodCategoryCard
                key={category.id}
                label={category.name}
                isActive={activeCategory === category.id}
                image={`${API_BASE_URL}${category.image_url}`}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              />
            ))
          )}
        </section>
        <section className={styles['rs-restaurant-section']}>
          <h2 className="section-title">Restaurants</h2>
          {error && <ErrorMessage error={error} />}
          <div className={styles['rs-restaurant-grid']}>
            {restaurantsLoading ? (
              <div className={styles['rs-loading']}>Loading restaurants...</div>
            ) : (
              restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  name={restaurant.name}
                  image={`${API_BASE_URL}${restaurant.image_url}`}
                />
              ))
            )}
            {!restaurantsLoading && restaurants.length === 0 && !error && (
              <p className={styles['rs-empty-state']}>No restaurants found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
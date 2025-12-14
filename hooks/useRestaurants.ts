/**
 * Custom hook for fetching restaurants with filtering support
 */

import { useState, useEffect } from 'react';
import type { Restaurant, RestaurantResponse } from '@/types/api';

interface UseRestaurantsOptions {
  filterIds?: string[];
  enabled?: boolean;
}

interface UseRestaurantsReturn {
  restaurants: Restaurant[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useRestaurants(options: UseRestaurantsOptions = {}): UseRestaurantsReturn {
  const { filterIds, enabled = true } = options;
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRestaurants = async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (filterIds && filterIds.length > 0) {
        queryParams.set('filter_ids', filterIds.join(','));
      }

      const url = `/api/restaurants${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch restaurants: ${response.statusText}`);
      }

      const data = await response.json();
      
      let fetchedRestaurants: Restaurant[] = Array.isArray(data?.restaurants) ? data.restaurants : [];
     
      if (filterIds && filterIds.length > 0) {
        fetchedRestaurants = fetchedRestaurants.filter(restaurant => 
          restaurant.filter_ids && restaurant.filter_ids.some(id => filterIds.includes(id))
        );
      }

      setRestaurants(fetchedRestaurants);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [filterIds?.join(','), enabled]);

  return {
    restaurants,
    loading,
    error,
    refetch: fetchRestaurants,
  };
}
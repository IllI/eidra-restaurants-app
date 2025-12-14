
import { useState, useEffect } from 'react';
import type { Filter, FilterResponse } from '@/types/api';

interface UseFiltersReturn {
  filters: Filter[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFilters = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/filters');

      if (!response.ok) {
        throw new Error(`Failed to fetch filters: ${response.statusText}`);
      }

      const data = await response.json() as FilterResponse;
      
      if (data && Array.isArray(data.filters)) {
        setFilters(data.filters);
      } else {
        setFilters([]);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      setFilters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return {
    filters,
    loading,
    error,
    refetch: fetchFilters,
  };
}
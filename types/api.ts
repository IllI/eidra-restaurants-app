/**
 * TypeScript type definitions for the external API
 * Based on the API documentation at:
 * https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api-docs/
 */

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

// Inferred from CSV: returns a direct array of restaurants
export type RestaurantResponse = Restaurant[];

export interface Filter {
  id: string;
  name: string;
  image_url: string;
}

// Inferred from CSV: returns an object with a "filters" key
export interface FilterResponse {
  filters: Filter[];
}

export interface OpenStatus {
  restaurant_id: string;
  is_currently_open: boolean;
}

export interface PriceRange {
  id: string;
  range: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
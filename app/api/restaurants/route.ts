import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { cache } from '@/lib/cache';

export async function GET(request: NextRequest) {
  const filter_ids = request.nextUrl.searchParams.get('filter_ids');
  const params = filter_ids ? { filter_ids } : null;

  try {
    const cachedData = cache.get('/restaurants', params);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    const queryString = filter_ids ? `?filter_ids=${filter_ids}` : '';
    const data = await apiClient.get(`/restaurants${queryString}`);

    cache.set('/restaurants', data, params);
    console.log('cache set', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    const cachedData = cache.get('/restaurants', params);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    // Catch all api error
    return NextResponse.json(
      { error: 'Failed to fetch restaurants', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
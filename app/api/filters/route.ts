import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { cache } from '@/lib/cache';

const FILTER_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const cacheKey = '/filter';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    const data = await apiClient.get('/filter');

    cache.set(cacheKey, data, undefined, FILTER_CACHE_TTL);
    console.log('cache set', cachedData);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching filters:', error);

    const cachedData = cache.get('/filter');
    if (cachedData) {
      
      return NextResponse.json(cachedData);
    }
    // Catch all api error
    return NextResponse.json(
      { error: 'Failed to fetch filters', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
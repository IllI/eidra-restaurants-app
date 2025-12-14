

import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { cache } from '@/lib/cache';

interface RouteParams {
  params: {
    id: string;
  };
}

const FILTER_CACHE_TTL = 5 * 60 * 1000;  // 5 minutes

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;

    const cacheKey = `/filter/${id}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const data = await apiClient.get(`/filter/${id}`);
    cache.set(cacheKey, data, undefined, FILTER_CACHE_TTL);
    console.log('cache set', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching filter ${params.id}:`, error);

    const cacheKey = `/filter/${params.id}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Catch all api error
    return NextResponse.json(
      { error: 'Failed to fetch filter', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';
import { cache } from '@/lib/cache';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    const cacheKey = `/restaurants/${id}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const data = await apiClient.get(`/restaurants/${id}`);
    cache.set(cacheKey, data);
    console.log('cache set', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching restaurant ${params.id}:`, error);
    const cacheKey = `/restaurants/${params.id}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Catch all api error
    return NextResponse.json(
      { error: 'Failed to fetch restaurant', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
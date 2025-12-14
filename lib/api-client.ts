/* eslint-disable @typescript-eslint/no-explicit-any */

export const API_BASE_URL = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';

export const apiClient = {
  async get(endpoint: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/api${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      return await res.json();
    } catch (error: any) {
      if (error?.name === 'AbortError') throw new Error('Request timeout');
      throw error;
    } 
  }
};


const store = new Map<string, { data: any; expiry: number }>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export const cache = {
  get(url: string, params: any = null) {
    const key = makeKey(url, params);
    const entry = store.get(key);

    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      store.delete(key);
      console.log('cache cleared');
      return null;
    }

    return entry.data;
  },

  set(url: string, data: any, params: any = null, ttl: number = DEFAULT_TTL) {
    const key = makeKey(url, params);
    store.set(key, {
      data,
      expiry: Date.now() + ttl
    });
  }
};

function makeKey(url: string, params: any): string {
  if (!params) return url;
  
   const qs = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  console.log('map key', qs, `${url}?${qs}`);
  return `${url}?${qs}`;
}
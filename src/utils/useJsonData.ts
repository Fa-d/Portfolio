import { useCallback, useEffect, useState } from "react";

// Shared in-memory cache so a JSON file is fetched once per page load,
// even when several components (e.g. hero + footer) read it.
const cache = new Map<string, Promise<unknown>>();

const load = <T,>(url: string): Promise<T> => {
  let request = cache.get(url) as Promise<T> | undefined;
  if (!request) {
    request = fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
      }
      return response.json() as Promise<T>;
    });
    // Drop failed requests from the cache so a retry refetches.
    request.catch(() => cache.delete(url));
    cache.set(url, request);
  }
  return request;
};

export interface JsonData<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useJsonData<T>(url: string): JsonData<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    load<T>(url)
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [url, attempt]);

  const retry = useCallback(() => {
    cache.delete(url);
    setAttempt((n) => n + 1);
  }, [url]);

  return { data, loading, error, retry };
}

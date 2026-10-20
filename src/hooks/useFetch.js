import { useEffect, useState } from 'react';
import { tmdb } from '../api/tmdb';

// Pass path = null to skip the request.
export default function useFetch(path, params = {}) {
  const [state, setState] = useState({ data: null, loading: !!path, error: null });
  const paramKey = JSON.stringify(params);

  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));

    tmdb(path, JSON.parse(paramKey), controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => controller.abort();
  }, [path, paramKey]);

  return state;
}
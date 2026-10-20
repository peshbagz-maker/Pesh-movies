// All TMDB requests go through this file.
const BASE = 'https://api.themoviedb.org/3';
const KEY = import.meta.env.VITE_TMDB_API_KEY;

export const imageUrl = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export async function tmdb(path, params = {}, signal) {
  if (!KEY) {
    throw new Error('Missing API key. Add VITE_TMDB_API_KEY to your .env file and restart the dev server.');
  }
  const query = new URLSearchParams({ api_key: KEY, language: 'en-US', ...params });
  const res = await fetch(`${BASE}${path}?${query}`, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status}). Please try again.`);
  return res.json();
}
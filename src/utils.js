// Movies use title/release_date, TV uses name/first_air_date.
// This turns either into one predictable shape.
export function normalize(item, fallbackType) {
  const type = item.media_type || fallbackType || (item.title ? 'movie' : 'tv');
  const date = item.release_date || item.first_air_date || '';
  return {
    id: item.id,
    type,
    title: item.title || item.name || 'Untitled',
    poster: item.poster_path || null,
    rating: item.vote_average || 0,
    year: date ? date.slice(0, 4) : '',
    overview: item.overview || '',
  };
}
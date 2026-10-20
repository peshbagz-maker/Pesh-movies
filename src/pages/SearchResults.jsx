import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { normalize } from '../utils';
import MovieGrid from '../components/MovieGrid';
import { Loader, ErrorMessage, EmptyMessage } from '../components/States';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();

  const { data, loading, error } = useFetch(q ? '/search/multi' : null, { query: q });

  // Search can also return people; we only want movies and TV shows.
  const items = (data?.results || [])
    .filter((r) => r.media_type === 'movie' || r.media_type === 'tv')
    .map((r) => normalize(r));

  if (!q) {
    return <EmptyMessage title="Search for a title">Type a movie or TV show name in the search bar above.</EmptyMessage>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Results for "{q}"</Typography>
      {loading && <Loader label="Searching" />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && (
        <EmptyMessage title={`No matches for "${q}"`}>Check the spelling or try a shorter title.</EmptyMessage>
      )}
      {!loading && !error && items.length > 0 && <MovieGrid items={items} />}
    </Box>
  );
}
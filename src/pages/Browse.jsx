import { useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { normalize } from '../utils';
import GenreFilter from '../components/GenreFilter';
import MovieGrid from '../components/MovieGrid';
import { Loader, ErrorMessage, EmptyMessage } from '../components/States';

// Shared by the Movies and TV Shows pages. type is "movie" or "tv".
export default function Browse({ type, heading }) {
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);

  const params = { sort_by: 'popularity.desc', page };
  if (genre) params.with_genres = genre;

  const { data, loading, error } = useFetch(`/discover/${type}`, params);
  const items = (data?.results || []).map((r) => normalize(r, type));
  const totalPages = Math.min(data?.total_pages || 1, 500); // TMDB caps pages at 500

  const changeGenre = (id) => {
    setGenre(id);
    setPage(1);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>{heading}</Typography>
      <GenreFilter type={type} value={genre} onChange={changeGenre} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && (
        <EmptyMessage title="Nothing here yet">Try a different genre.</EmptyMessage>
      )}
      {!loading && !error && items.length > 0 && (
        <>
          <MovieGrid items={items} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, p) => {
                setPage(p);
                window.scrollTo({ top: 0 });
              }}
              color="primary"
              siblingCount={0}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
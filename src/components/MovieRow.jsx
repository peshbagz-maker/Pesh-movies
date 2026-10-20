import { Box, Skeleton, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { normalize } from '../utils';
import MovieCard from './MovieCard';
import { ErrorMessage } from './States';

const CARD_WIDTH = { xs: 130, sm: 160, md: 175 };

// A titled, horizontally scrolling row of posters.
export default function MovieRow({ title, path, params, type }) {
  const { data, loading, error } = useFetch(path, params);
  const items = (data?.results || []).map((r) => normalize(r, type));

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>

      {error && <ErrorMessage message={error} />}

      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1.5 }}>
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" sx={{ flex: '0 0 auto', width: CARD_WIDTH, height: 280 }} />
          ))}
        {items.map((item) => (
          <Box key={`${item.type}-${item.id}`} sx={{ flex: '0 0 auto', width: CARD_WIDTH }}>
            <MovieCard item={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
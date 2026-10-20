import { Box } from '@mui/material';
import MovieCard from './MovieCard';

export default function MovieGrid({ items }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)', xl: 'repeat(6, 1fr)' },
      }}
    >
      {items.map((item) => (
        <MovieCard key={`${item.type}-${item.id}`} item={item} />
      ))}
    </Box>
  );
}
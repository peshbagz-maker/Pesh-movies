import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useWatchlist } from '../context/WatchlistContext';
import MovieGrid from '../components/MovieGrid';
import { EmptyMessage } from '../components/States';

export default function Watchlist() {
  const { items } = useWatchlist();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>My Watchlist</Typography>
      {items.length === 0 ? (
        <EmptyMessage title="Your watchlist is empty">
          <Box sx={{ mb: 2 }}>Tap the heart on any poster to save it here.</Box>
          <Button component={RouterLink} to="/" variant="contained">Browse titles</Button>
        </EmptyMessage>
      ) : (
        <MovieGrid items={items} />
      )}
    </Box>
  );
}
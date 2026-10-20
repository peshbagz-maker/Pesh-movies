import { Box, Typography } from '@mui/material';
import MovieRow from '../components/MovieRow';

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 0.5 }}>What are you watching tonight?</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Browse what is trending, save favourites, and find your next watch.
      </Typography>

      <MovieRow title="Trending this week" path="/trending/all/week" />
      <MovieRow title="Popular movies" path="/movie/popular" type="movie" />
      <MovieRow title="Popular TV shows" path="/tv/popular" type="tv" />
      <MovieRow title="Action movies" path="/discover/movie" params={{ with_genres: 28 }} type="movie" />
    </Box>
  );
}
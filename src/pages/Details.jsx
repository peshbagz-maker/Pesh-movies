import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import useFetch from '../hooks/useFetch';
import { imageUrl } from '../api/tmdb';
import { normalize } from '../utils';
import { useWatchlist } from '../context/WatchlistContext';
import { Loader, ErrorMessage, EmptyMessage } from '../components/States';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggle } = useWatchlist();

  const validType = type === 'movie' || type === 'tv';
  const { data, loading, error } = useFetch(validType ? `/${type}/${id}` : null);

  if (!validType) return <EmptyMessage title="Page not found" />;
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  const item = normalize(data, type);
  const saved = isSaved(type, item.id);
  const poster = imageUrl(data.poster_path);
  const backdrop = imageUrl(data.backdrop_path, 'w1280');
  const genres = data.genres || [];
  const length = type === 'movie'
    ? (data.runtime ? `${data.runtime} min` : '')
    : (data.number_of_seasons ? `${data.number_of_seasons} season${data.number_of_seasons > 1 ? 's' : ''}` : '');
  const date = data.release_date || data.first_air_date;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>

      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          backgroundImage: backdrop
            ? `linear-gradient(rgba(18,15,28,0.88), rgba(18,15,28,0.96)), url(${backdrop})`
            : 'none',
          backgroundColor: 'background.paper',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2.5, md: 4 },
          alignItems: { xs: 'center', sm: 'flex-start' },
        }}
      >
        {poster ? (
          <Box
            component="img"
            src={poster}
            alt={`${item.title} poster`}
            sx={{ width: { xs: 200, md: 280 }, borderRadius: 2, flexShrink: 0 }}
          />
        ) : (
          <Box sx={{ width: { xs: 200, md: 280 }, aspectRatio: '2 / 3', bgcolor: 'background.default', borderRadius: 2, display: 'grid', placeItems: 'center', color: 'text.secondary', flexShrink: 0 }}>
            No poster
          </Box>
        )}

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h4" component="h1">{item.title}</Typography>
          {data.tagline && (
            <Typography color="text.secondary" sx={{ fontStyle: 'italic', mt: 0.5 }}>{data.tagline}</Typography>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, my: 2, color: 'text.secondary' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ color: 'primary.main' }} />
              <Typography color="text.primary" fontWeight={600}>
                {item.rating ? item.rating.toFixed(1) : 'N/A'}
              </Typography>
            </Box>
            <Typography>{date || 'Release date unknown'}</Typography>
            {length && <Typography>{length}</Typography>}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {genres.length > 0
              ? genres.map((g) => <Chip key={g.id} label={g.name} variant="outlined" />)
              : <Typography color="text.secondary">No genres listed</Typography>}
          </Box>

          <Typography variant="h6" gutterBottom>Overview</Typography>
          <Typography sx={{ maxWidth: '65ch', lineHeight: 1.7, mb: 3 }}>
            {item.overview || 'No overview available.'}
          </Typography>

          <Button
            variant={saved ? 'outlined' : 'contained'}
            startIcon={saved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
            onClick={() => toggle(item)}
          >
            {saved ? 'Remove from watchlist' : 'Add to watchlist'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, IconButton, Tooltip, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { imageUrl } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ item }) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(item.type, item.id);
  const poster = imageUrl(item.poster);

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        transition: 'transform .2s, border-color .2s',
        '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' },
      }}
    >
      <CardActionArea component={RouterLink} to={`/${item.type}/${item.id}`} sx={{ height: '100%' }}>
        {poster ? (
          <Box
            component="img"
            src={poster}
            alt={`${item.title} poster`}
            loading="lazy"
            sx={{ display: 'block', width: '100%', aspectRatio: '2 / 3', objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{ aspectRatio: '2 / 3', display: 'grid', placeItems: 'center', bgcolor: 'background.default', color: 'text.secondary' }}>
            <ImageNotSupportedIcon />
          </Box>
        )}
        <Box sx={{ p: 1.25 }}>
          <Typography variant="body2" fontWeight={600} noWrap title={item.title}>
            {item.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <StarIcon sx={{ fontSize: 15, color: 'primary.main' }} />
            <Typography variant="caption">
              {item.rating ? item.rating.toFixed(1) : 'N/A'}
              {item.year ? `  |  ${item.year}` : ''}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>

      <Tooltip title={saved ? 'Remove from watchlist' : 'Add to watchlist'}>
        <IconButton
          size="small"
          aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
          onClick={() => toggle(item)}
          sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(18,15,28,0.75)', '&:hover': { bgcolor: 'rgba(18,15,28,0.95)' } }}
        >
          {saved ? <FavoriteIcon fontSize="small" color="secondary" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Card>
  );
}
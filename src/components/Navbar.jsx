import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, TextField, InputAdornment, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

export default function Navbar({ onMenuClick }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar sx={{ gap: 1.5 }}>
        <IconButton edge="start" aria-label="Open menu" onClick={onMenuClick} sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: { md: 4 } }}>
          <MovieFilterIcon color="primary" />
          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Reelhouse
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, maxWidth: 520 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search movies and TV shows"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            inputProps={{ 'aria-label': 'Search' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              sx: { borderRadius: 6, bgcolor: 'background.default' },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
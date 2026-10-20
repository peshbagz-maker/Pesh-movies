import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Toolbar, Typography, Link } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar, { DRAWER_WIDTH } from './components/Sidebar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Watchlist from './pages/Watchlist';
import SearchResults from "./pages/SearchResults";
import Details from './pages/Details';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={() => setMobileOpen(true)} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0, // stops wide content from causing sideways scrolling
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          p: { xs: 2, sm: 3 },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/:type/:id" element={<Details />} />
          <Route path="*" element={<Typography>Page not found.</Typography>} />
        </Routes>

        <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 6, textAlign: 'center' }}>
          This product uses the{' '}
          <Link href="https://www.themoviedb.org" target="_blank" rel="noopener" color="inherit" underline="always">
            TMDB
          </Link>{' '}
          API but is not endorsed or certified by TMDB.
        </Typography>
      </Box>
    </Box>
  );
}
import { NavLink, useLocation } from 'react-router-dom';
import { Drawer, Toolbar, List, ListItemButton, ListItemIcon, ListItemText, Badge } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useWatchlist } from '../context/WatchlistContext';

export const DRAWER_WIDTH = 220;

const links = [
  { label: 'Home', to: '/', icon: <HomeIcon /> },
  { label: 'Movies', to: '/movies', icon: <MovieIcon /> },
  { label: 'TV Shows', to: '/tv', icon: <TvIcon /> },
  { label: 'My Watchlist', to: '/watchlist', icon: <BookmarkIcon /> },
];

function NavList({ onNavigate }) {
  const { pathname } = useLocation();
  const { items } = useWatchlist();

  return (
    <List sx={{ px: 1, pt: 2 }}>
      {links.map((l) => (
        <ListItemButton
          key={l.to}
          component={NavLink}
          to={l.to}
          selected={pathname === l.to}
          onClick={onNavigate}
          sx={{ borderRadius: 2, mb: 0.5, '&.Mui-selected': { bgcolor: 'rgba(245,185,66,0.14)', color: 'primary.main' } }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            {l.to === '/watchlist' ? (
              <Badge badgeContent={items.length} color="primary" max={99}>{l.icon}</Badge>
            ) : (
              l.icon
            )}
          </ListItemIcon>
          <ListItemText primary={l.label} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  const paper = { width: DRAWER_WIDTH, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' };

  return (
    <>
      {/* Mobile: slide-out menu */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': paper }}
      >
        <Toolbar />
        <NavList onNavigate={onClose} />
      </Drawer>

      {/* Desktop: always visible */}
      <Drawer
        variant="permanent"
        open
        sx={{ display: { xs: 'none', md: 'block' }, width: DRAWER_WIDTH, flexShrink: 0, '& .MuiDrawer-paper': paper }}
      >
        <Toolbar />
        <NavList />
      </Drawer>
    </>
  );
}
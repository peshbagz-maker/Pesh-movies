import { createTheme } from '@mui/material/styles';

const display = '"Bricolage Grotesque", "Figtree", system-ui, sans-serif';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f5b942', contrastText: '#1a1205' },
    secondary: { main: '#ff6b6b' },
    background: { default: '#120f1c', paper: '#1c1829' },
    text: { primary: '#f3f0fa', secondary: '#a9a3bd' },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Figtree", system-ui, sans-serif',
    h3: { fontFamily: display, fontWeight: 700 },
    h4: { fontFamily: display, fontWeight: 700 },
    h5: { fontFamily: display, fontWeight: 700 },
    h6: { fontFamily: display, fontWeight: 600 },
  },
});

export default theme;
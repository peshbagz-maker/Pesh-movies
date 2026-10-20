import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { WatchlistProvider } from './context/WatchlistContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
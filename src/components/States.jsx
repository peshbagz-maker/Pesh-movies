import { Alert, Box, CircularProgress, Typography } from '@mui/material';

export function Loader({ label = 'Loading' }) {
  return (
    <Box role="status" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, py: 6 }}>
      <CircularProgress size={28} />
      <Typography color="text.secondary">{label}...</Typography>
    </Box>
  );
}

export function ErrorMessage({ message }) {
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      {message || 'Something went wrong. Check your connection and try again.'}
    </Alert>
  );
}

export function EmptyMessage({ title, children }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography color="text.secondary" component="div">{children}</Typography>
    </Box>
  );
}
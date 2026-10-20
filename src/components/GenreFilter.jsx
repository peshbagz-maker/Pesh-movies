import { Box, Chip } from '@mui/material';
import useFetch from '../hooks/useFetch';

export default function GenreFilter({ type, value, onChange }) {
  const { data } = useFetch(`/genre/${type}/list`);
  const genres = data?.genres || [];

  return (
    <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mb: 2 }}>
      <Chip
        label="All"
        clickable
        color={value === '' ? 'primary' : 'default'}
        onClick={() => onChange('')}
      />
      {genres.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          clickable
          color={String(g.id) === value ? 'primary' : 'default'}
          onClick={() => onChange(String(g.id))}
          sx={{ flexShrink: 0 }}
        />
      ))}
    </Box>
  );
}
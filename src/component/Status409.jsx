import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Status409() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          
        },
      }}
    >
      <Paper elevation={0}>
        <h2>409: Conflict</h2>
        <p>Resource requested cannot be served based on the curent state</p>
      </Paper>
    </Box>
  );
}
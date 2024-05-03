import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Status404() {
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
      <Paper sx={{p: 3}} elevation={0}>
        <h2>404: Page Not Found</h2>
        <p>Resource requested could not be found</p>
      </Paper>
    </Box>
  );
}
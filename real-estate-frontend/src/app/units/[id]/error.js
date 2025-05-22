'use client';

import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/navigation';

export default function Error({ error }) {
  const router = useRouter();

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 64 }} />
          <Typography variant="h5" gutterBottom>
            {'Failed to load unit details'}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            We encountered an error while trying to load this unit. Please try again later.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              onClick={() => router.push('/')}
              sx={{ mr: 2 }}
            >
              Go to Home
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => router.refresh()}
            >
              Try Again
            </Button>
          </Box>
        </Paper>
      </Container>
    </main>
  );
} 
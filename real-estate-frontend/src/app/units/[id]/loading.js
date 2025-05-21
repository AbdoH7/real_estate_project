import {
  Container,
  Grid,
  Paper,
  Box,
  Skeleton,
} from '@mui/material';

export default function Loading() {
  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={400} 
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" height={60} width="80%" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={40} width="40%" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={30} width="60%" sx={{ mb: 3 }} />
              
              <Box sx={{ my: 4 }}>
                <Grid container spacing={3}>
                  {[1, 2, 3].map((i) => (
                    <Grid item xs={4} key={i}>
                      <Skeleton variant="text" height={60} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Skeleton variant="text" height={40} width="20%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={20} width="100%" />
            <Skeleton variant="text" height={20} width="100%" />
            <Skeleton variant="text" height={20} width="80%" />
          </Box>
        </Paper>
      </Container>
    </main>
  );
} 
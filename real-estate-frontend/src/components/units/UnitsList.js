import {
  Grid,
  Typography,
  Container,
} from '@mui/material';
import UnitCard from '@/components/units/UnitCard';

export default function UnitsList({ units }) {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Available Units
      </Typography>

      <Grid 
        container 
        spacing={4} 
        sx={{ 
          maxWidth: '1800px',
          margin: '0 auto',
          px: 2,
        }}
      >
        {units.map((unit) => (
          <Grid 
            item 
            key={unit.id} 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3}
            sx={{
              minWidth: { xs: '100%', sm: '400px' },
            }}
          >
            <UnitCard unit={unit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 
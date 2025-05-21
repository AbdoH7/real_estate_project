import {
  Grid,
  Typography,
} from '@mui/material';
import UnitCard from '@/components/units/UnitCard';

export default function UnitsList({ units }) {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Available Units
      </Typography>

      <Grid container spacing={3}>
        {units.map((unit) => (
          <Grid item key={unit.id} xs={12} sm={6} md={4} lg={3}>
            <UnitCard unit={unit} />
          </Grid>
        ))}
      </Grid>
    </>
  );
} 
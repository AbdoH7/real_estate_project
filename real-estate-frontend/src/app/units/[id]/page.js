import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Chip,
  Divider,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { getUnit } from '@/lib/api/units';

export default async function UnitDetails({ params }) {
  // Wait for the entire params object to be available
  const resolvedParams = await params;
  const unit = await getUnit(resolvedParams.id);

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          {/* Header Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={unit.main_image_url || 'https://placehold.co/800x600'}
                alt={unit.name}
                sx={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {unit.name}
              </Typography>
              
              <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                ${unit.price.toLocaleString()}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {unit.location}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Features */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BedIcon color="action" />
                    <Box>
                      <Typography variant="h6">{unit.bedroom_count}</Typography>
                      <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BathtubIcon color="action" />
                    <Box>
                      <Typography variant="h6">{unit.bathroom_count}</Typography>
                      <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SquareFootIcon color="action" />
                    <Box>
                      <Typography variant="h6">{unit.area}</Typography>
                      <Typography variant="body2" color="text.secondary">m²</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {unit.furnished && (
                <Chip 
                  label="Furnished" 
                  color="primary" 
                  sx={{ borderRadius: 1 }}
                />
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Project and Developer Section */}
          {(unit.project || unit.project?.developer) && (
            <>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Project Details
                </Typography>
                <Grid container spacing={3}>
                  {unit.project && (
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <ApartmentIcon color="primary" />
                            <Typography variant="h6">Project Information</Typography>
                          </Box>
                          <Typography variant="body1" gutterBottom>
                            <strong>Name:</strong> {unit.project.name}
                          </Typography>
                          {unit.project.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {unit.project.description}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                  
                  {unit.project?.developer && (
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <BusinessIcon color="primary" />
                            <Typography variant="h6">Developer Information</Typography>
                          </Box>
                          <Typography variant="body1" gutterBottom>
                            <strong>Name:</strong> {unit.project.developer.name}
                          </Typography>
                          {unit.project.developer.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {unit.project.developer.description}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </Box>
              <Divider sx={{ my: 4 }} />
            </>
          )}

          {/* Description Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {unit.description || 'No description available.'}
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Amenities Section */}
          <Box>
            <Typography variant="h5" gutterBottom>
              Amenities
            </Typography>
            {unit.amenities && unit.amenities.length > 0 ? (
              <Grid container spacing={2}>
                {unit.amenities.map((amenity, index) => (
                  <Grid item key={index}>
                    <Chip
                      icon={<CheckCircleOutlineIcon />}
                      label={amenity}
                      color="primary"
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No amenities listed.
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </main>
  );
} 
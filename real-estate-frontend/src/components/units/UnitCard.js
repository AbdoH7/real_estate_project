'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Link from 'next/link';

export default function UnitCard({ unit }) {
  return (
    <Link href={`/units/${unit.id}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          width: '100%',
          height: 480, // Fixed height
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box sx={{ height: 220 }}> {/* Fixed height for image container */}
          <CardMedia
            component="img"
            image={unit.main_image_url || 'https://placehold.co/800x600'}
            alt={unit.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <CardContent sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 2,
          '&:last-child': { pb: 2 }, // Override MUI's default padding
        }}>
          <Typography variant="h6" sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 1,
            fontSize: '1.1rem',
          }}>
            {unit.name}
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="primary.main" 
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            ${unit.price.toLocaleString()}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {unit.location}
          </Typography>

          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <BedIcon fontSize="small" color="action" />
              <Typography variant="body2">{unit.bedroom_count}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <BathtubIcon fontSize="small" color="action" />
              <Typography variant="body2">{unit.bathroom_count}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SquareFootIcon fontSize="small" color="action" />
              <Typography variant="body2">{unit.area} m²</Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 'auto' }}>
            {unit.furnished && (
              <Chip 
                label="Furnished" 
                size="small" 
                color="primary" 
                sx={{ borderRadius: 1, mb: 1 }}
              />
            )}

            {(unit.project || unit.project?.developer) && (
              <>
                <Divider sx={{ mb: 1 }} />
                
                {unit.project && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ApartmentIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {unit.project.name}
                    </Typography>
                  </Box>
                )}
                
                {unit.project?.developer && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <BusinessIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {unit.project.developer.name}
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
} 
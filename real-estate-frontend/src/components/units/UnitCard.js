'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import Link from 'next/link';

export default function UnitCard({ unit }) {
  return (
    <Link href={`/units/${unit.id}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={unit.image || 'https://placehold.co/600x400'}
          alt={unit.name}
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom noWrap>
            {unit.name}
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="primary.main" 
            gutterBottom 
            sx={{ fontWeight: 'bold' }}
          >
            ${unit.price.toLocaleString()}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            gutterBottom 
            sx={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2
            }}
          >
            {unit.location}
          </Typography>

          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              mt: 'auto',
              justifyContent: 'space-between',
              alignItems: 'center'
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

          {unit.furnished && (
            <Box sx={{ mt: 2 }}>
              <Chip 
                label="Furnished" 
                size="small" 
                color="primary" 
                sx={{ borderRadius: 1 }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Link>
  );
} 
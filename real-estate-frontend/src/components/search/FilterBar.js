'use client';

import React from 'react';
import {
  Box,
  Slider,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';

export const FilterBar = ({
  priceRange,
  onPriceChange,
  bedroomRange,
  onBedroomChange,
  furnished,
  onFurnishedChange,
  maxPrice,
  maxBedrooms,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatPrice = (value) => `$${value.toLocaleString()}`;
  
  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 4,
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
      }}
      elevation={2}
    >
      {/* Price Range Slider */}
      <Box sx={{ width: isMobile ? '100%' : '30%' }}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={onPriceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={formatPrice}
          min={0}
          max={maxPrice}
          step={1000}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {formatPrice(priceRange[0])}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatPrice(priceRange[1])}
          </Typography>
        </Box>
      </Box>

      {/* Bedrooms Slider */}
      <Box sx={{ width: isMobile ? '100%' : '30%' }}>
        <Typography gutterBottom>Bedrooms</Typography>
        <Slider
          value={bedroomRange}
          onChange={onBedroomChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxBedrooms}
          step={1}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {bedroomRange[0]} beds
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {bedroomRange[1]} beds
          </Typography>
        </Box>
      </Box>

      {/* Furnished Checkbox */}
      <Box sx={{ width: isMobile ? '100%' : 'auto' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={furnished}
              onChange={(e) => onFurnishedChange(e.target.checked)}
            />
          }
          label="Furnished Only"
        />
      </Box>
    </Paper>
  );
}; 
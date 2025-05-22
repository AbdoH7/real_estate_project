'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { useSearch } from '../../lib/hooks/useSearch';
import { getMaxValues } from '../../lib/services/searchService';
import UnitsList from '../units/UnitsList';

export const SearchContainer = ({ initialUnits }) => {
  const [maxValues, setMaxValues] = useState(null);
  const [isLoadingMaxValues, setIsLoadingMaxValues] = useState(true);

  useEffect(() => {
    const fetchMaxValues = async () => {
      try {
        const values = await getMaxValues();
        setMaxValues(values);
      } catch (error) {
        console.error('Failed to fetch max values:', error);
      } finally {
        setIsLoadingMaxValues(false);
      }
    };
    fetchMaxValues();
  }, []);

  // Don't initialize useSearch until we have max values
  const {
    searchTerm,
    setSearchTerm,
    searchOption,
    setSearchOption,
    results,
    isLoading,
    error,
    priceRange,
    setPriceRange,
    bedroomRange,
    setBedroomRange,
    furnished,
    setFurnished,
  } = useSearch(
    'general',
    maxValues?.maxPrice,
    maxValues?.maxBedrooms
  );

  // Use search results if available, otherwise show initial units
  const unitsToDisplay = searchTerm || 
    (maxValues && (
      priceRange[0] > 0 || 
      priceRange[1] < maxValues.maxPrice ||
      bedroomRange[0] > 0 || 
      bedroomRange[1] < maxValues.maxBedrooms || 
      furnished
    ))
    ? results
    : initialUnits;

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleBedroomChange = (event, newValue) => {
    setBedroomRange(newValue);
  };

  if (isLoadingMaxValues) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ py: 3 }}>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchOption={searchOption}
          onOptionChange={setSearchOption}
          isLoading={isLoading}
        />

        {maxValues && (
          <FilterBar
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            bedroomRange={bedroomRange}
            onBedroomChange={handleBedroomChange}
            furnished={furnished}
            onFurnishedChange={setFurnished}
            maxPrice={maxValues.maxPrice}
            maxBedrooms={maxValues.maxBedrooms}
          />
        )}

        {error && (
          <Typography color="error" textAlign="center" mt={2}>
            {error}
          </Typography>
        )}
      </Box>

      <Container maxWidth="xl">
        <UnitsList units={unitsToDisplay} />
      </Container>
    </Box>
  );
}; 
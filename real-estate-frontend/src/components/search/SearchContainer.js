'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { SearchBar } from './SearchBar';
import { useSearch } from '../../lib/hooks/useSearch';
import UnitsList from '../units/UnitsList';

export const SearchContainer = ({ initialUnits }) => {
  const {
    searchTerm,
    setSearchTerm,
    searchOption,
    setSearchOption,
    results,
    isLoading,
    error,
  } = useSearch();

  // Use search results if available, otherwise show initial units
  const unitsToDisplay = searchTerm ? results : initialUnits;

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
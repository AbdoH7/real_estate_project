'use client';

import React from 'react';
import {
  Paper,
  InputBase,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SEARCH_OPTIONS } from '../../lib/constants/searchOptions';

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  searchOption,
  onOptionChange,
  isLoading = false,
}) => {
  const currentOption = SEARCH_OPTIONS.find(option => option.value === searchOption);

  const handleOptionChange = (event) => {
    onOptionChange(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        mb: 4,
        boxShadow: 3,
      }}
      elevation={3}
    >
      <Select
        value={searchOption}
        onChange={handleOptionChange}
        sx={{
          minWidth: 120,
          '& .MuiSelect-select': {
            py: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      >
        {SEARCH_OPTIONS.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={currentOption?.placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
        {isLoading ? (
          <CircularProgress size={24} sx={{ mx: 1 }} />
        ) : (
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}; 
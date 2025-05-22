'use client';

import { useState, useCallback, useEffect } from 'react';
import { searchUnits } from '../services/searchService';
import { useDebounce } from './useDebounce';

export const useSearch = (initialOption = 'general', maxPrice = 1000000, maxBedrooms = 10) => {
  const [searchOption, setSearchOption] = useState(initialOption);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Initialize filter states with full ranges
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [bedroomRange, setBedroomRange] = useState([0, maxBedrooms]);
  const [furnished, setFurnished] = useState(false);

  // Update ranges when max values change
  useEffect(() => {
    setPriceRange([0, maxPrice]);
    setBedroomRange([0, maxBedrooms]);
  }, [maxPrice, maxBedrooms]);

  // Debounce search term and filters to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedPriceRange = useDebounce(priceRange, 300);
  const debouncedBedroomRange = useDebounce(bedroomRange, 300);
  const debouncedFurnished = useDebounce(furnished, 300);

  const buildSearchParams = useCallback((term, option, prices, bedrooms, isFurnished) => {
    const params = {
      minPrice: prices[0],
      maxPrice: prices[1],
      minBedrooms: bedrooms[0],
      maxBedrooms: bedrooms[1],
      furnished: isFurnished || undefined, // Only include if true
    };

    switch (option) {
      case 'general':
        return { ...params, search: term };
      case 'unitName':
        return { ...params, unitName: term };
      case 'unitCode':
        return { ...params, unitCode: term };
      case 'project':
        return { ...params, projectSearch: term };
      case 'developer':
        return { ...params, developerSearch: term };
      default:
        return { ...params, search: term };
    }
  }, []);

  const performSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = buildSearchParams(
        debouncedSearchTerm,
        searchOption,
        debouncedPriceRange,
        debouncedBedroomRange,
        debouncedFurnished
      );
      const data = await searchUnits(searchParams);
      setResults(data);
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    debouncedSearchTerm,
    searchOption,
    debouncedPriceRange,
    debouncedBedroomRange,
    debouncedFurnished,
    buildSearchParams,
  ]);

  useEffect(() => {
    performSearch();
  }, [
    debouncedSearchTerm,
    debouncedPriceRange,
    debouncedBedroomRange,
    debouncedFurnished,
    performSearch,
  ]);

  return {
    // Search states
    searchTerm,
    setSearchTerm,
    searchOption,
    setSearchOption,
    results,
    isLoading,
    error,
    // Filter states
    priceRange,
    setPriceRange,
    bedroomRange,
    setBedroomRange,
    furnished,
    setFurnished,
  };
}; 
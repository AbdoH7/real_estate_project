'use client';

import { useState, useCallback, useEffect } from 'react';
import { searchUnits } from '../services/searchService';
import { useDebounce } from './useDebounce';

export const useSearch = (initialOption = 'general') => {
  const [searchOption, setSearchOption] = useState(initialOption);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const buildSearchParams = useCallback((term, option) => {
    switch (option) {
      case 'general':
        return { search: term };
      case 'unitName':
        return { unitName: term };
      case 'unitCode':
        return { unitCode: term };
      case 'project':
        return { projectSearch: term };
      case 'developer':
        return { developerSearch: term };
      default:
        return { search: term };
    }
  }, []);

  const performSearch = useCallback(async () => {
    if (!debouncedSearchTerm) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchParams = buildSearchParams(debouncedSearchTerm, searchOption);
      const data = await searchUnits(searchParams);
      setResults(data);
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, searchOption, buildSearchParams]);

  useEffect(() => {
    performSearch();
  }, [debouncedSearchTerm, performSearch]);

  return {
    searchTerm,
    setSearchTerm,
    searchOption,
    setSearchOption,
    results,
    isLoading,
    error,
  };
}; 
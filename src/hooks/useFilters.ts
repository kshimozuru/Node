import { useState, useCallback } from 'react';

export function useFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleFilter = useCallback((category: string, value: string) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[category] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(v => v !== value)
        : [...currentFilters, value];
      
      return {
        ...prev,
        [category]: newFilters
      };
    });
  }, []);

  const updateFilters = useCallback((newFilters: Record<string, string[]>) => {
    setSelectedFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({});
  }, []);

  return {
    selectedFilters,
    toggleFilter,
    updateFilters,
    clearFilters
  };
}
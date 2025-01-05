import React from 'react';
import { motion } from 'framer-motion';
import { ResultCard } from '../ResultCard';
import { ComparisonGrid } from '../comparison/ComparisonGrid';
import { FilterOptions } from '../filters/FilterOptions';
import { RefinementQuestions } from './RefinementQuestions';
import { refinementQuestions } from '../../data/refinementQuestions';
import type { SearchResult } from '../../types/searchResult';
import type { Language } from '../../types/language';
import { filterCategories } from '../../types/filters';

interface SearchResultsProps {
  result: SearchResult;
  category: string;
  alternatives: SearchResult[];
  language: Language;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (category: string, value: string) => void;
  onFiltersUpdate: (filters: Record<string, string[]>) => void;
  onFavoriteClick: (result: SearchResult) => void;
  isFavorite: (title: string) => boolean;
}

export function SearchResults({
  result,
  category,
  alternatives,
  language,
  selectedFilters,
  onFilterChange,
  onFiltersUpdate,
  onFavoriteClick,
  isFavorite
}: SearchResultsProps) {
  const questions = refinementQuestions[category] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <ResultCard
        {...result}
        language={language}
        onFavoriteClick={() => onFavoriteClick(result)}
        isFavorite={isFavorite(result.title)}
      />

      <RefinementQuestions
        questions={questions}
        language={language}
        onOptionSelect={onFiltersUpdate}
      />

      <div className="sticky top-4 z-10">
        <FilterOptions
          categories={filterCategories}
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          language={language}
        />
      </div>

      <ComparisonGrid
        mainResult={result}
        alternatives={alternatives}
        language={language}
        onFavoriteClick={onFavoriteClick}
        isFavorite={isFavorite}
      />
    </motion.div>
  );
}
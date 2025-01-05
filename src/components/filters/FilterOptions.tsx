import React from 'react';
import { motion } from 'framer-motion';
import { FilterChip } from './FilterChip';
import { Language } from '../../types/language';
import { translations } from '../../utils/i18n';
import type { FilterCategory } from '../../types/filters';

interface FilterOptionsProps {
  categories: FilterCategory[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (category: string, value: string) => void;
  language: Language;
}

export function FilterOptions({
  categories,
  selectedFilters,
  onFilterChange,
  language
}: FilterOptionsProps) {
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 px-4 py-2 bg-black/20 rounded-lg"
    >
      {categories.map((category) => (
        <div key={category.id} className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">
            {category.label[language]}
          </span>
          <div className="flex items-center gap-1">
            {category.options.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label[language]}
                isSelected={selectedFilters[category.id]?.includes(option.value)}
                onClick={() => onFilterChange(category.id, option.value)}
              />
            ))}
          </div>
          <span className="w-px h-4 bg-gray-700 last:hidden" />
        </div>
      ))}
    </motion.div>
  );
}
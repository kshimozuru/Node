import { useState, useEffect } from 'react';
import { mockResults } from '../data/mockResults';
import type { SearchResult } from '../types/searchResult';

export function useSearchResults(category: string | null, query: string) {
  const [result, setResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    if (!category || !query) {
      setResult(null);
      return;
    }

    // 実際のAPIコールをシミュレート
    const timer = setTimeout(() => {
      setResult(mockResults[category] || null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [category, query]);

  return result;
}
import { headphones } from './headphones';
import { smartphones } from './smartphones';
import { laptops } from './laptops';
import type { SearchResult } from '../../types/searchResult';

export const mockResults: Record<string, SearchResult> = {
  headphones,
  smartphones,
  laptops
};
import { Source } from './source';

export interface SearchResult {
  title: string;
  description: string;
  confidence: number;
  imageUrl?: string;
  specifications?: Record<string, string>;
  sources: Source[];
}
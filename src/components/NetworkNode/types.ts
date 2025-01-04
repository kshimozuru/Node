export interface Source {
  platform: 'amazon' | 'youtube' | 'x';
  content: string;
  rating?: number;
  reviewCount?: number;
  author?: string;
  url: string;
}

export interface NetworkDisplayProps {
  title: string;
  description: string;
  confidence: number;
  imageUrl?: string;
  sources: Source[];
  specifications?: Record<string, string>;
}

export interface MainNodeProps {
  position: [number, number, number];
  title: string;
  description: string;
  confidence: number;
  imageUrl?: string;
  specifications?: Record<string, string>;
}

export interface SourceNodeProps {
  position: [number, number, number];
  source: Source;
}
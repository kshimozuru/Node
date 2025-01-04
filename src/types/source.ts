export type SourcePlatform = 
  | 'amazon' 
  | 'youtube' 
  | 'x' 
  | 'reddit'
  | 'stackoverflow'
  | 'scholar'
  | 'expert'
  | 'web';

export interface Source {
  platform: SourcePlatform;
  content: string;
  rating?: number;
  reviewCount?: number;
  author?: string;
  url: string;
  date?: string;
  citations?: number;
  votes?: number;
  expertise?: string;
}
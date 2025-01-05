import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { SourceCard } from './source/SourceCard';
import { Language } from '../types/language';
import { translations } from '../utils/i18n';
import type { Source } from '../types/source';

interface ResultCardProps {
  title: string;
  description: string;
  confidence: number;
  imageUrl?: string;
  specifications?: Record<string, string>;
  sources: Source[];
  language: Language;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
}

export function ResultCard({ 
  title,
  description,
  confidence,
  imageUrl,
  specifications,
  sources,
  language,
  onFavoriteClick,
  isFavorite = false,
}: ResultCardProps) {
  const t = translations[language];

  return (
    <div className="w-full max-w-3xl bg-gray-900/80 backdrop-blur-xl rounded-lg shadow-xl overflow-hidden border border-white/[0.06]">
      {imageUrl && (
        <div className="w-full h-64">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {onFavoriteClick && (
              <FavoriteButton
                isFavorite={isFavorite}
                onClick={onFavoriteClick}
              />
            )}
          </div>
          <span className="bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
            {t.confidence.replace('{value}', confidence.toString())}
          </span>
        </div>

        <p className="text-gray-300 mb-6">{description}</p>

        {specifications && (
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-black/40 rounded-lg">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-medium text-white">{key}:</span>
                <span className="ml-2 text-gray-400">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-white/[0.06] pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">{t.sources}</h3>
          <div className="space-y-4">
            {sources.map((source, index) => (
              <SourceCard 
                key={index} 
                source={source} 
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { ResultCard } from './ResultCard';
import { SearchResult } from '../types/searchResult';
import { Language } from '../types/language';
import { translations } from '../utils/i18n';

interface FavoritesListProps {
  favorites: SearchResult[];
  language: Language;
  onRemove: (title: string) => void;
}

export function FavoritesList({ favorites, language, onRemove }: FavoritesListProps) {
  const t = translations[language];

  if (favorites.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        {t.noFavorites}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {favorites.map((favorite) => (
        <ResultCard
          key={favorite.title}
          {...favorite}
          language={language}
          onFavoriteClick={() => onRemove(favorite.title)}
          isFavorite={true}
        />
      ))}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { SearchResult } from '../types/searchResult';

export function useFavorites() {
  const [favorites, setFavorites] = useState<SearchResult[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (result: SearchResult) => {
    setFavorites(prev => {
      if (prev.some(f => f.title === result.title)) return prev;
      return [...prev, result];
    });
  };

  const removeFavorite = (title: string) => {
    setFavorites(prev => prev.filter(f => f.title !== title));
  };

  const isFavorite = (title: string) => {
    return favorites.some(f => f.title === title);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
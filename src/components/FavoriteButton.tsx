import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`p-2 rounded-full transition-colors ${
        isFavorite 
          ? 'text-yellow-400 bg-yellow-400/10' 
          : 'text-gray-400 hover:text-yellow-400 bg-white/5 hover:bg-yellow-400/10'
      }`}
    >
      <Star
        size={20}
        fill={isFavorite ? 'currentColor' : 'none'}
      />
    </motion.button>
  );
}
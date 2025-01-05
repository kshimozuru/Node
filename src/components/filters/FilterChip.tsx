import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isSelected, onClick }: FilterChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs
        transition-colors
        ${isSelected
          ? 'bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30'
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
        }
      `}
    >
      {label}
      {isSelected && (
        <X size={10} className="text-current" />
      )}
    </motion.button>
  );
}
import React from 'react';
import { ExternalLink, Star, MessageCircle, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface SourceNodeProps {
  platform: 'amazon' | 'youtube' | 'x';
  content: string;
  rating?: number;
  reviewCount?: number;
  author?: string;
  url: string;
  position: 'left' | 'right' | 'bottom';
  delay?: number;
}

export function SourceNode({
  platform,
  content,
  rating,
  reviewCount,
  author,
  url,
  position,
  delay = 0
}: SourceNodeProps) {
  const positionClasses = {
    left: '-left-64 top-1/2 -translate-y-1/2',
    right: '-right-64 top-1/2 -translate-y-1/2',
    bottom: 'left-1/2 -bottom-48 -translate-x-1/2'
  };

  const platformIcons = {
    amazon: <Star className="w-5 h-5 text-yellow-400" />,
    youtube: <Play className="w-5 h-5 text-red-500" />,
    x: <MessageCircle className="w-5 h-5 text-blue-400" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -20 : position === 'right' ? 20 : 0, y: position === 'bottom' ? 20 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`absolute ${positionClasses[position]}`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl shadow-lg p-4 w-56 transition-shadow hover:shadow-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          {platformIcons[platform]}
          <span className="font-medium capitalize">{platform}</span>
          {rating && (
            <span className="text-sm text-gray-500">
              {rating.toFixed(1)} ★ ({reviewCount})
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">{content}</p>
        {author && <p className="text-sm text-gray-500">- {author}</p>}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 mt-2"
        >
          View source <ExternalLink size={14} />
        </a>
      </motion.div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          x1="50%"
          y1="50%"
          x2={position === 'bottom' ? '50%' : position === 'left' ? '100%' : '0%'}
          y2={position === 'bottom' ? '0%' : '50%'}
          stroke="#CBD5E1"
          strokeWidth="2"
        />
      </svg>
    </motion.div>
  );
}
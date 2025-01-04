import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SourceIcon } from './SourceIcon';
import type { Source } from '../../types/source';

interface SourceCardProps {
  source: Source;
}

export function SourceCard({ source }: SourceCardProps) {
  const renderMetrics = () => {
    switch (source.platform) {
      case 'amazon':
        return source.rating && (
          <span className="text-sm text-gray-400">
            {source.rating.toFixed(1)} ★ ({source.reviewCount} reviews)
          </span>
        );
      case 'reddit':
      case 'stackoverflow':
        return source.votes && (
          <span className="text-sm text-gray-400">
            {source.votes} votes
          </span>
        );
      case 'scholar':
        return source.citations && (
          <span className="text-sm text-gray-400">
            {source.citations} citations
          </span>
        );
      case 'expert':
        return source.expertise && (
          <span className="text-sm text-gray-400">
            {source.expertise}
          </span>
        );
      default:
        return source.date && (
          <span className="text-sm text-gray-400">
            {source.date}
          </span>
        );
    }
  };

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors"
    >
      <div className="flex-shrink-0 mr-4">
        <SourceIcon platform={source.platform} className="w-5 h-5" />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-white capitalize">
            {source.platform}
          </span>
          {renderMetrics()}
        </div>
        <p className="text-gray-300 text-sm">{source.content}</p>
        {source.author && (
          <p className="text-gray-400 text-sm mt-1">- {source.author}</p>
        )}
      </div>
      <ExternalLink className="flex-shrink-0 w-5 h-5 text-gray-400 hover:text-white transition-colors" />
    </a>
  );
}
import React from 'react';
import { SourceCard } from './source/SourceCard';
import type { Source } from '../types/source';

interface ResultCardProps {
  title: string;
  description: string;
  confidence: number;
  imageUrl?: string;
  specifications?: Record<string, string>;
  sources: Source[];
}

export function ResultCard({ 
  title, 
  description, 
  confidence, 
  imageUrl, 
  specifications,
  sources 
}: ResultCardProps) {
  return (
    <div className="w-full max-w-3xl bg-gray-900/80 backdrop-blur-xl rounded-lg shadow-xl overflow-hidden border border-white/[0.06]">
      {imageUrl && (
        <div className="w-full h-64">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <span className="bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
            {confidence}% Confidence
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
          <h3 className="text-lg font-semibold text-white mb-4">Sources</h3>
          <div className="space-y-4">
            {sources.map((source, index) => (
              <SourceCard key={index} source={source} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
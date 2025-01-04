import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Source {
  platform: string;
  rating: number;
  reviewCount: number;
  url: string;
}

interface ResultNodeProps {
  title: string;
  description: string;
  sources: Source[];
  confidence: number;
}

export function ResultNode({ title, description, sources, confidence }: ResultNodeProps) {
  return (
    <div className="relative">
      {/* Main Node */}
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {confidence}% Confidence
          </div>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {/* Source Links */}
        <div className="space-y-3">
          {sources.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-700">{source.platform}</span>
                <span className="text-sm text-gray-500">
                  {source.rating.toFixed(1)} ★ ({source.reviewCount} reviews)
                </span>
              </div>
              <ExternalLink size={18} className="text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface MainNodeProps {
  title: string;
  description: string;
  confidence: number;
  imageUrl?: string;
  specifications?: Record<string, string>;
}

export function MainNode({ 
  title, 
  description, 
  confidence, 
  imageUrl,
  specifications 
}: MainNodeProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl shadow-xl p-6 w-[480px]"
    >
      {imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {confidence}% Confidence
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {specifications && (
        <div className="mt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            <ChevronDown
              className={`transform transition-transform ${showDetails ? 'rotate-180' : ''}`}
            />
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          
          <motion.div
            initial={false}
            animate={{ height: showDetails ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="ml-2 text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
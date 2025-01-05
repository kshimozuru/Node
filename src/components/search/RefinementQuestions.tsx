import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronRight } from 'lucide-react';
import type { Language } from '../../types/language';

interface Question {
  id: string;
  text: Record<Language, string>;
  options: {
    id: string;
    text: Record<Language, string>;
    filters: Record<string, string[]>;
  }[];
}

interface RefinementQuestionsProps {
  questions: Question[];
  language: Language;
  onOptionSelect: (filters: Record<string, string[]>) => void;
}

export function RefinementQuestions({
  questions,
  language,
  onOptionSelect
}: RefinementQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (option: Question['options'][0]) => {
    setSelectedOptions(prev => [...prev, option.id]);
    onOptionSelect(option.filters);
    
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <AnimatePresence mode="wait">
        {currentQuestionIndex < questions.length && (
          <motion.div
            key={questions[currentQuestionIndex].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-black/20 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
                {currentQuestionIndex + 1}
              </div>
              <h3 className="text-sm font-medium text-white">
                {questions[currentQuestionIndex].text[language]}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {questions[currentQuestionIndex].options.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option)}
                  className={`
                    flex items-center justify-between p-3 rounded-lg
                    ${selectedOptions.includes(option.id)
                      ? 'bg-indigo-500/20 text-indigo-200'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                    }
                    transition-colors group
                  `}
                >
                  <span className="text-sm">{option.text[language]}</span>
                  <ChevronRight 
                    size={16} 
                    className="text-gray-500 group-hover:text-white transition-colors"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
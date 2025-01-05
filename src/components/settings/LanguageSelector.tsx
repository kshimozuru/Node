import React from 'react';
import { Check } from 'lucide-react';
import { Language } from '../../types/language';
import { languageOptions } from '../../utils/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="space-y-2">
      {languageOptions.map((option) => (
        <button
          key={option.code}
          onClick={() => onLanguageChange(option.code)}
          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors
            ${currentLanguage === option.code
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{option.flag}</span>
            <span>{option.label}</span>
          </div>
          {currentLanguage === option.code && (
            <Check size={20} />
          )}
        </button>
      ))}
    </div>
  );
}
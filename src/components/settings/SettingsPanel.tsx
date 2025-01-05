import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../../types/language';
import { LanguageSelector } from './LanguageSelector';
import { translations } from '../../utils/i18n';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function SettingsPanel({ 
  isOpen, 
  onClose, 
  language, 
  onLanguageChange 
}: SettingsPanelProps) {
  if (!isOpen) return null;

  const t = translations[language];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 shadow-xl">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">{t.settings}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">{t.language}</h3>
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </div>
  );
}
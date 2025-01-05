import { useState, useEffect } from 'react';
import { Language } from '../types/language';

export function useLanguage(defaultLanguage: Language = 'en') {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return { language, setLanguage };
}
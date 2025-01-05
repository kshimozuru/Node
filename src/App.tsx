import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { Sidebar } from './components/Sidebar';
import { AnimatedBackground } from './components/background/AnimatedBackground';
import { mockResult } from './data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from './hooks/useFavorites';
import { FavoritesList } from './components/FavoritesList';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { Language } from './types/language';
import { translations } from './utils/i18n';

export function App() {
  const [showResult, setShowResult] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en'); // Changed default to English
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleSearch = (query: string) => {
    setShowResult(true);
    setShowFavorites(false);
  };

  const handleReset = () => {
    setShowResult(false);
    setShowFavorites(false);
  };

  const handleFavoritesClick = () => {
    setShowFavorites(true);
    setShowResult(false);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-transparent">
      <AnimatedBackground />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogoClick={handleReset}
        onFavoritesClick={handleFavoritesClick}
        onSettingsClick={() => setIsSettingsOpen(true)}
        language={language}
      />
      
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="container mx-auto px-4 flex flex-col min-h-screen">
          {showFavorites ? (
            <div className="py-16">
              <h1 className="text-3xl font-bold text-white mb-8">{t.favorites}</h1>
              <FavoritesList
                favorites={favorites}
                language={language}
                onRemove={removeFavorite}
              />
            </div>
          ) : (
            <div className={`flex-grow flex flex-col items-center ${showResult ? 'pt-16' : 'justify-center'}`}>
              <div className="w-full max-w-3xl space-y-8">
                <AnimatePresence mode="wait">
                  {!showResult && (
                    <motion.div
                      key="search-header"
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {t.title}
                      </h1>
                      <p className="text-lg text-gray-400 mb-8">
                        {t.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div layout className="transition-all duration-300">
                  <SearchBar 
                    onSearch={handleSearch}
                    placeholder={t.searchPlaceholder}
                  />
                </motion.div>

                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.2 }}
                      className="w-full"
                    >
                      <ResultCard 
                        {...mockResult}
                        language={language}
                        onFavoriteClick={() => 
                          isFavorite(mockResult.title)
                            ? removeFavorite(mockResult.title)
                            : addFavorite(mockResult)
                        }
                        isFavorite={isFavorite(mockResult.title)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
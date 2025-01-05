import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/search/SearchResults';
import { Sidebar } from './components/Sidebar';
import { AnimatedBackground } from './components/background/AnimatedBackground';
import { ThinkingProcess } from './components/search/ThinkingProcess';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { FavoritesList } from './components/FavoritesList';
import { useSearchProcess } from './hooks/useSearchProcess';
import { useLanguage } from './hooks/useLanguage';
import { useFavorites } from './hooks/useFavorites';
import { useFilters } from './hooks/useFilters';
import { useSearchResults } from './hooks/useSearchResults';
import { translations } from './utils/i18n';
import { mockAlternatives } from './data/mockAlternatives';

export function App() {
  const [showResult, setShowResult] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { language, setLanguage } = useLanguage();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { isSearching, currentStep, isComplete, startSearch } = useSearchProcess();
  const { selectedFilters, toggleFilter, clearFilters, updateFilters } = useFilters();
  const searchResult = useSearchResults(selectedCategory, searchQuery);
  
  const t = translations[language];

  const handleSearch = (query: string) => {
    setShowFavorites(false);
    setShowResult(false);
    clearFilters();
    setSearchQuery(query);
    setSelectedCategory('headphones'); // 仮の実装：常にヘッドホンカテゴリを選択
    startSearch();
    
    setTimeout(() => {
      setShowResult(true);
    }, 6500);
  };

  const handleReset = () => {
    setShowResult(false);
    setShowFavorites(false);
    clearFilters();
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <AnimatedBackground 
        isZoomed={showResult} 
        selectedNodeIndex={showResult ? 0 : undefined}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogoClick={handleReset}
        onFavoritesClick={() => setShowFavorites(true)}
        onSettingsClick={() => setShowSettings(true)}
        language={language}
      />
      
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="container mx-auto px-4 flex flex-col min-h-screen">
          <div className={`flex-grow flex flex-col items-center ${showResult || showFavorites ? 'pt-16' : 'justify-center'}`}>
            <div className="w-full max-w-3xl space-y-8">
              {!showResult && !showFavorites && (
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {t.title}
                  </h1>
                  <p className="text-lg text-gray-400 mb-8">
                    {t.description}
                  </p>
                </div>
              )}

              {!showFavorites && (
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder={t.searchPlaceholder}
                />
              )}

              {isSearching && (
                <ThinkingProcess
                  currentStep={currentStep}
                  isComplete={isComplete}
                />
              )}

              {showFavorites && (
                <FavoritesList
                  favorites={favorites}
                  language={language}
                  onRemove={removeFavorite}
                />
              )}

              {showResult && searchResult && selectedCategory && (
                <SearchResults
                  result={searchResult}
                  category={selectedCategory}
                  alternatives={mockAlternatives}
                  language={language}
                  selectedFilters={selectedFilters}
                  onFilterChange={toggleFilter}
                  onFiltersUpdate={updateFilters}
                  onFavoriteClick={(result) => 
                    isFavorite(result.title)
                      ? removeFavorite(result.title)
                      : addFavorite(result)
                  }
                  isFavorite={isFavorite}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
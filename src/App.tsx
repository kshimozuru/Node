import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { Sidebar } from './components/Sidebar';
import { AnimatedBackground } from './components/background/AnimatedBackground';
import { mockResult } from './data/mockData';

export function App() {
  const [showResult, setShowResult] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSearch = (query: string) => {
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <AnimatedBackground />
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="container mx-auto px-4 flex flex-col min-h-screen">
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl space-y-8">
              {/* 検索エリア */}
              <div className={`text-center transition-all duration-300 ${showResult ? 'mb-8' : 'mb-0'}`}>
                <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  AI Best Practice Search
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                  Get the most reliable recommendations backed by AI-analyzed reviews
                </p>
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* 結果エリア - 検索後に表示 */}
              {showResult && (
                <div className="w-full animate-fade-in">
                  <ResultCard {...mockResult} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
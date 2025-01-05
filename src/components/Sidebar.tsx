import React from 'react';
import { Menu, X, Home, Search, Star, Settings, HelpCircle, GitBranch } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types/language';
import { translations } from '../utils/i18n';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogoClick: () => void;
  onFavoritesClick: () => void;
  onSettingsClick: () => void;
  language: Language;
}

export function Sidebar({ 
  isOpen, 
  onToggle, 
  onLogoClick,
  onFavoritesClick,
  onSettingsClick,
  language 
}: SidebarProps) {
  const t = translations[language];
  
  const menuItems = [
    { icon: Home, label: t.home, onClick: onLogoClick },
    { icon: Search, label: t.search, onClick: onLogoClick },
    { icon: Star, label: t.favorites, onClick: onFavoritesClick },
    { icon: Settings, label: t.settings, onClick: onSettingsClick },
    { icon: HelpCircle, label: t.help },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-black/40 backdrop-blur-xl border-r border-white/[0.06] transition-all duration-300 z-50 
      ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <button
        onClick={onToggle}
        className="absolute right-0 top-4 transform translate-x-1/2 bg-black/40 backdrop-blur-xl border border-white/[0.06] rounded-full p-2 shadow-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="p-4">
        <button
          onClick={onLogoClick}
          className={`mb-8 ${!isOpen ? 'justify-center' : ''} flex overflow-hidden hover:opacity-80 transition-opacity`}
        >
          {isOpen ? (
            <Logo />
          ) : (
            <GitBranch size={28} className="text-white" strokeWidth={2.5} />
          )}
        </button>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors
                  ${!isOpen && 'justify-center'} text-gray-400 hover:text-white`}
                >
                  <item.icon size={20} />
                  {isOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
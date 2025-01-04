import React from 'react';
import { Menu, X, Home, Search, Star, Settings, HelpCircle, GitBranch } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Star, label: 'Favorites' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
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
        <div className={`mb-8 ${!isOpen ? 'justify-center' : ''} flex overflow-hidden`}>
          {isOpen ? (
            <Logo />
          ) : (
            <GitBranch size={28} className="text-white" strokeWidth={2.5} />
          )}
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className={`flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors
                  ${!isOpen && 'justify-center'} text-gray-400 hover:text-white`}
                >
                  <item.icon size={20} />
                  {isOpen && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
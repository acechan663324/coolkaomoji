import React, { useState } from 'react';
import type { Page } from '../types';

interface NavigationProps {
  onNavigate: (page: Page) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: Array<{ name: string; page: Page }> = [
    { name: 'Home', page: 'home' },
    { name: 'How to Use', page: 'how-to-use' },
    { name: 'Blog', page: 'blog' },
    { name: 'AI Art', page: 'ai-art' },
    { name: 'Kaomoji Gen', page: 'generator' },
    { name: 'Emoji', page: 'emoji' },
    { name: 'Symbol', page: 'symbol' },
  ];

  const renderNavLinks = () => navLinks.map((link) => (
    <a
      key={link.name}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(link.page);
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }}
      className="block md:inline-block py-2 px-4 md:p-0 text-slate-600 hover:text-cyan-500 transition-colors duration-200 font-medium"
    >
      {link.name}
    </a>
  ));

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 w-full border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2" aria-label="Kaomoji World Home">
            <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><linearGradient id="nav-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#d946ef" /></linearGradient></defs>
              <circle cx="50" cy="50" r="45" stroke="url(#nav-logo-gradient)" strokeWidth="8" fill="white" />
              <text x="50" y="55" fontFamily="monospace, sans-serif" fontSize="30" fill="#1e293b" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">(^_−)</text>
            </svg>
            <span className="font-bold text-xl text-slate-800">Kaomoji World</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-6">
            {renderNavLinks()}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-cyan-500 focus:outline-none"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {renderNavLinks()}
          </div>
        </div>
      )}
    </nav>
  );
};

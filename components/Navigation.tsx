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

  const renderNavLinks = () =>
    navLinks.map((link) => (
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
        className="block rounded-full px-4 py-2 text-base font-medium text-slate-600 transition-all duration-200 hover:bg-white/60 hover:text-cyan-500 md:inline-block md:bg-transparent md:p-0 md:text-slate-500 md:hover:bg-transparent"
      >
        {link.name}
      </a>
    ));

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/70 bg-white/40 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="flex items-center gap-3 rounded-full bg-white/30 px-3 py-1 backdrop-blur-xl"
            aria-label="Kaomoji World Home"
          >
            <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><linearGradient id="nav-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#d946ef" /></linearGradient></defs>
              <circle cx="50" cy="50" r="45" stroke="url(#nav-logo-gradient)" strokeWidth="8" fill="white" />
              <text x="50" y="55" fontFamily="monospace, sans-serif" fontSize="30" fill="#1e293b" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">(^_−)</text>
            </svg>
            <span className="text-xl font-semibold tracking-wide text-slate-700">Kaomoji World</span>
          </a>

          <div className="hidden items-center space-x-8 md:flex">
            {renderNavLinks()}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full bg-white/50 p-2 text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.12)] transition-colors duration-200 hover:text-cyan-500 focus:outline-none"
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
        <div className="md:hidden border-t border-white/70 bg-white/60 backdrop-blur-xl">
          <div className="container mx-auto flex flex-col space-y-2 px-4 py-4">
            {renderNavLinks()}
          </div>
        </div>
      )}
    </nav>
  );
};

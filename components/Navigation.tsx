import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks: Array<{ name: string; path: string }> = [
  { name: 'Home', path: '/' },
  { name: 'How to Use', path: '/how-to-use' },
  { name: 'Blog', path: '/blog' },
  { name: 'AI Art', path: '/ai-art' },
  { name: 'Kaomoji Gen', path: '/generator' },
  { name: 'Emoji', path: '/emoji' },
  { name: 'Symbol', path: '/symbol' },
];

const getLinkClasses = (isActive: boolean): string => {
  const base =
    'block rounded-full px-4 py-2 text-base font-medium transition-all duration-200 md:inline-block md:bg-transparent md:p-0';
  if (isActive) {
    return `${base} text-cyan-500 md:text-cyan-600`;
  }
  return `${base} text-slate-600 hover:bg-white/60 hover:text-cyan-500 md:text-slate-500 md:hover:bg-transparent`;
};

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/70 bg-white/40 backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 rounded-full bg-white/30 px-3 py-1 backdrop-blur-xl"
            aria-label="Kaomoji World Home"
          >
            <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="nav-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" stroke="url(#nav-logo-gradient)" strokeWidth="8" fill="white" />
              <text x="50" y="55" fontFamily="monospace, sans-serif" fontSize="30" fill="#1e293b" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
                (^_−)
              </text>
            </svg>
            <span className="text-xl font-semibold tracking-wide text-slate-700">Kaomoji World</span>
          </NavLink>

          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map(({ name, path }) => (
              <NavLink key={path} to={path} className={({ isActive }) => getLinkClasses(isActive)}>
                {name}
              </NavLink>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="rounded-full bg-white/50 p-2 text-slate-600 transition-colors duration-200 hover:text-cyan-500 focus:outline-none"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/70 bg-white/60 backdrop-blur-xl">
          <div className="container mx-auto flex flex-col space-y-2 px-4 py-4">
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMobileMenu}
                className={({ isActive }) => getLinkClasses(isActive)}
              >
                {name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

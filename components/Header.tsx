import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/50 px-6 py-12 text-center backdrop-blur-2xl sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_rgba(255,255,255,0))]" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-4 rounded-full border border-white/60 bg-white/70 px-6 py-3">
          {/* SVG Logo Icon */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" stroke="url(#logo-gradient)" strokeWidth="5" fill="white" />
            <text
              x="50"
              y="55"
              fontFamily="monospace, sans-serif"
              fontSize="30"
              fill="#1e293b"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              (^_−)
            </text>
          </svg>

          {/* Site Title */}
          <div className="text-left">
            <span className="block text-sm uppercase tracking-[0.4em] text-slate-400">Liquid Glass Edition</span>
            <h1 className="text-4xl font-semibold text-transparent md:text-5xl">
              <span className="bg-gradient-to-r from-[#22d3ee] via-[#60a5fa] to-[#d946ef] bg-clip-text">
                Kaomoji World
              </span>
            </h1>
          </div>
        </div>

        <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
          Discover thousands of expressive faces curated with calm, delightful precision. Copy, share, or craft your own creations with an experience inspired by Apple's elegant design language.
        </p>
      </div>
    </header>
  );
};

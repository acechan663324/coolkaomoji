
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
          Kaomoji World
        </span>
      </h1>
      <p className="mt-4 text-lg text-slate-400">
        Your ultimate destination for finding and creating the perfect kaomoji.
      </p>
    </header>
  );
};

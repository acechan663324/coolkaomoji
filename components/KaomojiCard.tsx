import React, { useState } from 'react';
import type { Kaomoji } from '../types';

interface KaomojiCardProps {
  kaomoji: Kaomoji;
  onCopy: (value: string) => void;
  onGoToDetail: (kaomoji: Kaomoji) => void;
  className?: string;
}

export const KaomojiCard: React.FC<KaomojiCardProps> = ({ kaomoji, onCopy, onGoToDetail, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering other click events
    onCopy(kaomoji.value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleGoToDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    onGoToDetail(kaomoji);
  };

  return (
    <div
      className={`group relative flex h-36 flex-col items-center justify-between overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-3 text-center shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.22)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,187,233,0.35),_transparent_55%)]" />
      </div>
      <div 
        className="flex-grow w-full flex items-center justify-center cursor-pointer"
        onClick={handleGoToDetail}
        title={`View related for ${kaomoji.name}`}
        role="button"
        aria-label={`View details for ${kaomoji.name}`}
      >
        <span className="px-2 text-2xl font-mono whitespace-nowrap overflow-x-auto text-slate-700">
          {kaomoji.value}
        </span>
      </div>
      <div className="w-full">
         <span className="mt-1 block h-5 w-full truncate text-sm text-slate-600">
          {kaomoji.name}
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-semibold">
          <button
            onClick={handleGoToDetail}
            className="w-full rounded-full border border-white/60 bg-white/60 py-1.5 text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:text-cyan-500"
          >
            Related
          </button>
          <button
            onClick={handleCopy}
            className={`w-full py-1.5 rounded-md transition-colors duration-200 ${
              isCopied
                ? 'bg-emerald-500 text-white shadow-[0_10px_25px_rgba(16,185,129,0.35)]'
                : 'bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 text-white shadow-[0_12px_28px_rgba(14,165,233,0.32)] hover:brightness-105'
            }`}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

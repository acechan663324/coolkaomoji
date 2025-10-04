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
      className={`bg-white border border-slate-200 rounded-lg h-36 flex flex-col items-center justify-between p-3 text-center transition-shadow duration-300 hover:shadow-lg hover:shadow-cyan-500/10 ${className}`}
    >
      <div 
        className="flex-grow w-full flex items-center justify-center cursor-pointer"
        onClick={handleGoToDetail}
        title={`View related for ${kaomoji.name}`}
        role="button"
        aria-label={`View details for ${kaomoji.name}`}
      >
        <span className="text-2xl font-mono whitespace-nowrap overflow-x-auto px-2">
          {kaomoji.value}
        </span>
      </div>
      <div className="w-full">
         <span className="text-sm text-slate-600 mt-1 truncate w-full block h-5">
          {kaomoji.name}
        </span>
        <div className="grid grid-cols-2 gap-2 mt-2 text-xs font-semibold">
          <button
            onClick={handleGoToDetail}
            className="w-full py-1.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200"
          >
            Related
          </button>
          <button
            onClick={handleCopy}
            className={`w-full py-1.5 rounded-md transition-colors duration-200 ${
              isCopied
                ? 'bg-emerald-500 text-white'
                : 'bg-cyan-500 text-white hover:bg-cyan-600'
            }`}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

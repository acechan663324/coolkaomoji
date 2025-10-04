import React from 'react';

interface KaomojiCardProps {
  kaomoji: string;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  kaomojiClassName?: string;
}

export const KaomojiCard: React.FC<KaomojiCardProps> = ({ kaomoji, onClick, children, className, title, kaomojiClassName }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200 rounded-lg h-28 flex flex-col items-center justify-center p-2 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-slate-100 hover:shadow-lg hover:shadow-cyan-500/20 relative max-w-full text-center ${className}`}
      title={title || kaomoji}
    >
      <div className="relative flex-grow flex items-center justify-center w-full">
        <span className={`transition-opacity duration-300 text-xl sm:text-2xl font-mono whitespace-nowrap overflow-x-auto px-2 ${children ? 'opacity-0' : 'opacity-100'} ${kaomojiClassName || ''}`}>
          {kaomoji}
        </span>
        {children && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               {children}
           </div>
        )}
      </div>
      {title && (
        <span className="text-xs text-slate-500 mt-1 truncate w-full px-1">
          {title}
        </span>
      )}
    </div>
  );
};

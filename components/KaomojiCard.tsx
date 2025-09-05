
import React, { useState } from 'react';

interface KaomojiCardProps {
  kaomoji: string;
}

export const KaomojiCard: React.FC<KaomojiCardProps> = ({ kaomoji }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(kaomoji);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div
      onClick={handleCopy}
      className="bg-slate-800 rounded-lg p-4 h-24 flex items-center justify-center text-2xl font-mono cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-slate-700 hover:shadow-lg hover:shadow-cyan-500/20"
      title="Click to copy"
    >
      <span className={`transition-opacity duration-300 ${isCopied ? 'opacity-0' : 'opacity-100'}`}>
        {kaomoji}
      </span>
      {isCopied && (
         <span className="absolute text-cyan-400 font-bold transition-opacity duration-300 opacity-100">
          Copied!
        </span>
      )}
    </div>
  );
};

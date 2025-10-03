import React from 'react';
import { KaomojiCard } from './KaomojiCard';
import type { Kaomoji, KaomojiCategory } from '../types';

interface KaomojiGridProps {
  categories: KaomojiCategory[];
  onKaomojiSelect: (kaomoji: Kaomoji) => void;
  copiedValue: string | null;
}

export const KaomojiGrid: React.FC<KaomojiGridProps> = ({ categories, onKaomojiSelect, copiedValue }) => {
  if (categories.length === 0) {
    return (
      <div className="text-center text-slate-400 py-16">
        <p className="text-4xl mb-4">(o´･_･)っ</p>
        <p className="text-xl">No kaomoji found. Try a different search term!</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category.category}>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-300 border-b-2 border-slate-700 pb-2">
            {category.category}
          </h3>
          <div className="flex flex-wrap items-start justify-start gap-4">
            {category.kaomojis.map((kaomoji) => (
              <KaomojiCard 
                key={`${category.category}-${kaomoji.value}`} 
                kaomoji={kaomoji.value} 
                onClick={() => onKaomojiSelect(kaomoji)}
                title={kaomoji.name}
              >
                {copiedValue === kaomoji.value && (
                    <span className="text-cyan-400 font-bold transition-opacity duration-300 opacity-100">
                        Copied!
                    </span>
                )}
              </KaomojiCard>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

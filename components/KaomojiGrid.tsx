
import React from 'react';
import { KaomojiCard } from './KaomojiCard';
import type { Kaomoji, KaomojiCategory } from '../types';

interface KaomojiGridProps {
  categories: KaomojiCategory[];
  onKaomojiSelect: (kaomoji: Kaomoji) => void;
}

export const KaomojiGrid: React.FC<KaomojiGridProps> = ({ categories, onKaomojiSelect }) => {
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {category.kaomojis.map((kaomoji) => (
              <KaomojiCard 
                key={`${category.category}-${kaomoji.value}`} 
                kaomoji={kaomoji.value} 
                onClick={() => onKaomojiSelect(kaomoji)}
                title={kaomoji.name}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

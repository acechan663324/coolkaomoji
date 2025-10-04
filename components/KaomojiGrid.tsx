import React from 'react';
import { KaomojiCard } from './KaomojiCard';
import type { Kaomoji, KaomojiCategory } from '../types';

interface KaomojiGridProps {
  categories: KaomojiCategory[];
  onKaomojiSelect: (kaomoji: Kaomoji) => void;
  copiedValue: string | null;
  onCategorySelect?: (categoryName: string) => void;
}

export const KaomojiGrid: React.FC<KaomojiGridProps> = ({ categories, onKaomojiSelect, copiedValue, onCategorySelect }) => {
  if (categories.length === 0) {
    return (
      <div className="text-center text-slate-500 py-16">
        <p className="text-4xl mb-4">(o´･_･)っ</p>
        <p className="text-xl">No kaomoji found. Try a different search term!</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category.category}>
          <div className="border-b-2 border-slate-200 pb-2 mb-4">
            {onCategorySelect ? (
              <button 
                onClick={() => onCategorySelect(category.category)}
                className="w-full text-left flex justify-between items-center group"
                aria-label={`View all in ${category.category}`}
              >
                <h3 className="text-2xl font-semibold text-cyan-600 group-hover:text-cyan-700 transition-colors">
                  {category.category}
                </h3>
                <span className="text-sm font-semibold text-cyan-500 group-hover:text-cyan-700 flex items-center gap-1 transition-transform group-hover:translate-x-1">
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            ) : (
              <h3 className="text-2xl font-semibold text-cyan-600">
                {category.category}
              </h3>
            )}
          </div>
          <div className="flex flex-wrap items-start justify-start gap-4">
            {category.kaomojis.map((kaomoji) => (
              <KaomojiCard 
                key={`${category.category}-${kaomoji.value}`} 
                kaomoji={kaomoji.value} 
                onClick={() => onKaomojiSelect(kaomoji)}
                title={kaomoji.name}
              >
                {copiedValue === kaomoji.value && (
                    <span className="text-cyan-500 font-bold transition-opacity duration-300 opacity-100">
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

import React from 'react';
import { KaomojiCard } from './KaomojiCard';
import type { Kaomoji, KaomojiTopCategory } from '../types';

interface KaomojiGridProps {
  categories: KaomojiTopCategory[];
  onGoToDetail: (kaomoji: Kaomoji) => void;
  onCopy: (value: string) => void;
}

const createId = (...parts: string[]) => {
  return parts.map(part => part.replace(/\s+/g, '-')).join('-');
};

export const KaomojiGrid: React.FC<KaomojiGridProps> = ({ categories, onGoToDetail, onCopy }) => {
  if (categories.length === 0) {
    return (
      <div className="text-center text-slate-500 py-16">
        <p className="text-4xl mb-4">(o´･_･)っ</p>
        <p className="text-xl">No kaomoji found. Try a different search term!</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {categories.map((topCategory) => (
        <section key={topCategory.category} id={createId(topCategory.category)} className="scroll-mt-24">
           <h2 className="text-4xl font-extrabold text-slate-700 mb-8 border-b-4 border-cyan-300 pb-3">
              {topCategory.category}
           </h2>
           <div className="space-y-12">
            {topCategory.subCategories.map((subCategory) => (
              <div 
                key={subCategory.subCategory}
                id={createId(topCategory.category, subCategory.subCategory)}
                className="scroll-mt-24"
              >
                <h3 className="text-2xl font-bold text-cyan-600">
                  {subCategory.subCategory}
                </h3>
                <p className="mt-2 mb-6 text-slate-600 text-base leading-relaxed">
                  {subCategory.description}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {subCategory.kaomojis.map((kaomoji) => (
                    <KaomojiCard 
                      key={`${subCategory.subCategory}-${kaomoji.name}`}
                      kaomoji={kaomoji}
                      onGoToDetail={onGoToDetail}
                      onCopy={onCopy}
                      className={kaomoji.isLong ? 'col-span-2' : ''}
                    />
                  ))}
                </div>
              </div>
            ))}
           </div>
        </section>
      ))}
    </div>
  );
};
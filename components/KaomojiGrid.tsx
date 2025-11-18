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

const WIDE_VISUAL_LENGTH_THRESHOLD = 20;

const estimateVisualLength = (value: string) => {
  return Array.from(value).reduce((length, char) => {
    const codePoint = char.codePointAt(0) ?? 0;

    if (codePoint > 0xff) {
      return length + 2;
    }

    if (char === ' ') {
      return length + 0.5;
    }

    return length + 1;
  }, 0);
};

const shouldUseWideLayout = (kaomoji: Kaomoji) => {
  if (typeof kaomoji.isLong === 'boolean') {
    return kaomoji.isLong;
  }

  return estimateVisualLength(kaomoji.value) > WIDE_VISUAL_LENGTH_THRESHOLD;
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
           <div className="mb-10 space-y-3">
            <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800">
              {topCategory.category}
            </h2>
            <div className="h-px w-32 bg-gradient-to-r from-slate-300 via-slate-200/60 to-transparent" />
           </div>
           <div className="space-y-12">
            {topCategory.subCategories.map((subCategory) => (
              <div 
                key={subCategory.subCategory}
                id={createId(topCategory.category, subCategory.subCategory)}
                className="scroll-mt-24"
              >
                <h3 className="text-2xl font-semibold text-slate-600">
                  {subCategory.subCategory}
                </h3>
                <p className="mt-2 mb-6 text-slate-600 text-base leading-relaxed">
                  {subCategory.description}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-flow-row-dense">
                  {subCategory.kaomojis.map((kaomoji) => {
                    const isWide = shouldUseWideLayout(kaomoji);
                    return (
                      <KaomojiCard
                        key={`${subCategory.subCategory}-${kaomoji.name}`}
                        kaomoji={kaomoji}
                        onGoToDetail={onGoToDetail}
                        onCopy={onCopy}
                        isWide={isWide}
                        className={isWide ? 'col-span-2' : undefined}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
           </div>
        </section>
      ))}
    </div>
  );
};

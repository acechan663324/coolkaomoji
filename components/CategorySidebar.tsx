import React, { useState } from 'react';
import type { KaomojiTopCategory } from '../types';

interface CategorySidebarProps {
  categories: KaomojiTopCategory[];
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  if (categories.length === 0) {
    return null; // Don't render sidebar if there are no categories (e.g., after a search with no results)
  }

  const createId = (...parts: string[]) => {
    return parts.map(part => part.replace(/\s+/g, '-')).join('-');
  };

  const handleToggleAndScroll = (categoryName: string, id: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="rounded-[24px] border border-white/60 bg-white/60 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">Categories</h3>
      <ul className="space-y-1 border-l border-white/50">
        {categories.map(topCategory => {
          const topCategoryId = createId(topCategory.category);
          const isExpanded = expandedCategories.has(topCategory.category);
          return (
            <li key={topCategory.category}>
              <button
                onClick={() => handleToggleAndScroll(topCategory.category, topCategoryId)}
                className="flex w-full items-center justify-between border-l-2 border-transparent pl-4 py-2 text-left text-sm font-medium text-slate-600 transition-all duration-300 hover:border-cyan-300 hover:text-cyan-500"
                aria-expanded={isExpanded}
                aria-controls={`${topCategoryId}-subnav`}
              >
                <span>{topCategory.category}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 mr-2 transition-transform duration-300 transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isExpanded && (
                <ul id={`${topCategoryId}-subnav`} className="mb-2 mt-1 space-y-1.5">
                  {topCategory.subCategories.map(subCategory => {
                    const subCategoryId = createId(topCategory.category, subCategory.subCategory);
                    return (
                      <li key={subCategory.subCategory}>
                        <a
                          href={`#${subCategoryId}`}
                          onClick={(e) => handleAnchorClick(e, subCategoryId)}
                          className="block rounded-full pl-8 py-1 text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-cyan-500"
                        >
                          {subCategory.subCategory}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

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
    <nav>
      <h3 className="text-lg font-semibold text-slate-800 mb-4 tracking-wide">Categories</h3>
      <ul className="space-y-1 border-l-2 border-slate-200">
        {categories.map(topCategory => {
          const topCategoryId = createId(topCategory.category);
          const isExpanded = expandedCategories.has(topCategory.category);
          return (
            <li key={topCategory.category}>
              <button
                onClick={() => handleToggleAndScroll(topCategory.category, topCategoryId)}
                className="flex justify-between items-center w-full font-semibold text-slate-700 hover:text-cyan-500 transition-all duration-200 -ml-0.5 pl-4 py-1.5 border-l-2 border-transparent hover:border-cyan-500 text-left"
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
                <ul id={`${topCategoryId}-subnav`} className="mt-1 mb-2 space-y-1.5">
                  {topCategory.subCategories.map(subCategory => {
                    const subCategoryId = createId(topCategory.category, subCategory.subCategory);
                    return (
                      <li key={subCategory.subCategory}>
                        <a
                          href={`#${subCategoryId}`}
                          onClick={(e) => handleAnchorClick(e, subCategoryId)}
                          className="block text-sm text-slate-500 hover:text-cyan-500 transition-colors duration-200 pl-8 py-1"
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
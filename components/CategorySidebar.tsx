import React from 'react';
import type { KaomojiTopCategory } from '../types';

interface CategorySidebarProps {
  categories: KaomojiTopCategory[];
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories }) => {
  if (categories.length === 0) {
    return null; // Don't render sidebar if there are no categories (e.g., after a search with no results)
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryName: string) => {
    e.preventDefault();
    const id = categoryName.replace(/\s+/g, '-');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav>
      <h3 className="text-lg font-semibold text-slate-800 mb-4 tracking-wide">Categories</h3>
      <ul className="space-y-2 border-l-2 border-slate-200">
        {categories.map(category => (
          <li key={category.category}>
            <a 
              href={`#${category.category.replace(/\s+/g, '-')}`}
              onClick={(e) => handleAnchorClick(e, category.category)}
              className="block text-slate-600 hover:text-cyan-500 hover:font-semibold transition-all duration-200 -ml-0.5 pl-4 border-l-2 border-transparent hover:border-cyan-500"
            >
              {category.category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
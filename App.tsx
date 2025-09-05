
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { KaomojiGrid } from './components/KaomojiGrid';
import { Generator } from './components/Generator';
import { Footer } from './components/Footer';
import { kaomojiData } from './constants/kaomoji';
import type { KaomojiCategory } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKaomojis = useMemo<KaomojiCategory[]>(() => {
    if (!searchTerm.trim()) {
      return kaomojiData;
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    
    return kaomojiData
      .map(category => {
        const filtered = category.kaomojis.filter(
          kaomoji =>
            kaomoji.name.toLowerCase().includes(lowercasedFilter) ||
            kaomoji.value.includes(lowercasedFilter)
        );

        if (filtered.length > 0) {
          return { ...category, kaomojis: filtered };
        }
        return null;
      })
      .filter((category): category is KaomojiCategory => category !== null);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Header />
        
        <div className="my-12">
           <Generator />
        </div>

        <div className="my-12">
          <h2 className="text-3xl font-bold text-center mb-2 text-cyan-400">Discover Kaomoji</h2>
          <p className="text-center text-slate-400 mb-6">Search our collection or browse by category.</p>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        
        <KaomojiGrid categories={filteredKaomojis} />
      </main>
      <Footer />
    </div>
  );
};

export default App;

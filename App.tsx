
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { KaomojiGrid } from './components/KaomojiGrid';
import { Generator } from './components/Generator';
import { Footer } from './components/Footer';
import { DetailPage } from './components/DetailPage';
import { kaomojiData } from './constants/kaomoji';
import type { Kaomoji, KaomojiCategory } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKaomoji, setSelectedKaomoji] = useState<Kaomoji | null>(null);

  const exampleSearches = ['happy', 'crying', 'cat', 'dance', 'shrug', 'love'];

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

  const handleSelectKaomoji = (kaomoji: Kaomoji) => {
    setSelectedKaomoji(kaomoji);
    window.scrollTo(0, 0); // Scroll to top on view change
  };

  const handleGoBack = () => {
    setSelectedKaomoji(null);
  };

  if (selectedKaomoji) {
    return <DetailPage kaomoji={selectedKaomoji} onBack={handleGoBack} />;
  }

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
          <div className="max-w-lg mx-auto mt-4 text-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {exampleSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm hover:bg-slate-600 transition-colors duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <KaomojiGrid categories={filteredKaomojis} onKaomojiSelect={handleSelectKaomoji} />
      </main>
      <Footer />
    </div>
  );
};

export default App;

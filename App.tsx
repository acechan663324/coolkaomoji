import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { KaomojiGrid } from './components/KaomojiGrid';
import { Generator } from './components/Generator';
import { Footer } from './components/Footer';
import { DetailPage } from './components/DetailPage';
import { kaomojiData } from './constants/kaomoji';
import type { Kaomoji, KaomojiCategory } from './types';
import { AdsenseAd } from './components/AdsenseAd';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKaomoji, setSelectedKaomoji] = useState<Kaomoji | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const exampleSearches = ['happy', 'crying', 'cat', 'dance', 'shrug', 'love'];

  useEffect(() => {
    // Set the default title when on the main page, or when returning to it.
    if (!selectedKaomoji) {
      document.title = 'Kaomoji World - AI Kaomoji Generator & Finder';
    }
  }, [selectedKaomoji]);

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
    if (copiedValue) return; // Prevent multiple clicks while feedback is shown

    navigator.clipboard.writeText(kaomoji.value);
    setCopiedValue(kaomoji.value);

    // Navigate after a short delay to show copy feedback
    setTimeout(() => {
        setCopiedValue(null);
        setSelectedKaomoji(kaomoji);
        window.scrollTo(0, 0); // Scroll to top on view change
    }, 1000);
  };

  const handleGoBack = () => {
    setSelectedKaomoji(null);
  };

  if (selectedKaomoji) {
    return <DetailPage kaomoji={selectedKaomoji} onBack={handleGoBack} />;
  }

  return (
    <div className="bg-slate-900 text-white font-sans relative">
       {/* Left Ad Sidebar */}
      <aside className="hidden 2xl:block fixed top-20 left-8 w-[160px] h-[600px]">
        <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
      </aside>

      {/* Right Ad Sidebar */}
      <aside className="hidden 2xl:block fixed top-20 right-8 w-[160px] h-[600px]">
        <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
      </aside>

      <div className="container mx-auto px-4 py-8">
        <Header />

        <main className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-3 space-y-10">
            <section>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 justify-start">
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
            </section>
            
            <KaomojiGrid 
              categories={filteredKaomojis} 
              onKaomojiSelect={handleSelectKaomoji}
              copiedValue={copiedValue}
            />
          </div>
          
          {/* Right Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-8 h-fit">
            <Generator />
          </aside>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { KaomojiGrid } from './components/KaomojiGrid';
import { Generator } from './components/Generator';
import { Footer } from './components/Footer';
import { DetailPage } from './components/DetailPage';
import { kaomojiData } from './constants/kaomoji';
import type { Kaomoji, KaomojiCategory } from './types';
import { InterstitialAd } from './components/InterstitialAd';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKaomoji, setSelectedKaomoji] = useState<Kaomoji | null>(null);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [kaomojiForDetail, setKaomojiForDetail] = useState<Kaomoji | null>(null);

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
    setKaomojiForDetail(kaomoji);
    setShowInterstitial(true);
  };

  const handleInterstitialClose = () => {
    setShowInterstitial(false);
    if (kaomojiForDetail) {
      setSelectedKaomoji(kaomojiForDetail);
      setKaomojiForDetail(null);
      window.scrollTo(0, 0); // Scroll to top on view change
    }
  };

  const handleGoBack = () => {
    setSelectedKaomoji(null);
  };

  if (selectedKaomoji) {
    return <DetailPage kaomoji={selectedKaomoji} onBack={handleGoBack} />;
  }

  return (
    <div className="bg-slate-900 text-white font-sans">
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
            
            <KaomojiGrid categories={filteredKaomojis} onKaomojiSelect={handleSelectKaomoji} />
          </div>
          
          {/* Right Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-8 h-fit">
            <Generator />
          </aside>
        </main>
      </div>
      
      <Footer />
      
      {/* Interstitial Ad Overlay */}
      {showInterstitial && <InterstitialAd onClose={handleInterstitialClose} />}
    </div>
  );
};

export default App;
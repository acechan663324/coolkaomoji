import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { KaomojiGrid } from './components/KaomojiGrid';
import { Generator } from './components/Generator';
import { Footer } from './components/Footer';
import { DetailPage } from './components/DetailPage';
import { kaomojiData } from './constants/kaomoji';
import type { Kaomoji, KaomojiTopCategory } from './types';
import { AdsenseAd } from './components/AdsenseAd';
import { Navigation } from './components/Navigation';
import { CategorySidebar } from './components/CategorySidebar';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKaomoji, setSelectedKaomoji] = useState<Kaomoji | null>(null);

  const exampleSearches = ['happy', 'crying', 'cat', 'dance', 'shrug', 'love'];

  useEffect(() => {
    if (!selectedKaomoji) {
      document.title = 'Kaomoji World - AI Kaomoji Generator & Finder';
    }
  }, [selectedKaomoji]);

  const filteredKaomojis = useMemo<KaomojiTopCategory[]>(() => {
    if (!searchTerm.trim()) {
      return kaomojiData;
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    
    return kaomojiData
      .map(topCategory => {
        const filteredSubCategories = topCategory.subCategories.map(subCategory => {
          const filteredKaomojis = subCategory.kaomojis.filter(
            kaomoji =>
              kaomoji.name.toLowerCase().includes(lowercasedFilter) ||
              kaomoji.value.includes(lowercasedFilter)
          );
          return { ...subCategory, kaomojis: filteredKaomojis };
        }).filter(subCategory => subCategory.kaomojis.length > 0);
        
        if (filteredSubCategories.length > 0) {
          return { ...topCategory, subCategories: filteredSubCategories };
        }
        return null;
      })
      .filter((category): category is KaomojiTopCategory => category !== null);
  }, [searchTerm]);
  
  const handleGoToDetail = (kaomoji: Kaomoji) => {
    setSelectedKaomoji(kaomoji);
    window.scrollTo(0, 0);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    // Visual feedback is now handled within KaomojiCard
  };

  const handleGoHome = () => {
    setSelectedKaomoji(null);
    setSearchTerm('');
    window.scrollTo(0, 0);
  };

  const handleGoBackFromDetail = () => {
    setSelectedKaomoji(null);
  };

  let pageContent;

  if (selectedKaomoji) {
    pageContent = (
      <DetailPage 
        kaomoji={selectedKaomoji} 
        onBack={handleGoBackFromDetail}
        onKaomojiSelect={handleGoToDetail} 
      />
    );
  } else {
    // Main page content
    pageContent = (
      <>
        <Header />
        <main className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
              <CategorySidebar categories={filteredKaomojis} />
          </aside>

          <div className="lg:col-span-3 space-y-10">
            <section>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 justify-start">
                  {exampleSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200 transition-colors duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            
            <KaomojiGrid 
              categories={filteredKaomojis} 
              onGoToDetail={handleGoToDetail}
              onCopy={handleCopy}
            />
          </div>
          
          <aside id="generator" className="lg:col-span-1 lg:sticky lg:top-24 h-fit scroll-mt-24">
            <Generator />
          </aside>
        </main>
      </>
    );
  }

  return (
    <div className="bg-gray-50 text-slate-800 font-sans min-h-screen flex flex-col">
       <Navigation onHomeClick={handleGoHome} />

       {/* Ad Sidebars - placed here to be relative to the viewport */}
      <aside className="hidden 2xl:block fixed top-20 left-8 w-[160px] h-[600px] z-10">
        <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
      </aside>
      <aside className="hidden 2xl:block fixed top-20 right-8 w-[160px] h-[600px] z-10">
        <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
      </aside>

      <div className="container mx-auto px-4 py-8 flex-grow">
        {pageContent}
      </div>
      
      <Footer />
    </div>
  );
};

export default App;
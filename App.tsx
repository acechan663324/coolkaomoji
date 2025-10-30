
import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { KaomojiGrid } from './components/KaomojiGrid';
import {
  Generator,
  type GeneratorPreviewRequest,
  type GeneratorSettings,
  createDefaultGeneratorSettings,
} from './components/Generator';
import { Footer } from './components/Footer';
import { DetailPage } from './components/DetailPage';
import { kaomojiData } from './constants/kaomoji';
import type { Kaomoji, KaomojiTopCategory, Page } from './types';
import { AdsenseAd } from './components/AdsenseAd';
import { Navigation } from './components/Navigation';
import { CategorySidebar } from './components/CategorySidebar';
import { HowToUsePage } from './components/HowToUsePage';
import { BlogPage } from './components/BlogPage';
import { EmojiPage } from './components/EmojiPage';
import { SymbolPage } from './components/SymbolPage';
import { KaomojiInfo } from './components/KaomojiInfo';
import { AIArtGeneratorPage } from './components/AIArtGeneratorPage';
import { GeneratorPage } from './components/GeneratorPage';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKaomoji, setSelectedKaomoji] = useState<Kaomoji | null>(null);
  const [generatorConfig, setGeneratorConfig] = useState<{
    prompt: string;
    settings: GeneratorSettings;
    autoGenerateToken: number;
  }>(() => ({
    prompt: '',
    settings: createDefaultGeneratorSettings(),
    autoGenerateToken: 0,
  }));

  const exampleSearches = ['happy', 'crying', 'cat', 'dance', 'shrug', 'love'];

  useEffect(() => {
    if (activePage === 'detail' && selectedKaomoji) {
      document.title = `${selectedKaomoji.name} | Kaomoji World`;
      return;
    }
    if (activePage === 'generator') {
      document.title = 'AI Kaomoji Generator - Kaomoji World';
      return;
    }
    document.title = 'Kaomoji World - AI Kaomoji Generator & Finder';
  }, [activePage, selectedKaomoji]);

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
  
  const handleNavigate = (page: Page) => {
    setActivePage(page);
    setSelectedKaomoji(null);
    setSearchTerm('');
    window.scrollTo(0, 0);
  };
  
  const handleGoToDetail = (kaomoji: Kaomoji) => {
    setSelectedKaomoji(kaomoji);
    setActivePage('detail');
    window.scrollTo(0, 0);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const handleGeneratorPreviewSubmit = (request: GeneratorPreviewRequest) => {
    setGeneratorConfig((prev) => ({
      prompt: request.prompt,
      settings: { ...request.settings },
      autoGenerateToken: prev.autoGenerateToken + 1,
    }));
    handleNavigate('generator');
  };

  const renderPageContent = () => {
    if (activePage === 'detail' && selectedKaomoji) {
      return (
        <DetailPage 
          kaomoji={selectedKaomoji} 
          onBack={() => handleNavigate('home')}
          onKaomojiSelect={handleGoToDetail} 
        />
      );
    }

    if (activePage === 'how-to-use') {
      return <HowToUsePage onBack={() => handleNavigate('home')} />;
    }
    if (activePage === 'blog') {
      return <BlogPage onBack={() => handleNavigate('home')} />;
    }
    if (activePage === 'emoji') {
      return <EmojiPage onBack={() => handleNavigate('home')} />;
    }
    if (activePage === 'symbol') {
      return <SymbolPage onBack={() => handleNavigate('home')} />;
    }
    if (activePage === 'ai-art') {
      return <AIArtGeneratorPage onBack={() => handleNavigate('home')} />;
    }
    if (activePage === 'generator') {
      return (
        <GeneratorPage
          initialPrompt={generatorConfig.prompt}
          initialSettings={generatorConfig.settings}
          autoGenerateToken={generatorConfig.autoGenerateToken}
          onBack={() => handleNavigate('home')}
        />
      );
    }

    // Default to 'home' page
    return (
      <>
        <Header />
        <main className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 h-fit">
              <CategorySidebar categories={filteredKaomojis} />
              <KaomojiInfo />
            </div>
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
            
            <section>
              <div className="bg-white border-2 border-fuchsia-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-sm font-bold uppercase text-fuchsia-500 tracking-wider">From the Blog</h3>
                <h2 className="text-2xl font-bold text-slate-800 mt-2">Unleash Your Inner Artist: Introducing the AI Digital Art Generator!</h2>
                <p className="text-slate-600 mt-3">
                  Transform your text descriptions into unique and stunning digital art. Learn how to use our new AI-powered tool to create everything from serene landscapes to cyberpunk cities, all with symbols and emojis.
                </p>
                <button 
                  onClick={() => handleNavigate('blog')}
                  className="mt-4 px-5 py-2 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-700 transition duration-300"
                >
                  Read More...
                </button>
              </div>
            </section>

            <KaomojiGrid 
              categories={filteredKaomojis} 
              onGoToDetail={handleGoToDetail}
              onCopy={handleCopy}
            />
          </div>
          
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit scroll-mt-24">
            <Generator
              mode="preview"
              initialPrompt={generatorConfig.prompt}
              initialSettings={generatorConfig.settings}
              onPreviewSubmit={handleGeneratorPreviewSubmit}
            />
          </aside>
        </main>
      </>
    );
  };

  return (
    <div className="bg-gray-50 text-slate-800 font-sans min-h-screen flex flex-col">
       <Navigation onNavigate={handleNavigate} />

       {/* Ad Sidebars - placed here to be relative to the viewport */}
      <aside className="hidden 2xl:block fixed top-20 left-8 w-[160px] h-[600px] z-10">
        <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
      </aside>
      <aside className="hidden 2xl:block fixed top-20 right-8 w-[160px] h-[600px] z-10">
        <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
      </aside>

      <div className="container mx-auto px-4 py-8 flex-grow">
        {renderPageContent()}
      </div>
      
      <Footer />
    </div>
  );
};

export default App;

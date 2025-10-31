
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
                <div className="flex flex-wrap justify-start gap-3">
                  {exampleSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="rounded-full border border-white/50 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:text-cyan-500"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            
            <section>
            <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/60 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.15)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_40px_120px_rgba(15,23,42,0.22)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,212,250,0.28),_transparent_60%)]" />
                <div className="relative">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400">From the blog</h3>
                  <h2 className="mt-4 text-2xl font-semibold text-slate-800 sm:text-3xl">Unleash Your Inner Artist: Introducing the AI Digital Art Generator!</h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Transform your text descriptions into unique and stunning digital art. Learn how to use our new AI-powered tool to create everything from serene landscapes to cyberpunk cities, all with symbols and emojis.
                  </p>
                  <button 
                    onClick={() => handleNavigate('blog')}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(14,165,233,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Read More
                  </button>
                </div>
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f4f6ff] via-[#f9fbff] to-[#eef4ff] text-slate-800 font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 -left-32 h-80 w-80 rounded-full bg-[#9be7fb]/60 blur-3xl" />
        <div className="absolute top-1/4 right-[-12%] h-[340px] w-[340px] rounded-full bg-[#fbc2eb]/50 blur-[80px]" />
        <div className="absolute bottom-[-18%] left-[20%] h-[420px] w-[420px] rounded-full bg-[#c7d8ff]/60 blur-[100px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navigation onNavigate={handleNavigate} />

        {/* Ad Sidebars - placed here to be relative to the viewport */}
        <aside className="hidden 2xl:block fixed top-24 left-10 z-10 w-[160px]">
          <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/50 shadow-[0_20px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl">
            <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
          </div>
        </aside>
        <aside className="hidden 2xl:block fixed top-24 right-10 z-10 w-[160px]">
          <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/50 shadow-[0_20px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl">
            <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
          </div>
        </aside>

        <div className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/60 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.12)] backdrop-blur-3xl sm:p-10">
              <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-b-[32px] bg-gradient-to-b from-white/70 via-white/40 to-transparent" />
              <div className="relative">
                {renderPageContent()}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;

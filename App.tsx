import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AdsenseAd } from './components/AdsenseAd';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { HomeRoute } from './pages/HomeRoute';
import { HowToUseRoute } from './pages/HowToUseRoute';
import { BlogRoute } from './pages/BlogRoute';
import { EmojiRoute } from './pages/EmojiRoute';
import { SymbolRoute } from './pages/SymbolRoute';
import { AIArtRoute } from './pages/AIArtRoute';
import { GeneratorRoute } from './pages/GeneratorRoute';
import { KaomojiDetailRoute } from './pages/KaomojiDetailRoute';
import { NotFoundRoute } from './pages/NotFoundRoute';

const AppLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f4f6ff] via-[#f9fbff] to-[#eef4ff] text-slate-800 font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 -left-32 h-80 w-80 rounded-full bg-[#9be7fb]/60 blur-3xl" />
        <div className="absolute top-1/4 right-[-12%] h-[340px] w-[340px] rounded-full bg-[#fbc2eb]/50 blur-[80px]" />
        <div className="absolute bottom-[-18%] left-[20%] h-[420px] w-[420px] rounded-full bg-[#c7d8ff]/60 blur-[100px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navigation />
        <ScrollToTop />

        <aside className="fixed left-10 top-24 hidden w-[160px] 2xl:block">
          <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/50 shadow-[0_20px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl">
            <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
          </div>
        </aside>
        <aside className="fixed right-10 top-24 hidden w-[160px] 2xl:block">
          <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/50 shadow-[0_20px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl">
            <AdsenseAd client="ca-pub-3685000706717214" slot="2760671227" style={{ width: '160px', height: '600px' }} />
          </div>
        </aside>

        <div className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/60 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.12)] backdrop-blur-3xl sm:p-10">
              <div className="pointer-events-none absolute inset-x-16 top-0 h-24 rounded-b-[32px] bg-gradient-to-b from-white/70 via-white/40 to-transparent" />
              <div className="relative">
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomeRoute />} />
        <Route path="how-to-use" element={<HowToUseRoute />} />
        <Route path="blog" element={<BlogRoute />} />
        <Route path="ai-art" element={<AIArtRoute />} />
        <Route path="generator" element={<GeneratorRoute />} />
        <Route path="emoji" element={<EmojiRoute />} />
        <Route path="symbol" element={<SymbolRoute />} />
        <Route path="kaomoji/:slug" element={<KaomojiDetailRoute />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Route>
    </Routes>
  );
};

export default App;

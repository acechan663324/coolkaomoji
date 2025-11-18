import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { KaomojiGrid } from '../components/KaomojiGrid';
import { CategorySidebar } from '../components/CategorySidebar';
import { KaomojiInfo } from '../components/KaomojiInfo';
import { Generator, type GeneratorPreviewRequest, createDefaultGeneratorSettings } from '../components/Generator';
import { kaomojiData } from '../constants/kaomoji';
import { createKaomojiSlug } from '../utils/slug';
import type { Kaomoji, KaomojiTopCategory } from '../types';

const exampleSearches = ['happy', 'crying', 'cat', 'dance', 'shrug', 'love'];

export const HomeRoute: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [generatorPreviewConfig, setGeneratorPreviewConfig] = useState(() => ({
    prompt: '',
    settings: createDefaultGeneratorSettings(),
    autoGenerateToken: 0,
  }));

  const navigate = useNavigate();

  const filteredKaomojis = useMemo<KaomojiTopCategory[]>(() => {
    if (!searchTerm.trim()) {
      return kaomojiData;
    }

    const lowercasedFilter = searchTerm.toLowerCase();

    return kaomojiData
      .map((topCategory) => {
        const filteredSubCategories = topCategory.subCategories
          .map((subCategory) => {
            const filteredKaomojis = subCategory.kaomojis.filter(
              (kaomoji) =>
                kaomoji.name.toLowerCase().includes(lowercasedFilter) ||
                kaomoji.value.includes(lowercasedFilter),
            );
            return { ...subCategory, kaomojis: filteredKaomojis };
          })
          .filter((subCategory) => subCategory.kaomojis.length > 0);

        if (filteredSubCategories.length > 0) {
          return { ...topCategory, subCategories: filteredSubCategories };
        }
        return null;
      })
      .filter((category): category is KaomojiTopCategory => category !== null);
  }, [searchTerm]);

  const handleGoToDetail = (kaomoji: Kaomoji) => {
    const slug = createKaomojiSlug(kaomoji);
    navigate(`/kaomoji/${slug}`, {
      state: { from: 'home' },
    });
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).catch(() => {
      /* gracefully ignore copy failures */
    });
  };

  const handleGeneratorPreviewSubmit = (request: GeneratorPreviewRequest) => {
    setGeneratorPreviewConfig((prev) => ({
      prompt: request.prompt,
      settings: { ...request.settings },
      autoGenerateToken: prev.autoGenerateToken + 1,
    }));

    navigate('/generator', {
      state: {
        prompt: request.prompt,
        settings: { ...request.settings },
        autoGenerateToken: Date.now(),
      },
    });
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kaomoji World',
    url: 'https://kaomoji-world.example.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kaomoji-world.example.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Helmet>
        <title>Kaomoji World - AI Kaomoji Generator & Finder</title>
        <meta
          name="description"
          content="Search, find, and generate thousands of curated kaomoji. Explore detailed categories, copy your favorites, or craft new emoticon art with AI."
        />
        <link rel="canonical" href="https://kaomoji-world.example.com/" />
        <script type="application/ld+json">{JSON.stringify(webSiteJsonLd)}</script>
      </Helmet>

      <Header />
      <main className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 h-fit space-y-6">
            <CategorySidebar categories={filteredKaomojis} />
            <KaomojiInfo />
          </div>
        </aside>

        <div className="space-y-10 lg:col-span-3">
          <section>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="mt-4">
              <div className="flex flex-wrap justify-start gap-3">
                {exampleSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="rounded-full border border-white/50 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate-600 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:text-cyan-500"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/60 p-8 transition-transform duration-500 hover:-translate-y-1">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,212,250,0.28),_transparent_60%)]" />
              <div className="relative">
                <h3 className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400">From the blog</h3>
                <h2 className="mt-4 text-2xl font-semibold text-slate-800 sm:text-3xl">
                  Unleash Your Inner Artist: Introducing the AI Digital Art Generator!
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Transform your text descriptions into unique and stunning digital art. Learn how to use our new AI-powered
                  tool to create everything from serene landscapes to cyberpunk cities, all with symbols and emojis.
                </p>
                <button
                  onClick={() => navigate('/blog')}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 px-6 py-2 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
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
            showCategoryLinks
          />
        </div>

        <aside className="h-fit scroll-mt-24 lg:sticky lg:top-24 lg:col-span-1">
          <Generator
            mode="preview"
            initialPrompt={generatorPreviewConfig.prompt}
            initialSettings={generatorPreviewConfig.settings}
            onPreviewSubmit={handleGeneratorPreviewSubmit}
          />
        </aside>
      </main>
    </>
  );
};

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { KaomojiGrid } from '../components/KaomojiGrid';
import type { Kaomoji } from '../types';
import { createKaomojiSlug } from '../utils/slug';
import { findCategoryBySlug } from '../constants/categoryIndex';
import { NotFoundRoute } from './NotFoundRoute';

export const CategoryRoute: React.FC = () => {
  const { categorySlug = '' } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();

  const category = categorySlug ? findCategoryBySlug(categorySlug) : undefined;

  if (!category) {
    return <NotFoundRoute />;
  }

  const featuredSubCategories = category.subCategories.slice(0, 3).map((sub) => sub.subCategory);
  const metaDescription = `Dive into ${category.category.toLowerCase()} kaomoji, including ${featuredSubCategories.join(
    ', ',
  )}, and copy expressive text faces in one click.`;

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.category} Kaomoji`,
    description: metaDescription,
    url: `https://kaomoji-world.example.com/category/${categorySlug}`,
    hasPart: category.subCategories.map((subCategory) => ({
      '@type': 'Collection',
      name: `${subCategory.subCategory} ${category.category} kaomoji`,
      description: subCategory.description,
      numberOfItems: subCategory.kaomojis.length,
    })),
  };

  const handleGoToDetail = (kaomoji: Kaomoji) => {
    const slug = createKaomojiSlug(kaomoji);
    navigate(`/kaomoji/${slug}`, {
      state: { from: 'category', categorySlug },
    });
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).catch(() => {
      /* ignore clipboard failures */
    });
  };

  const totalKaomojis = category.subCategories.reduce((sum, subCategory) => sum + subCategory.kaomojis.length, 0);

  return (
    <>
      <Helmet>
        <title>{`${category.category} Kaomoji | Kaomoji World`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://kaomoji-world.example.com/category/${categorySlug}`} />
        <script type="application/ld+json">{JSON.stringify(collectionJsonLd)}</script>
      </Helmet>

      <section className="mb-10 rounded-[28px] border border-white/60 bg-white/60 px-6 py-8 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400">Kaomoji Category</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-800 sm:text-4xl">{category.category}</h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Featuring {totalKaomojis}+ curated kaomoji across {category.subCategories.length} moods and scenarios.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-full border border-white/60 bg-white/70 px-5 py-2 text-sm font-medium text-slate-600 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 hover:text-cyan-500"
            >
              ← All categories
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Scroll to top
            </button>
          </div>
        </div>
        {featuredSubCategories.length > 0 && (
          <p className="mt-4 text-sm text-slate-500">
            Popular sections: {featuredSubCategories.join(', ')}.
          </p>
        )}
      </section>

      <KaomojiGrid categories={[category]} onGoToDetail={handleGoToDetail} onCopy={handleCopy} />
    </>
  );
};

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailPage } from '../components/DetailPage';
import { findKaomojiBySlug } from '../constants/kaomojiIndex';
import { createKaomojiSlug } from '../utils/slug';
import type { Kaomoji } from '../types';
import { NotFoundRoute } from './NotFoundRoute';

export const KaomojiDetailRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return <NotFoundRoute />;
  }

  const entry = findKaomojiBySlug(slug);

  if (!entry) {
    return <NotFoundRoute />;
  }

  const { kaomoji, topCategory, subCategory, description } = entry;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${kaomoji.name} ${kaomoji.value}`,
    description: description || `Discover the meaning and usage of the ${kaomoji.name} kaomoji.`,
    inLanguage: 'en',
    keywords: ['kaomoji', 'text face', 'japanese emoticon', topCategory, subCategory],
    isPartOf: {
      '@type': 'WebSite',
      name: 'Kaomoji World',
      url: 'https://kaomoji-world.example.com/',
    },
  };

  const handleBack = () => navigate('/');
  const handleSelect = (nextKaomoji: Kaomoji) => {
    const nextSlug = createKaomojiSlug(nextKaomoji);
    navigate(`/kaomoji/${nextSlug}`, { replace: false });
  };

  const metaDescription = description
    ? `${kaomoji.name} ${kaomoji.value} — ${description}`
    : `Understand how to use the ${kaomoji.name} kaomoji ${kaomoji.value} across chat, social platforms, and creative expressions.`;

  return (
    <>
      <Helmet>
        <title>{`${kaomoji.name} ${kaomoji.value} | Kaomoji World`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://kaomoji-world.example.com/kaomoji/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <DetailPage kaomoji={kaomoji} onBack={handleBack} onKaomojiSelect={handleSelect} />
    </>
  );
};

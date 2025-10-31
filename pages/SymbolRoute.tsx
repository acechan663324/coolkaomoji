import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SymbolPage } from '../components/SymbolPage';

export const SymbolRoute: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Special Symbols Library | Kaomoji World</title>
        <meta
          name="description"
          content="Discover decorative symbols, currency icons, arrows, geometric shapes, and more. Copy any symbol instantly for creative projects."
        />
        <link rel="canonical" href="https://kaomoji-world.example.com/symbol" />
      </Helmet>

      <SymbolPage onBack={() => navigate('/')} />
    </>
  );
};

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { AIArtGeneratorPage } from '../components/AIArtGeneratorPage';

export const AIArtRoute: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>AI Text Art Generator | Kaomoji World</title>
        <meta
          name="description"
          content="Generate expressive ASCII and emoji illustrations with our AI art generator. Transform creative prompts into stunning text-based artwork."
        />
        <link rel="canonical" href="https://kaomoji-world.example.com/ai-art" />
      </Helmet>

      <AIArtGeneratorPage onBack={() => navigate('/')} />
    </>
  );
};

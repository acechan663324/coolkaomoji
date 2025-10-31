import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { GeneratorPage } from '../components/GeneratorPage';
import type { GeneratorSettings } from '../components/Generator';

interface GeneratorLocationState {
  prompt?: string;
  settings?: GeneratorSettings;
  autoGenerateToken?: number;
}

export const GeneratorRoute: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { prompt, settings, autoGenerateToken } = useMemo(() => {
    const state = (location.state as GeneratorLocationState | null) ?? undefined;
    return {
      prompt: state?.prompt ?? '',
      settings: state?.settings,
      autoGenerateToken: state?.autoGenerateToken,
    };
  }, [location.state]);

  return (
    <>
      <Helmet>
        <title>AI Kaomoji Generator | Kaomoji World</title>
        <meta
          name="description"
          content="Describe a mood and let our AI generator craft expressive kaomoji. Adjust tone and complexity for perfectly tailored emoticons."
        />
        <link rel="canonical" href="https://kaomoji-world.example.com/generator" />
      </Helmet>

      <GeneratorPage
        initialPrompt={prompt}
        initialSettings={settings}
        autoGenerateToken={autoGenerateToken}
        onBack={() => navigate('/')}
      />
    </>
  );
};

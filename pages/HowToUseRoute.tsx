import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { HowToUsePage } from '../components/HowToUsePage';

export const HowToUseRoute: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>How to Use Kaomoji World | Kaomoji World</title>
        <meta
          name="description"
          content="Learn how to search, copy, and create kaomoji with Kaomoji World. Follow step-by-step tips to use emotive text faces anywhere."
        />
        <link rel="canonical" href="https://kaomoji-world.example.com/how-to-use" />
      </Helmet>

      <HowToUsePage onBack={() => navigate('/')} />
    </>
  );
};

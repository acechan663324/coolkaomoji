import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { EmojiPage } from '../components/EmojiPage';

export const EmojiRoute: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Emoji Library & Picker | Kaomoji World</title>
        <meta
          name="description"
          content="Browse curated emoji collections, search by mood or keyword, and copy instantly for use across social, chat, and content creation."
        />
        <link rel="canonical" href="https://kaomoji-world.example.com/emoji" />
      </Helmet>

      <EmojiPage onBack={() => navigate('/')} />
    </>
  );
};

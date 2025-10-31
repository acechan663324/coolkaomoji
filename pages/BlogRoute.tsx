import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { BlogPage } from '../components/BlogPage';

export const BlogRoute: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Kaomoji Blog & Guides | Kaomoji World</title>
        <meta
          name="description"
          content="Read tutorials, inspiration, and cultural history behind kaomoji, emoji, and text art. Stay updated with the latest tools and tips from Kaomoji World."
        />
        <link rel="canonical" href="https://kaomoji-world.example.com/blog" />
      </Helmet>

      <BlogPage onBack={() => navigate('/')} />
    </>
  );
};

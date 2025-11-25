import React from 'react';
import { HomeRoute } from '../pages/HomeRoute';
import { HowToUseRoute } from '../pages/HowToUseRoute';
import { BlogRoute } from '../pages/BlogRoute';
import { AIArtRoute } from '../pages/AIArtRoute';
import { GeneratorRoute } from '../pages/GeneratorRoute';
import { EmojiRoute } from '../pages/EmojiRoute';
import { SymbolRoute } from '../pages/SymbolRoute';
import { CategoryRoute } from '../pages/CategoryRoute';
import { KaomojiDetailRoute } from '../pages/KaomojiDetailRoute';
import { NotFoundRoute } from '../pages/NotFoundRoute';

export interface MenuRouteConfig {
  key: string;
  path: string;
  label: string;
  element: React.ReactElement;
  index?: boolean;
}

export const menuRoutes: MenuRouteConfig[] = [
  {
    key: 'home',
    path: '',
    label: 'Home',
    element: <HomeRoute />,
    index: true,
  },
  {
    key: 'how-to-use',
    path: 'how-to-use',
    label: 'How to Use',
    element: <HowToUseRoute />,
  },
  {
    key: 'blog',
    path: 'blog',
    label: 'Blog',
    element: <BlogRoute />,
  },
  {
    key: 'ai-art',
    path: 'ai-art',
    label: 'AI Art',
    element: <AIArtRoute />,
  },
  {
    key: 'generator',
    path: 'generator',
    label: 'Kaomoji Gen',
    element: <GeneratorRoute />,
  },
  {
    key: 'emoji',
    path: 'emoji',
    label: 'Emoji',
    element: <EmojiRoute />,
  },
  {
    key: 'symbol',
    path: 'symbol',
    label: 'Symbol',
    element: <SymbolRoute />,
  },
];

interface SupplementalRouteConfig {
  key: string;
  path: string;
  element: React.ReactElement;
}

export const supplementalRoutes: SupplementalRouteConfig[] = [
  {
    key: 'category',
    path: 'category/:categorySlug',
    element: <CategoryRoute />,
  },
  {
    key: 'kaomoji-detail',
    path: 'kaomoji/:slug',
    element: <KaomojiDetailRoute />,
  },
  {
    key: 'not-found',
    path: '*',
    element: <NotFoundRoute />,
  },
];

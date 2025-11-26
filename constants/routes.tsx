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
import { menuRouteMeta, supplementalRouteMeta } from './routeMeta';

const menuRouteComponents: Record<string, React.ReactElement> = {
  home: <HomeRoute />,
  'how-to-use': <HowToUseRoute />,
  blog: <BlogRoute />,
  'ai-art': <AIArtRoute />,
  generator: <GeneratorRoute />,
  emoji: <EmojiRoute />,
  symbol: <SymbolRoute />,
};

const supplementalRouteComponents: Record<string, React.ReactElement> = {
  category: <CategoryRoute />,
  'kaomoji-detail': <KaomojiDetailRoute />,
  'not-found': <NotFoundRoute />,
};

export interface MenuRouteConfig {
  key: string;
  path: string;
  label: string;
  element: React.ReactElement;
  index?: boolean;
}

export const menuRoutes: MenuRouteConfig[] = menuRouteMeta.map((meta) => {
  const element = menuRouteComponents[meta.key];
  if (!element) {
    throw new Error(`Missing component mapping for menu route "${meta.key}"`);
  }
  return { ...meta, element };
});

interface SupplementalRouteConfig {
  key: string;
  path: string;
  element: React.ReactElement;
}

export const supplementalRoutes: SupplementalRouteConfig[] = supplementalRouteMeta.map((meta) => {
  const element = supplementalRouteComponents[meta.key];
  if (!element) {
    throw new Error(`Missing component mapping for supplemental route "${meta.key}"`);
  }
  return { ...meta, element };
});

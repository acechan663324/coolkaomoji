export interface MenuRouteMeta {
  key: string;
  path: string;
  label: string;
  index?: boolean;
}

export const menuRouteMeta: MenuRouteMeta[] = [
  {
    key: 'home',
    path: '',
    label: 'Home',
    index: true,
  },
  {
    key: 'how-to-use',
    path: 'how-to-use',
    label: 'How to Use',
  },
  {
    key: 'blog',
    path: 'blog',
    label: 'Blog',
  },
  {
    key: 'ai-art',
    path: 'ai-art',
    label: 'AI Art',
  },
  {
    key: 'generator',
    path: 'generator',
    label: 'Kaomoji Gen',
  },
  {
    key: 'emoji',
    path: 'emoji',
    label: 'Emoji',
  },
  {
    key: 'symbol',
    path: 'symbol',
    label: 'Symbol',
  },
];

export interface SupplementalRouteMeta {
  key: string;
  path: string;
}

export const supplementalRouteMeta: SupplementalRouteMeta[] = [
  {
    key: 'category',
    path: 'category/:categorySlug',
  },
  {
    key: 'kaomoji-detail',
    path: 'kaomoji/:slug',
  },
  {
    key: 'not-found',
    path: '*',
  },
];

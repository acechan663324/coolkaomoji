import type { Kaomoji } from '../types';

/**
 * Converts arbitrary text into an SEO-friendly slug.
 */
export const slugify = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
};

/**
 * Generates a deterministic, short hash that we can append to slugs
 * so that kaomoji with identical names still resolve uniquely.
 */
export const hashFragment = (input: string): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Keep as 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

/**
 * Creates a stable slug for a kaomoji using its display name and value.
 */
export const createKaomojiSlug = (kaomoji: Kaomoji): string => {
  const base = kaomoji.name ? slugify(kaomoji.name) : 'kaomoji';
  const safeBase = base.length > 0 ? base : 'kaomoji';
  const suffix = hashFragment(kaomoji.value).slice(0, 6);
  return `${safeBase}-${suffix}`;
};

/**
 * Creates a slug for a top-level kaomoji category.
 */
export const createCategorySlug = (categoryName: string): string => {
  const base = slugify(categoryName);
  return base.length > 0 ? base : 'category';
};

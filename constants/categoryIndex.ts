import { kaomojiData } from './kaomoji';
import type { KaomojiTopCategory } from '../types';
import { createCategorySlug } from '../utils/slug';

export interface KaomojiCategoryEntry {
  slug: string;
  category: KaomojiTopCategory;
}

const entries: KaomojiCategoryEntry[] = kaomojiData.map((category) => ({
  slug: createCategorySlug(category.category),
  category,
}));

const categoryMap = new Map(entries.map((entry) => [entry.slug, entry.category]));

export const findCategoryBySlug = (slug: string): KaomojiTopCategory | undefined => categoryMap.get(slug);

export const getAllCategoryEntries = (): KaomojiCategoryEntry[] => entries;

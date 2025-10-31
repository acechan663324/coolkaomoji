import { kaomojiData } from './kaomoji';
import { createKaomojiSlug } from '../utils/slug';
import type { Kaomoji, KaomojiSubCategory, KaomojiTopCategory } from '../types';

export interface KaomojiIndexEntry {
  slug: string;
  kaomoji: Kaomoji;
  topCategory: KaomojiTopCategory['category'];
  subCategory: KaomojiSubCategory['subCategory'];
  description: KaomojiSubCategory['description'];
}

const buildIndex = () => {
  const map = new Map<string, KaomojiIndexEntry>();

  kaomojiData.forEach((topCategory) => {
    topCategory.subCategories.forEach((subCategory) => {
      subCategory.kaomojis.forEach((kaomoji) => {
        const slug = createKaomojiSlug(kaomoji);
        if (!map.has(slug)) {
          map.set(slug, {
            slug,
            kaomoji,
            topCategory: topCategory.category,
            subCategory: subCategory.subCategory,
            description: subCategory.description,
          });
        }
      });
    });
  });

  return map;
};

const index = buildIndex();

export const findKaomojiBySlug = (slug: string): KaomojiIndexEntry | undefined => index.get(slug);

export const getAllKaomojiEntries = (): KaomojiIndexEntry[] => Array.from(index.values());

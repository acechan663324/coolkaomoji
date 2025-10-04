export interface Kaomoji {
  name: string;
  value: string;
  isLong?: boolean;
}

export interface KaomojiSubCategory {
  subCategory: string;
  description: string;
  kaomojis: Kaomoji[];
}

export interface KaomojiTopCategory {
  category: string;
  subCategories: KaomojiSubCategory[];
}

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

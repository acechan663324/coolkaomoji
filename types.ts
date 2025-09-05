
export interface Kaomoji {
  name: string;
  value: string;
}

export interface KaomojiCategory {
  category: string;
  kaomojis: Kaomoji[];
}

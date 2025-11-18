export const ADSENSE_CLIENT_ID = 'ca-pub-3685000706717214';

export const ADSENSE_SLOT_IDS = {
  sidebar: '7371954091',
  interstitial: '5296455090',
  multiplex: '5867300735',
} as const;

export type AdsenseSlotKey = keyof typeof ADSENSE_SLOT_IDS;

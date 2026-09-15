import type { QrMenuCategory, QrMenuProduct } from './types';

export const MAKARILLA_MENU_STORE_KEY = 'paneltakip:qr-menu:makarilla:v1';

export type MakarillaMenuDraft = {
  categories: QrMenuCategory[];
  products: QrMenuProduct[];
};

export function readMakarillaMenuDraft(): MakarillaMenuDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(MAKARILLA_MENU_STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MakarillaMenuDraft;
    if (!Array.isArray(parsed.categories) || !Array.isArray(parsed.products)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveMakarillaMenuDraft(draft: MakarillaMenuDraft) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MAKARILLA_MENU_STORE_KEY, JSON.stringify(draft));
  window.dispatchEvent(new CustomEvent('makarilla-menu-updated'));
}

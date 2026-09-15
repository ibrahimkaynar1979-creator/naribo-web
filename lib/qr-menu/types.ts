export type QrMenuTheme = {
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  radius: number;
};

export type QrMenuBranch = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  email?: string;
  instagram?: string;
  openingHours?: string;
};

export type QrMenuCategory = {
  id: string;
  name: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
};

export type QrMenuOption = {
  id: string;
  name: string;
  price: number;
};

export type QrMenuProduct = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  allergens?: string[];
  options?: QrMenuOption[];
  isFeatured?: boolean;
  isActive: boolean;
  sortOrder: number;
};

export type QrMenuReviewSummary = {
  rating: number;
  count: number;
};

export type QrMenuRestaurant = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline?: string;
  logo?: string;
  coverImage?: string;
  theme: QrMenuTheme;
  branch: QrMenuBranch;
  reviewSummary?: QrMenuReviewSummary;
  categories: QrMenuCategory[];
  products: QrMenuProduct[];
};

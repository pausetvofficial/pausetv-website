export type Category = {
  _id: string;
  title: string;
  slug?: { current: string };
};

export type Video = {
  _id: string;
  title: string;
  slug?: { current: string };
  youtubeUrl?: string;
  thumbnail?: unknown;
  category?: Category;
  description?: string;
  publishedAt?: string;
};

export type NewsPost = {
  _id: string;
  title: string;
  slug?: { current: string };
  excerpt?: string;
  coverImage?: unknown;
  galleryImages?: Array<unknown>;
  category?: Category;
  body?: any;
  publishedAt?: string;
  author?: string;
  description?: string;
};

export type Host = {
  _id?: string;
  name?: string;
  role?: string;
  photo?: unknown;
  bio?: string;
  longBio?: any;
  highlights?: { _key: string; label?: string; value?: string }[];
};

export type SiteSettings = {
  siteTitle?: string;
  tagline?: string;
  heroImage?: unknown;
  heroEyebrow?: string;
  heroCtaLabel?: string;
  heroCtaUrl?: string;
  email?: string;
  bookingEmail?: string;
  socialLinks?: { platform?: string; url?: string }[];
  footerNote?: string;
};

export type Event = {
  _id: string;
  title: string;
  date: string;
  venue?: string;
  city?: string;
  ticketUrl?: string;
  description?: string;
  category?: Category;
};

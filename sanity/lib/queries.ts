import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
*[_type == "siteSettings"][0]{
  siteTitle,
  tagline,
  heroImage,
  heroEyebrow,
  heroCtaLabel,
  heroCtaUrl,
  email,
  bookingEmail,
  socialLinks[]{ platform, url },
  footerNote
}`);

export const HOST_QUERY = defineQuery(`
*[_type == "host"][0]{
  name,
  role,
  photo,
  bio,
  longBio,
  highlights[]{ _key, label, value }
}`);

export const VIDEOS_QUERY = defineQuery(`
*[_type == "video"] | order(publishedAt desc){
  _id,
  title,
  slug,
  youtubeUrl,
  thumbnail,
  category->{ _id, title, slug },
  description,
  publishedAt
}`);

export const FEATURED_VIDEOS_QUERY = defineQuery(`
*[_type == "video"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  youtubeUrl,
  thumbnail,
  category->{ _id, title, slug },
  description,
  publishedAt
}`);

export const VIDEO_QUERY = defineQuery(`
*[_type == "video" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  youtubeUrl,
  thumbnail,
  category->{ _id, title, slug },
  description,
  publishedAt
}`);

export const NEWS_QUERY = defineQuery(`
*[_type == "newsPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  category->{ _id, title, slug },
  author->{ _id, name, slug, photo },
  publishedAt
}`);

export const FEATURED_NEWS_QUERY = defineQuery(`
*[_type == "newsPost"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  category->{ _id, title, slug },
  author->{ _id, name, slug, photo },
  publishedAt
}`);

export const NEWS_POST_QUERY = defineQuery(`
*[_type == "newsPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  galleryImages,
  category->{ _id, title, slug },
  author->{ _id, name, slug, photo, role, bio },
  body,
  publishedAt
}`);

export const EVENTS_QUERY = defineQuery(`
*[_type == "event"] | order(date asc){
  _id,
  title,
  date,
  venue,
  city,
  ticketUrl,
  description,
  category->{ _id, title, slug },
  soldOut
}`);

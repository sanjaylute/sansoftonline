import type { Metadata } from 'next';
import liveSeoData from './live-seo-metadata.json';
import livePostSeoData from './live-seo-post-metadata.json';

const records = liveSeoData as unknown as Record<string, Metadata>;
const postRecords = livePostSeoData as unknown as Record<string, Metadata>;

export function livePageMetadata(slug: string): Metadata {
  return records[slug] ?? {};
}

export function livePostMetadata(slug: string): Metadata {
  return postRecords[slug] ?? {};
}

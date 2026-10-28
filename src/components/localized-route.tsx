import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalizedMarketingPage } from './localized-marketing-page';
import { getLocalizedCopy, getLocalizedTopic, languageAlternates, localizedHref, localizedPublicPaths, normalizeLocalizedPath, type LocalizedLocale } from '@/lib/localized-pages';
import { livePageMetadata, livePostMetadata } from '@/lib/live-seo-metadata';
import { blogPostSlugs } from '@/lib/blog-slugs';

type Params = { path?: string[] };

export function localizedStaticParams() {
  return localizedPublicPaths.map((path) => ({
    path: path === '/' ? [] : path.split('/').filter(Boolean),
  }));
}

function resolvePath(params: Params) {
  return normalizeLocalizedPath((params.path || []).join('/'));
}

const dictionaries: Record<LocalizedLocale, () => Promise<{ default: Record<string, string> }>> = {
  es: () => import('@/locales/es.json'), de: () => import('@/locales/de.json'), fr: () => import('@/locales/fr.json'),
  it: () => import('@/locales/it.json'), pt: () => import('@/locales/pt.json'), nl: () => import('@/locales/nl.json'),
  pl: () => import('@/locales/pl.json'), da: () => import('@/locales/da.json'), id: () => import('@/locales/id.json'),
  tr: () => import('@/locales/tr.json'), ja: () => import('@/locales/ja.json'), hi: () => import('@/locales/hi.json'), mr: () => import('@/locales/mr.json'),
};

function metadataText(value: Metadata['title'] | Metadata['description']) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'absolute' in value && typeof value.absolute === 'string') return value.absolute;
  return undefined;
}

export async function localizedMetadata(locale: LocalizedLocale, params: Params): Promise<Metadata> {
  const path = resolvePath(params);
  const copy = getLocalizedCopy(locale);
  const topic = getLocalizedTopic(locale, path);
  const canonical = 'https://www.sansoftonline.com' + localizedHref(locale, path);
  const sourceSlug = path === '/' ? 'home' : path.slice(1, -1);
  const source = blogPostSlugs.has(sourceSlug) ? livePostMetadata(sourceSlug) : livePageMetadata(sourceSlug);
  const dictionary = (await dictionaries[locale]()).default;
  const sourceTitle = metadataText(source.title);
  const sourceDescription = metadataText(source.description);
  const title = sourceTitle ? dictionary[sourceTitle] || topic : topic;
  const description = sourceDescription ? dictionary[sourceDescription] || copy.intro : copy.intro + ' ' + topic + '.';
  return {
    title: title + ' | Sansoft',
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: { title: title + ' | Sansoft', description, url: canonical, locale: copy.htmlLang, type: 'website' },
    twitter: { card: 'summary_large_image', title: title + ' | Sansoft', description },
    other: { 'content-language': copy.htmlLang },
  };
}

export function LocalizedRoute({ locale, params }: { locale: LocalizedLocale; params: Params }) {
  const path = resolvePath(params);
  // Page availability is determined by the localized route registry, not by
  // the small set of topic overrides used for schema fallbacks.
  if (!localizedPublicPaths.includes(path as (typeof localizedPublicPaths)[number])) notFound();
  return <LocalizedMarketingPage locale={locale} path={path} />;
}

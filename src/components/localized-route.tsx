import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalizedMarketingPage } from './localized-marketing-page';
import { getLocalizedCopy, languageAlternates, localizedHref, localizedPublicPaths, normalizeLocalizedPath, type LocalizedLocale } from '@/lib/localized-pages';

type Params = { path?: string[] };

export function localizedStaticParams() {
  return localizedPublicPaths.map((path) => ({
    path: path === '/' ? [] : path.split('/').filter(Boolean),
  }));
}

function resolvePath(params: Params) {
  return normalizeLocalizedPath((params.path || []).join('/'));
}

export function localizedMetadata(locale: LocalizedLocale, params: Params): Metadata {
  const path = resolvePath(params);
  const copy = getLocalizedCopy(locale);
  const topic = copy.topics[path];
  if (!topic) return {};
  const canonical = 'https://www.sansoftonline.com' + localizedHref(locale, path);
  const description = copy.intro + ' ' + topic + '.';
  return {
    title: topic + ' | Sansoft',
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: { title: topic + ' | Sansoft', description, url: canonical, locale: copy.htmlLang, type: 'website' },
    twitter: { card: 'summary_large_image', title: topic + ' | Sansoft', description },
    other: { 'content-language': copy.htmlLang },
  };
}

export function LocalizedRoute({ locale, params }: { locale: LocalizedLocale; params: Params }) {
  const path = resolvePath(params);
  if (!getLocalizedCopy(locale).topics[path]) notFound();
  return <LocalizedMarketingPage locale={locale} path={path} />;
}

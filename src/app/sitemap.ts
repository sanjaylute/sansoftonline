import type { MetadataRoute } from 'next';
import { services, serviceHref } from '@/lib/content';
import { remainingPages } from '@/lib/remaining-page-data';
import { blogPosts } from '@/lib/blog-data';
import { languageAlternates, localizedHref, localizedLocales, localizedPublicPaths, normalizeLocalizedPath } from '@/lib/localized-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sansoftonline.com').replace(/\/$/, '');
  const paths = Array.from(new Set([
    '', '/about-us', '/our-people/', '/life-at-sansoft/', '/services', '/ppc-services',
    '/contact-us', '/request-quote', '/blog', '/testimonials', '/certifications',
    '/privacy-policy', '/terms-and-conditions', '/seo-packages/', '/google-ads-packages/',
    '/social-media-ads-packages/', '/social-media-posts-design-packages/', '/custom-service/',
    ...services.map((service) => serviceHref(service.slug)),
    ...remainingPages.map((page) => `/${page.slug}/`),
    ...blogPosts.map((post) => `/${post.slug}/`),
  ]));

  const localizedPathSet = new Set<string>(localizedPublicPaths);
  const englishEntries: MetadataRoute.Sitemap = paths.map((path) => {
    const normalized = normalizeLocalizedPath(path);
    return {
      url: base + path,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.7,
      ...(localizedPathSet.has(normalized) ? { alternates: { languages: languageAlternates(normalized) } } : {}),
    };
  });
  const localizedEntries: MetadataRoute.Sitemap = localizedPublicPaths.flatMap((path) => localizedLocales.map((locale) => ({
    url: base + localizedHref(locale, path),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 0.9 : 0.7,
    alternates: { languages: languageAlternates(path) },
  })));
  return [...englishEntries, ...localizedEntries];
}

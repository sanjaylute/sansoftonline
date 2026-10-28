import HomePage from '@/app/page';
import AboutPage from '@/app/about-us/page';
import SeoServicesPage from '@/app/seo-services/page';
import LocalSeoServicesPage from '@/app/local-seo-services/page';
import GoogleAdsServicesPage from '@/app/google-ads-management-services/page';
import SocialMediaServicesPage from '@/app/social-media-management-services/page';
import WebDevelopmentServicesPage from '@/app/web-development-services/page';
import ContactPage from '@/app/contact-us/page';
import { LocalizedCopy } from '@/components/localized-copy';
import { getLocalizedCopy, localizedHref, normalizeLocalizedPath, type LocalizedLocale } from '@/lib/localized-pages';

const sourcePages = {
  '/': HomePage,
  '/about-us/': AboutPage,
  '/seo-services/': SeoServicesPage,
  '/local-seo-services/': LocalSeoServicesPage,
  '/google-ads-management-services/': GoogleAdsServicesPage,
  '/social-media-management-services/': SocialMediaServicesPage,
  '/web-development-services/': WebDevelopmentServicesPage,
  '/contact-us/': ContactPage,
};

export function LocalizedMarketingPage({ locale, path }: { locale: LocalizedLocale; path: string }) {
  const normalized = normalizeLocalizedPath(path);
  const copy = getLocalizedCopy(locale);
  const topic = copy.topics[normalized];
  const SourcePage = sourcePages[normalized];
  if (!topic || !SourcePage) return null;

  const canonical = 'https://www.sansoftonline.com' + localizedHref(locale, normalized);
  const isService = !['/', '/about-us/', '/contact-us/'].includes(normalized);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'], '@id': 'https://www.sansoftonline.com/#organization',
        name: 'Sansoft Web Technologies Pvt. Ltd.', alternateName: 'Sansoft', url: 'https://www.sansoftonline.com/',
        email: 'sales@sansoftonline.com', telephone: '+91-82370-66600',
        address: { '@type': 'PostalAddress', addressLocality: 'Nagpur', addressRegion: 'Maharashtra', addressCountry: 'IN' },
      },
      {
        '@type': 'WebSite', '@id': 'https://www.sansoftonline.com/#website', url: 'https://www.sansoftonline.com/',
        name: 'Sansoft', inLanguage: copy.htmlLang, publisher: { '@id': 'https://www.sansoftonline.com/#organization' },
      },
      {
        '@type': 'WebPage', '@id': canonical + '#webpage', url: canonical, name: topic, description: copy.intro,
        inLanguage: copy.htmlLang, isPartOf: { '@id': 'https://www.sansoftonline.com/#website' },
      },
      ...(isService ? [{
        '@type': 'Service', '@id': canonical + '#service', name: topic, description: copy.intro, url: canonical,
        inLanguage: copy.htmlLang, provider: { '@id': 'https://www.sansoftonline.com/#organization' },
        areaServed: { '@type': 'Country', name: 'Worldwide' },
      }] : []),
    ],
  };

  return <>
    <script id={'localized-schema-' + locale} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <LocalizedCopy locale={locale}><SourcePage /></LocalizedCopy>
  </>;
}

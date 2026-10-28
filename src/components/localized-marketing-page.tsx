import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Globe2 } from 'lucide-react';
import { getLocalizedCopy, localizedHref, localizedLocales, normalizeLocalizedPath, type LocalizedLocale } from '@/lib/localized-pages';
import './localized-marketing-page.css';

const navigation = [
  '/',
  '/about-us/',
  '/seo-services/',
  '/local-seo-services/',
  '/google-ads-management-services/',
  '/contact-us/',
] as const;

export function LocalizedMarketingPage({ locale, path }: { locale: LocalizedLocale; path: string }) {
  const normalized = normalizeLocalizedPath(path);
  const copy = getLocalizedCopy(locale);
  const topic = copy.topics[normalized];
  if (!topic) return null;

  const canonical = 'https://www.sansoftonline.com' + localizedHref(locale, normalized);
  const isService = !['/', '/about-us/', '/contact-us/'].includes(normalized);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': 'https://www.sansoftonline.com/#organization',
        name: 'Sansoft Web Technologies Pvt. Ltd.',
        alternateName: 'Sansoft',
        url: 'https://www.sansoftonline.com/',
        email: 'sales@sansoftonline.com',
        telephone: '+91-82370-66600',
        address: { '@type': 'PostalAddress', addressLocality: 'Nagpur', addressRegion: 'Maharashtra', addressCountry: 'IN' },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.sansoftonline.com/#website',
        url: 'https://www.sansoftonline.com/',
        name: 'Sansoft',
        inLanguage: copy.htmlLang,
        publisher: { '@id': 'https://www.sansoftonline.com/#organization' },
      },
      {
        '@type': 'WebPage',
        '@id': canonical + '#webpage',
        url: canonical,
        name: topic,
        description: copy.intro,
        inLanguage: copy.htmlLang,
        isPartOf: { '@id': 'https://www.sansoftonline.com/#website' },
      },
      ...(isService ? [{
        '@type': 'Service',
        '@id': canonical + '#service',
        name: topic,
        description: copy.intro,
        url: canonical,
        inLanguage: copy.htmlLang,
        provider: { '@id': 'https://www.sansoftonline.com/#organization' },
        areaServed: { '@type': 'Country', name: 'Worldwide' },
      }] : []),
    ],
  };

  return <main className="localized-marketing" lang={copy.htmlLang}>
    <script id={'localized-schema-' + locale} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className="localized-header">
      <Link className="localized-brand" href={localizedHref(locale, '/')}>SANSOFT</Link>
      <nav aria-label="Localized navigation">
        {navigation.map((href) => <Link href={localizedHref(locale, href)} key={href}>{copy.topics[href]}</Link>)}
      </nav>
      <details className="localized-language">
        <summary><Globe2 size={15} aria-hidden="true" />{copy.label}</summary>
        <div><Link href={normalized}>English</Link>{localizedLocales.map((language) => <Link href={localizedHref(language, normalized)} key={language}>{getLocalizedCopy(language).label}</Link>)}</div>
      </details>
    </header>
    <section className="localized-hero">
      <div className="localized-wrap">
        <span>{copy.eyebrow}</span>
        <h1>{topic}</h1>
        <p>{copy.intro}</p>
        <Link className="localized-cta" href={localizedHref(locale, '/contact-us/')}>{copy.cta}<ArrowUpRight size={18}/></Link>
      </div>
    </section>
    <section className="localized-value">
      <div className="localized-wrap">
        <div className="localized-heading"><span>{copy.eyebrow}</span><h2>{topic}</h2><p>{copy.intro}</p></div>
        <div className="localized-grid">
          {[
            [copy.strategy, copy.strategyText],
            [copy.delivery, copy.deliveryText],
            [copy.reporting, copy.reportingText],
          ].map(([title, text]) => <article key={title}><CheckCircle2 size={23}/><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
    <section className="localized-bottom">
      <div className="localized-wrap"><div><span>{copy.eyebrow}</span><h2>{topic}</h2></div><Link className="localized-cta localized-cta-light" href={localizedHref(locale, '/contact-us/')}>{copy.cta}<ArrowUpRight size={18}/></Link></div>
    </section>
    <footer className="localized-footer"><div className="localized-wrap"><b>SANSOFT</b><span>© 2026 Sansoft Web Technologies Pvt. Ltd.</span><a href="mailto:sales@sansoftonline.com">sales@sansoftonline.com</a></div></footer>
  </main>;
}

'use client';

import { usePathname } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { packagePages } from '@/lib/package-data';
import { services, serviceHref } from '@/lib/content';
import { localizedLocales } from '@/lib/localized-pages';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sansoftonline.com').replace(/\/$/, '');

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${siteUrl}/#organization`,
  name: 'Sansoft Web Technologies Pvt. Ltd.',
  alternateName: 'Sansoft',
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  image: `${siteUrl}/icon.png`,
  email: 'sales@sansoftonline.com',
  telephone: '+91-82370-66600',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '64, Beltarodi Road, Manish Nagar',
    addressLocality: 'Nagpur',
    addressRegion: 'Maharashtra',
    postalCode: '440037',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.linkedin.com/company/sansoftonline/'],
};

function cleanPath(pathname: string) {
  return pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`;
}

function titleFromPath(pathname: string) {
  if (pathname === '/') return 'Sansoft';
  return decodeURIComponent(pathname.split('/').filter(Boolean).at(-1) || 'Sansoft')
    .split('-')
    .map(word => word.toUpperCase() === 'SEO' ? 'SEO' : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

function breadcrumbs(pathname: string, currentName: string) {
  const parts = pathname.split('/').filter(Boolean);
  return [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, ...parts.map((part, index) => ({
    '@type': 'ListItem',
    position: index + 2,
    name: index === parts.length - 1 ? currentName : titleFromPath(`/${part}`),
    item: `${siteUrl}/${parts.slice(0, index + 1).join('/')}/`,
  }))];
}

function priceNumber(price: string) {
  return price.replace(/[^0-9.]/g, '');
}

export function SiteStructuredData() {
  const pathname = cleanPath(usePathname());
  const firstSegment = pathname.split('/').filter(Boolean).at(0);
  if (firstSegment && localizedLocales.includes(firstSegment as typeof localizedLocales[number])) return null;
  const url = `${siteUrl}${pathname}`;
  const slug = pathname.split('/').filter(Boolean).at(-1) || '';
  const post = blogPosts.find(item => item.slug === slug);
  const service = services.find(item => cleanPath(serviceHref(item.slug)) === pathname || cleanPath(`/services/${item.slug}`) === pathname);
  const packagePage = packagePages.find(item => `/${item.slug}/` === pathname);
  const name = post?.title || service?.title || packagePage?.title || titleFromPath(pathname);

  const graph: Record<string, unknown>[] = [
    organization,
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'Sansoft',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbs(pathname, name),
    },
  ];

  if (service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.title,
      description: service.description,
      serviceType: service.title,
      url,
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
    });
  }

  if (post) {
    const published = new Date(post.date).toISOString();
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: published,
      dateModified: published,
      articleSection: post.category,
      author: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en-IN',
    });
  }

  if (packagePage) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#packages`,
      name: packagePage.title,
      itemListElement: packagePage.tiers.map((tier, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: tier.name,
          description: tier.summary,
          brand: { '@id': `${siteUrl}/#organization` },
          offers: {
            '@type': 'Offer',
            url: `${url}#plans`,
            priceCurrency: 'USD',
            price: priceNumber(tier.price),
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    });
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: packagePage.faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <script id="sansoft-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

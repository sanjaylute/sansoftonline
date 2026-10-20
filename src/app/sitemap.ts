import type { MetadataRoute } from 'next';
import { services, serviceHref } from '@/lib/content';
import { remainingPages } from '@/lib/remaining-page-data';

export default function sitemap():MetadataRoute.Sitemap {
  const base=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.sansoftonline.com').replace(/\/$/,'');
  const paths=Array.from(new Set(['','/about-us','/our-people/','/life-at-sansoft/','/services','/ppc-services','/contact-us','/request-quote','/blog','/testimonials','/certifications','/privacy-policy','/terms-and-conditions','/seo-packages/','/google-ads-packages/','/social-media-ads-packages/','/social-media-posts-design-packages/','/custom-service/',...services.map(s=>serviceHref(s.slug)),...remainingPages.map(p=>`/${p.slug}/`)]));
  return paths.map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:path===''?'weekly':'monthly',priority:path===''?1:.7}));
}

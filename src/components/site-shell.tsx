'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Code2, FileText, Gauge, Image as ImageIcon, Link2, Mail, MapPin, Megaphone, Menu, Network, Palette, Phone, Search, ShieldCheck, ShoppingBag, Sparkles, Target, Users, Video, X } from 'lucide-react';
import { navLinks, services, serviceHref } from '@/lib/content';

const serviceGroups = [
  { name: 'SEO & search', icon: Search, description: 'Build lasting visibility and get found by the right people.', match: (title: string, slug: string) => /seo|citation|business profile/i.test(`${title} ${slug}`) },
  { name: 'Paid advertising', icon: Target, description: 'Reach ready-to-act audiences with purposeful campaigns.', match: (title: string, slug: string) => /ads|advertising|ppc/i.test(`${title} ${slug}`) && !/banner design/i.test(title) },
  { name: 'Social media', icon: Users, description: 'Create a consistent presence and stronger connections.', match: (title: string) => /social media/i.test(title) && !/ads|advertising/i.test(title) },
  { name: 'Creative & other', icon: Palette, description: 'Make your message clear, useful and memorable.', match: (title: string) => /design|poster|brochure|flyer|banner|cover|nft|reputation|guest blog|web development|content marketing/i.test(title) },
];

const groupedServices = serviceGroups.map(group => ({
  ...group,
  items: services.filter(service => group.match(service.title, service.slug)),
}));
const groupedSlugs = new Set(groupedServices.flatMap(group => group.items.map(item => item.slug)));
const otherServices = services.filter(service => !groupedSlugs.has(service.slug));
if (otherServices.length) groupedServices[groupedServices.length - 1].items.push(...otherServices);

function serviceIcon(title: string, slug: string) {
  const value = `${title} ${slug}`.toLowerCase();
  if (/local|citation|business profile|nagpur/.test(value)) return MapPin;
  if (/generative|voice search/.test(value)) return Network;
  if (/technical|cms|wordpress|shopify|wix|squarespace/.test(value)) return Code2;
  if (/reputation/.test(value)) return ShieldCheck;
  if (/video|youtube/.test(value)) return Video;
  if (/shopping|ecommerce/.test(value)) return ShoppingBag;
  if (/social media/.test(value)) return Users;
  if (/ads|advertising|ppc/.test(value)) return Target;
  if (/design|poster|brochure|flyer|banner|cover|nft/.test(value)) return Palette;
  if (/guest blog|content marketing/.test(value)) return FileText;
  if (/web development/.test(value)) return Code2;
  if (/link|authority/.test(value)) return Link2;
  if (/creative/.test(value)) return Sparkles;
  if (/speed|performance/.test(value)) return Gauge;
  if (/search|seo/.test(value)) return Search;
  if (/campaign/.test(value)) return Megaphone;
  if (/image|graphic/.test(value)) return ImageIcon;
  return FileText;
}

function ServiceIcon({ title, slug }: { title: string; slug: string }) {
  const value = `${title} ${slug}`.toLowerCase();
  const common = { className: 'nav-service-icon', width: 16, height: 16, viewBox: '0 0 24 24', 'aria-hidden': true as const };

  // Distinct paid-media and advertising platform marks.
  if (/facebook/.test(value)) return <svg {...common} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1877f2"/><path d="M13.5 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.3-1.4 1.4-1.4h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.3 0-3.8 1.4-3.8 3.9v1.9H8v2.8h2.4v7h3.1Z" fill="white"/></svg>;
  if (/instagram/.test(value)) return <svg {...common} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#d94682" strokeWidth="2.2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="#d94682" strokeWidth="2"/><circle cx="17.6" cy="6.7" r="1.2" fill="#f28a27"/></svg>;
  if (/youtube/.test(value)) return <svg {...common} viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="4" fill="#f00"/><path d="m10 8.5 6 3.5-6 3.5v-7Z" fill="white"/></svg>;
  if (/pinterest/.test(value)) return <svg {...common} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bd081c"/><path d="M10.3 15.8 9.5 19c1 .5 1.8.7 2.7.7 4.2 0 7.2-3.5 7.2-7.9 0-3.5-2.9-6.3-7.2-6.3-5.1 0-7.8 3.4-7.8 7 0 2 .8 3.8 2.5 4.5.3.1.6 0 .7-.3l.3-1.1c.1-.3.1-.4-.2-.7-.5-.6-.9-1.3-.9-2.4 0-3.1 2.3-5.8 6-5.8 3.3 0 5.1 2 5.1 4.7 0 3.6-1.6 6.6-4 6.6-1.3 0-2.2-1.1-1.9-2.4.4-1.6 1.2-3.4 1.2-4.6 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.8.4 1.8l-1.4 5.7" fill="white" transform="translate(.2 -.4) scale(.91)"/></svg>;
  if (/linkedin/.test(value)) return <svg {...common} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#0a66c2"/><path d="M7.1 9.5H4.5V18h2.6V9.5ZM5.8 8.3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM19.5 13.1c0-2.6-1.4-3.8-3.3-3.8-1.5 0-2.2.8-2.6 1.4V9.5H11V18h2.6v-4.2c0-1.1.2-2.2 1.6-2.2s1.5 1.3 1.5 2.3V18h2.6l.2-4.9Z" fill="white"/></svg>;
  if (/(^|\W)x ads|twitter/.test(value)) return <svg {...common} viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.9 5.8 22H2.6l7.3-8.4L2 2h6.5l4.5 6.7L18.9 2Zm-1.1 17.8h1.7L7.5 4.1H5.7l12.1 15.7Z" fill="currentColor"/></svg>;
  if (/google.*shopping|shopping.*google/.test(value)) return <svg {...common} viewBox="0 0 24 24"><path d="M5 8h14l1 12H4L5 8Z" fill="none" stroke="#4285f4" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="#34a853" strokeWidth="1.8" strokeLinecap="round"/><path d="m9.2 13 2 2 4-4" fill="none" stroke="#fbbc04" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (/google.*display|display.*google/.test(value)) return <svg {...common} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="15" rx="2" fill="none" stroke="#4285f4" strokeWidth="1.8"/><path d="M3 8h18" stroke="#ea4335" strokeWidth="2"/><circle cx="6" cy="6" r=".7" fill="#fbbc04"/><path d="M8 12h8M8 15h5" stroke="#34a853" strokeWidth="1.5" strokeLinecap="round"/></svg>;
  if (/google.*search|search.*google/.test(value)) return <svg {...common} viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="#4285f4" strokeWidth="2.4"/><path d="m16 16 4.5 4.5" stroke="#34a853" strokeWidth="2.7" strokeLinecap="round"/><path d="M10.8 4a6.8 6.8 0 0 0-5.9 3.4" stroke="#ea4335" strokeWidth="2.4"/><path d="M5 13a6.8 6.8 0 0 0 8.7 4.2" stroke="#fbbc04" strokeWidth="2.4"/></svg>;
  if (/video advertis|video ads/.test(value)) return <svg {...common} viewBox="0 0 24 24"><rect x="3" y="5" width="13" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="m16 10 5-3v10l-5-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m5 5 5 5m1-5 5 5" stroke="#ed6b00" strokeWidth="1.7"/></svg>;
  if (/social media advertis|social media ads/.test(value)) return <svg {...common} viewBox="0 0 24 24"><path d="M3 10v4h4l10 5V5L7 10H3Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m7 14 2 5h3l-2-4" stroke="#ed6b00" strokeWidth="1.8" strokeLinejoin="round"/><path d="M20 9a4 4 0 0 1 0 6" fill="none" stroke="#ed6b00" strokeWidth="1.8" strokeLinecap="round"/></svg>;
  if (/google ads management|paid media|ppc/.test(value)) return <svg {...common} viewBox="0 0 24 24"><path d="M8.2 3.8a3.2 3.2 0 0 1 5.6 0l7.1 12.4a3.2 3.2 0 0 1-5.6 3.2L8.2 7a3.2 3.2 0 0 1 0-3.2Z" fill="#fbbc04"/><path d="M8.2 3.8a3.2 3.2 0 0 1 5.6 0l1.9 3.3-7 12.3a3.2 3.2 0 0 1-5.6-3.2L8.2 3.8Z" fill="#4285f4"/><circle cx="5.9" cy="17.8" r="3.1" fill="#34a853"/></svg>;

  // Dedicated service marks keep the social and creative directory easy to scan.
  if (/social media management/.test(value)) return <svg {...common}><path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="9" cy="6" r="2" fill="#fff8f0" stroke="#ed6b00" strokeWidth="1.7"/><circle cx="15" cy="12" r="2" fill="#fff8f0" stroke="#ed6b00" strokeWidth="1.7"/><circle cx="8" cy="18" r="2" fill="#fff8f0" stroke="#ed6b00" strokeWidth="1.7"/></svg>;
  if (/social media marketing/.test(value)) return <svg {...common}><circle cx="5" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="19" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="m7 7 3.7 8.9M17 7l-3.7 8.9M7 6h10" fill="none" stroke="#ed6b00" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  if (/social media content creation|content creation/.test(value)) return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M8 8h8M8 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="m14 15 4 2.3-4 2.2V15Z" fill="#ed6b00"/></svg>;
  if (/creative & design|creative design/.test(value)) return <svg {...common}><path d="m4 17 1.5 3.5L9 19l10.2-10.2a2.5 2.5 0 0 0-3.5-3.5L5.5 15.5 4 17Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m14.5 7.5 3.5 3.5M4 20.5h16" stroke="#ed6b00" strokeWidth="1.7" strokeLinecap="round"/></svg>;
  if (/reputation management/.test(value)) return <svg {...common}><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m8.5 12 2.2 2.2 4.8-5" fill="none" stroke="#ed6b00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (/web development/.test(value)) return <svg {...common}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (/content marketing/.test(value)) return <svg {...common}><path d="M5 3h10l4 4v14H5V3Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M15 3v5h4M8 12h8M8 16h6" fill="none" stroke="#ed6b00" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  if (/graphic design/.test(value)) return <svg {...common}><circle cx="8" cy="8" r="4" fill="none" stroke="#ed6b00" strokeWidth="1.8"/><path d="M14 4h5v5h-5zM5 15h6v5H5z" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="m15 14 4 6h-8l4-6Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>;
  if (/guest blog|guest blogging/.test(value)) return <svg {...common}><path d="M4 4h16v13H9l-5 4V4Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8 8h8M8 12h6" stroke="#ed6b00" strokeWidth="1.6" strokeLinecap="round"/></svg>;
  if (/business poster/.test(value)) return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#ed6b00" strokeWidth="1.7" strokeLinecap="round"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>;
  if (/brochure/.test(value)) return <svg {...common}><path d="M3 5.5 9 4l6 1.5L21 4v14.5L15 20l-6-1.5L3 20V5.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 4v14.5M15 5.5V20M5.5 9H7m4.5 0H13m4.5 0H19" stroke="#ed6b00" strokeWidth="1.5" strokeLinecap="round"/></svg>;
  if (/flyer/.test(value)) return <svg {...common}><path d="M5 3h10l4 4v14H5V3Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M15 3v5h4M8 12h8M8 16h5" stroke="#ed6b00" strokeWidth="1.6" strokeLinecap="round"/><path d="m15 11 3 1.5-3 1.5v-3Z" fill="currentColor"/></svg>;
  if (/google ads banner/.test(value)) return <svg {...common}><rect x="2.5" y="5" width="19" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M5.5 9h5M5.5 12h7" stroke="#ed6b00" strokeWidth="1.6" strokeLinecap="round"/><path d="m16 10 3 2-3 2v-4Z" fill="currentColor"/></svg>;
  if (/header.*cover|cover.*design/.test(value)) return <svg {...common}><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="7" y="7" width="10" height="10" rx="1" fill="none" stroke="#ed6b00" strokeWidth="1.6"/><circle cx="10" cy="10" r="1" fill="currentColor"/><path d="m8 15 3-3 2 2 1.5-1.5L17 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>;
  if (/nft|character design/.test(value)) return <svg {...common}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m4.5 7.7 7.5 4.5 7.5-4.5M12 12.2V21" fill="none" stroke="#ed6b00" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="9.5" cy="9" r=".8" fill="currentColor"/><circle cx="14.5" cy="9" r=".8" fill="currentColor"/></svg>;
  if (/generative engine|generative-engine|geo services/.test(value)) return <svg {...common}><circle cx="12" cy="12" r="2.3" fill="#ed6b00"/><circle cx="5" cy="6" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="19" cy="6" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="5" cy="18" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="19" cy="18" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="m6.3 7.2 4 3.5m7.4-3.5-4 3.5m-7.4 6.1 4-3.4m7.4 3.4-4-3.4" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>;
  if (/social profile optimization/.test(value)) return <svg {...common}><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 7h5M18.5 4.5v5" fill="none" stroke="#ed6b00" strokeWidth="1.7" strokeLinecap="round"/><path d="m16 16 1.5 1.5 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

  // Use distinct, compact platform marks for CMS-specific SEO services.
  if (/wordpress/.test(value)) return <svg {...common}><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="m5.2 8.2 3.1 8.3 2.1-5.1 2 5.1 3.3-8.3M4.8 8.2h3.1m7.8 0h3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (/shopify/.test(value)) return <svg {...common}><path d="m6 8.2 1.1 12h9.8l1.1-12H6Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 8.3a3 3 0 0 1 6 0M14.8 12.1c-.6-.5-2.8-.7-3.1.5-.4 1.6 2.8 1.2 2.6 2.8-.2 1.4-2.5 1.5-3.7.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
  if (/(^|\W)wix(\W|$)/.test(value)) return <svg {...common}><path d="m2.7 7.2 2.1 9.6h2.5l1.5-5.2 1.5 5.2h2.5l2.1-9.6h-2.7l-.9 5.2-1.5-5.2H9.5L8 12.4l-.9-5.2H2.7Zm13.8 0v9.6h2.6v-6l2.2 6h.8v-9.6h-2.5v5.7l-2.2-5.7h-.9Z" fill="currentColor"/></svg>;
  if (/squarespace/.test(value)) return <svg {...common}><path d="m8.1 7.2 2.1-2.1a3.5 3.5 0 0 1 5 0l.8.8-2.1 2.1-.8-.8a.6.6 0 0 0-.8 0l-2.1 2.1-2.1-2.1Zm7.8 9.6-2.1 2.1a3.5 3.5 0 0 1-5 0l-.8-.8 2.1-2.1.8.8a.6.6 0 0 0 .8 0l2.1-2.1 2.1 2.1Zm-8.5-1.4 7.8-7.8 1.8 1.8-7.8 7.8-1.8-1.8Zm-2.2-2.2 7.8-7.8 1.8 1.8L7 15l-1.8-1.8Z" fill="currentColor"/></svg>;

  const Icon = serviceIcon(title, slug);
  return <Icon className="nav-service-icon" size={14} aria-hidden="true"/>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeNavigation = () => { setOpen(false); setServicesOpen(false); };
  const cancelMenuClose = () => { if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current); menuCloseTimer.current = null; };
  const scheduleMenuClose = () => { cancelMenuClose(); menuCloseTimer.current = setTimeout(() => setServicesOpen(false), 300); };

  return <>
    <div className="topbar"><div className="wrap topbar-inner">
      <span>Digital growth, built around your business.</span>
      <div><a href="tel:+918237066600"><Phone size={13}/> +91 82370 66600</a><a href="mailto:sales@sansoftonline.com"><Mail size={13}/> sales@sansoftonline.com</a></div>
    </div></div>
    <header className="site-header"><div className="wrap nav-inner">
      <Link className="brand" href="/" aria-label="Sansoft home" onClick={closeNavigation}><Image src="/sansoft-logo-orange.png" alt="Sansoft" width={1581} height={318} className="brand-logo"/></Link>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        {navLinks.map(link => link.label === 'Services' ? <div className={`nav-services-menu${servicesOpen ? ' is-open' : ''}`} key={link.href} onMouseEnter={() => { cancelMenuClose(); if (window.matchMedia('(hover: hover)').matches) setServicesOpen(true); }} onMouseLeave={() => { if (window.matchMedia('(hover: hover)').matches) scheduleMenuClose(); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setServicesOpen(false); }} onKeyDown={event => { if (event.key === 'Escape') { cancelMenuClose(); setServicesOpen(false); } }}>
          <button type="button" className="nav-service-trigger" aria-expanded={servicesOpen} aria-controls="services-mega-menu" onClick={() => setServicesOpen(value => !value)}>
            {link.label}<ChevronDown size={14}/>
          </button>
          <div className="nav-dropdown" id="services-mega-menu">
            <div className="nav-dropdown-intro"><span>THE SANSOFT SERVICE DIRECTORY</span><strong>Find the right expertise for your next move.</strong><Link href="/services/" onClick={closeNavigation}>Explore all services <ArrowUpRight size={15}/></Link></div>
            <div className="nav-dropdown-grid">{groupedServices.map(group => <section key={group.name}>
              <h3><span className="nav-group-icon"><group.icon size={16}/></span>{group.name}</h3><p>{group.description}</p>
              <div className="nav-dropdown-links">{group.items.map(service => <Link key={service.slug} href={serviceHref(service.slug)} onClick={closeNavigation}><ServiceIcon title={service.title} slug={service.slug}/><span>{service.title}</span><ArrowUpRight className="nav-service-arrow" size={13}/></Link>)}</div>
            </section>)}</div>
          </div>
        </div> : <Link key={link.href} href={link.href} onClick={closeNavigation}>{link.label}</Link>)}
        <Link className="nav-quote" href="/request-quote/" onClick={closeNavigation}>Let’s talk <ArrowUpRight size={15}/></Link>
      </nav>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(value => { if (value) setServicesOpen(false); return !value; })}>{open ? <X/> : <Menu/>}</button>
    </div></header>
  </>;
}

export function SiteFooter() {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const additionalServicePages: Record<string,string> = {
    '/local-business-seo-services':'Local business SEO',
    '/local-seo-services-nagpur':'Local SEO services in Nagpur',
    '/ecommerce-seo-nagpur':'Ecommerce SEO in Nagpur',
    '/seo-company-nagpur':'SEO company in Nagpur',
    '/seo-expert-nagpur':'SEO expert in Nagpur',
    '/smm-services-new':'Social media marketing',
  };
  const faqService = services.find(service => serviceHref(service.slug).replace(/\/$/, '') === pathname) ?? (additionalServicePages[pathname] ? { title: additionalServicePages[pathname] } : null);
  const pagesWithFaq = new Set(['/seo-services', '/local-seo-services', '/google-ads-management-services', '/ppc-services', '/on-page-seo-services', '/google-search-ads-services', '/google-display-ads-services', '/google-shopping-ads-services', '/video-ads-services', '/content-marketing-services', '/services/content-marketing', '/services/social-media']);
  const faqItems = faqService ? getServiceFaqs(faqService.title) : [];

  return <>{faqService && !pagesWithFaq.has(pathname) && <section className="site-service-faq" aria-labelledby="site-service-faq-title"><div className="site-service-faq-inner"><div className="site-service-faq-heading"><span>COMMON QUESTIONS</span><h2 id="site-service-faq-title">Questions about<br/><em>{faqService.title.toLowerCase()}.</em></h2><p>Clear answers to help you understand the service and decide what fits your business.</p></div><div className="site-service-faq-list">{faqItems.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>}<footer className="site-footer"><div className="wrap footer-main">
    <div className="footer-brand"><Link className="brand brand-light" href="/"><Image src="/sansoft-logo-orange-light.png" alt="Sansoft" width={1593} height={333} className="brand-logo"/></Link><p>We build brands, not just campaigns. Digital marketing for businesses ready to move forward.</p><div className="footer-social"><a href="https://www.facebook.com/SansoftSEO" aria-label="Facebook">f</a><a href="https://www.instagram.com/sansoftonline/" aria-label="Instagram">ig</a><a href="https://www.linkedin.com/company/sansoftseo/" aria-label="LinkedIn">in</a><a href="https://x.com/sansoftonline" aria-label="X">x</a></div></div>
    <div><h4>Explore</h4><Link href="/about-us/">About</Link><Link href="/blog/">Insights</Link><Link href="/contact-us/">Contact</Link><Link href="/testimonials/">Testimonials</Link><Link href="/certifications/">Certifications</Link><Link href="/our-people/">Our people</Link><Link href="/life-at-sansoft/">Life @ Sansoft</Link></div>
    <div><h4>What we do</h4>{services.slice(0,5).map(service=><Link key={service.slug} href={serviceHref(service.slug)}>{service.title}</Link>)}</div>
    <div className="footer-contact"><h4>Let’s connect</h4><a href="tel:+918237066600"><Phone size={16}/> +91 82370 66600</a><a href="mailto:sales@sansoftonline.com"><Mail size={16}/> sales@sansoftonline.com</a><span><MapPin size={16}/> 64, Beltarodi Road, Manish Nagar, Nagpur, India</span><Link className="footer-cta" href="/request-quote/">Request a free quote <ArrowUpRight size={15}/></Link></div>
  </div><div className="wrap footer-bottom"><span>© 2026 Sansoft Web Technologies Pvt. Ltd. All rights reserved.</span><div><Link href="/privacy-policy/">Privacy</Link><Link href="/terms-and-conditions/">Terms</Link><button type="button" className="footer-cookie-settings" onClick={()=>window.dispatchEvent(new Event('sansoft-open-cookie-settings'))}>Cookie settings</button></div></div></footer></>;
}

function getServiceFaqs(title: string): [string,string][] {
  const name = title.replace(/ services$/i, '');
  if (/web development/i.test(title)) return [
    ['What does web development include?', 'The scope can include website structure, responsive page design, front-end development, performance considerations, analytics setup and launch support. We define the work around your site, platform and business requirements.'],
    ['Will my website work on mobile devices?', 'Mobile use is considered throughout the design and development process. We plan layouts and interactions to remain clear and usable across common screen sizes.'],
    ['Can you improve an existing website?', 'Yes. We can review an existing website and recommend a practical scope, from focused landing-page improvements to a broader redesign or rebuild.'],
  ];
  if (/creative|graphic|design|poster|brochure|flyer|banner|cover|nft/i.test(title)) return [
    [`What is included in ${name.toLowerCase()}?`, `The scope depends on your brief and may include concept development, layout and visual direction, brand alignment, revisions and delivery in the formats you need. We agree the deliverables before work begins.`],
    ['Can the design match my existing brand?', 'Yes. We use your logo, colors, typography and brand guidance to create work that feels consistent with your existing identity. If those guidelines are still taking shape, we can clarify the visual direction with you.'],
    ['What files will I receive?', 'Final file types and sizes are agreed to suit how you plan to use the design, including print or digital placement where relevant.'],
  ];
  if (/content|blog|guest/i.test(title)) return [
    ['What does content marketing include?', 'Support can include content strategy, topic and search-intent planning, editorial calendars, article or page copy, content refreshes and recommendations. We tailor the mix to your audience and resources.'],
    ['How does content marketing support SEO?', 'Useful, well-structured content can help search engines understand your expertise and help visitors find answers. We consider search intent and on-page SEO alongside clarity, accuracy and audience value.'],
    ['How often should we publish?', 'There is no single publishing schedule for every business. We recommend a realistic cadence based on your audience, priorities, available expertise and the quality your team can sustain.'],
  ];
  if (/social/i.test(title)) return [
    [`What does ${name.toLowerCase()} include?`, 'The scope may include channel planning, audience and profile review, content or campaign direction, publishing support and performance recommendations, depending on the service you choose.'],
    ['Which social platforms should my business use?', 'The right channels depend on your audience, offer and goals. We can help prioritize the platforms where your customers are most likely to discover and engage with your business.'],
    ['How do you measure progress?', 'We agree on useful signals for the goal, such as reach, engagement, qualified enquiries or conversions, then review available results to guide improvements.'],
  ];
  if (/ads|ppc|advertis/i.test(title)) return [
    [`What is included in ${name.toLowerCase()}?`, 'The scope may include campaign planning, audience or keyword research, creative and landing-page alignment, tracking review, optimization and reporting based on your objectives.'],
    ['How much should I budget for advertising?', 'Budget depends on your market, audience, campaign goals and the amount of data needed to learn. We can discuss a practical starting point after understanding your business and target area.'],
    ['How will campaign performance be reported?', 'Reporting should connect activity to your agreed goals. We review relevant metrics such as qualified leads, conversions, cost and engagement, and explain what they suggest for next steps.'],
  ];
  if (/reputation/i.test(title)) return [
    ['What does reputation management involve?', 'It can include monitoring public feedback, improving review response processes, strengthening accurate business information and developing useful content that reflects your expertise.'],
    ['Can negative reviews be removed?', 'Removal depends on the platform’s policies and the review itself. We can help assess whether it may violate a platform policy and plan an appropriate response, but removal cannot be guaranteed.'],
    ['How do we respond to customer feedback?', 'Responses should be timely, professional and specific to the concern. We can help create practical guidance that reflects your brand and supports a constructive customer experience.'],
  ];
  if (/local|citation|google business/i.test(title)) return [
    [`What does ${name.toLowerCase()} include?`, 'Local support may cover business profile information, location and service-area signals, directory consistency, local landing pages and review guidance, depending on your current presence.'],
    ['Can this help customers find my business nearby?', 'Accurate local information and useful location-focused pages can make your business easier to discover. Results depend on factors such as relevance, competition, proximity and your market.'],
    ['How do you check local SEO progress?', 'We review suitable signals such as local visibility, profile interactions, website visits and qualified enquiries, then use the findings to guide ongoing priorities.'],
  ];
  if (/seo|search|cms|wordpress|shopify|wix|squarespace/i.test(title)) return [
    [`What is included in ${name.toLowerCase()}?`, 'The scope is tailored to your site and may include research, technical or on-page review, content recommendations, implementation guidance and performance reporting. We agree priorities based on your current needs.'],
    ['How long does SEO take to show results?', 'SEO is ongoing work, and timing varies with your site, competition, search demand and the changes made. We focus on sound priorities and track progress over time rather than promise a fixed ranking date.'],
    ['Can you guarantee search rankings?', 'No ethical SEO provider can guarantee a specific ranking. We focus on improving the quality and discoverability of your site, following search guidelines and measuring meaningful progress.'],
  ];
  return [
    [`What does ${name.toLowerCase()} include?`, 'We shape the work around your business, audience and goals. After learning about your needs, we outline relevant activities, deliverables and a practical way to measure progress.'],
    ['Can this service be tailored to my business?', 'Yes. We consider your current situation, audience and priorities before recommending a scope, so the work fits your needs rather than relying on a one-size-fits-all package.'],
    ['How do we get started?', 'Share your goals and any relevant website or campaign details through the quote form. Our team can review the information and discuss suitable next steps with you.'],
  ];
}

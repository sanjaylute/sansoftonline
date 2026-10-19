import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, MapPin, Search, ShieldCheck, Star, ClipboardCheck, UsersRound, Send, Fingerprint, Building2, BadgeCheck, CopyCheck, Link2, FileBarChart, RefreshCw, ContactRound, ScanSearch } from 'lucide-react';
import './citations.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("local-citations-directories");

const included = [
  ['Citation audit', 'We find existing listings and flag inconsistent, duplicate or outdated business information that can undermine trust in your local presence.'],
  ['Competitor citation analysis', 'We review where relevant local competitors are listed to identify useful, industry-specific directories you may be missing.'],
  ['Manual directory submission', 'We submit your business details carefully to relevant general and niche directories, prioritizing accuracy and quality over volume.'],
  ['NAP consistency fixes', 'We align your business name, address and phone number across key platforms so customers and search engines see reliable details.'],
  ['Industry and city-specific listings', 'We look beyond broad directories to find credible listings that fit your industry, location and audience.'],
  ['Google Business Profile alignment', 'We check that directory information agrees with your Google Business Profile and website, reinforcing a consistent local identity.'],
  ['Duplicate listing cleanup', 'We identify duplicate citations that can confuse customers and search engines, then guide cleanup through the relevant platforms.'],
  ['Local SEO integration', 'We connect citation work with your local landing pages, service areas and broader local SEO strategy.'],
  ['Transparent reporting', 'You receive a clear record of submissions, corrections and listing status so the work is easy to review.'],
  ['Ongoing monitoring and updates', 'When business details change, we help update important listings so old information does not linger across the web.'],
  ['Trust-building profiles', 'We improve eligible profiles with accurate categories, descriptions and business details that help people understand your offer.'],
  ['Citation tracking and indexing', 'We monitor listing availability and indexation where possible, focusing on useful coverage and quality rather than raw listing counts.'],
];

const includedIcons = [ClipboardCheck, UsersRound, Send, Fingerprint, Building2, BadgeCheck, CopyCheck, Link2, FileBarChart, RefreshCw, ContactRound, ScanSearch];

const reasons = [
  ['Manual, quality-first work', 'Listings are handled with care, reducing the risk of inaccurate or spammy submissions.'],
  ['Built around your market', 'We prioritize directories that make sense for your industry, city and customers.'],
  ['NAP accuracy', 'Business details are checked consistently to reduce conflicting information across platforms.'],
  ['Clear records', 'You can see which listings were reviewed, corrected or submitted and what still needs attention.'],
  ['Connected local strategy', 'Citation work supports your website, local pages and business profile instead of operating in isolation.'],
  ['Ongoing support', 'Our team can help keep important listings current as your business information evolves.'],
];

export default function LocalCitationsPage() {
  return <main className="citations-page">
    <section className="citations-hero"><div className="citations-wrap citations-hero-grid">
      <div className="citations-copy"><span className="citations-kicker"><i/> LOCAL CITATIONS &amp; DIRECTORY SUBMISSION</span><h1>Build local trust.<br/><em>Strengthen your visibility.</em></h1><p>Are customers finding outdated or inconsistent details when they search for your business? Sansoft’s local citation and directory services help make your business information accurate, visible and credible across the websites and directories that matter to your market.</p><ul>{['Accurate name, address and phone details','Relevant general, local and industry listings','Manual submissions with clear progress reporting'].map(t=><li key={t}><Check size={17}/>{t}</li>)}</ul><div className="citations-actions"><Link className="citations-button" href="/request-quote/?service=Local%20Citation%20Audit">Get a free citation audit <ArrowUpRight size={18}/></Link><a href="#included" className="citations-link">Explore the service <ArrowRight size={17}/></a></div></div>
      <div className="citations-hero-image"><img src="https://images.unsplash.com/photo-1666281466387-0639381c5680?auto=format&fit=crop&w=1500&q=85" alt="Laptop displaying a location map with business pins"/><div className="citations-image-shade"/><div className="citations-image-caption"><span>ACCURATE. RELEVANT. CONSISTENT.</span><strong>Every detail<br/>in the right place.</strong></div><div className="citations-float"><MapPin/><span><b>Local business data</b><small>Aligned across key listings</small></span></div></div>
    </div><div className="citations-strip"><div className="citations-wrap"><span>YOUR LOCAL PRESENCE</span><b>Correct business details</b><i/><b>Trusted directories</b><i/><b>Consistent customer experience</b></div></div></section>

    <section className="citations-intro citations-wrap"><div className="citations-intro-photo"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="Independent retail storefront welcoming nearby customers" loading="lazy"/><div><span>LOCAL DISCOVERY</span><b>Be easy to find<br/>and easy to trust.</b></div></div><div className="citations-intro-copy"><span className="citations-kicker"><i/> WHY LOCAL CITATIONS MATTER</span><h2>What are <em>local citations?</em></h2><p>Local citations are online mentions of your business name, address and phone number—often called NAP—on directories, social platforms, apps and other websites. Examples include Google Maps, Yelp, Justdial, Yellow Pages, Facebook and niche-specific listings.</p><p>Accurate citations help customers confirm that they have found the right business and give search engines consistent information to evaluate. Conflicting addresses, old phone numbers or duplicate listings can create confusion. We audit, correct and build relevant citations to support a reliable local presence over time.</p><div className="citations-pills"><span><ShieldCheck/> Consistent information</span><span><Search/> Local discovery</span><span><Star/> Customer confidence</span></div><Link href="/request-quote/?service=Local%20Citation%20Audit" className="citations-text-link">Request your citation audit <ArrowRight size={17}/></Link></div></section>

    <section className="citations-included" id="included"><div className="citations-wrap"><div className="citations-section-head"><div><span className="citations-kicker"><i/> CITATION STRATEGY THAT WORKS</span><h2>Accurate details.<br/><em>Stronger local authority.</em></h2></div><p>From the first audit to ongoing updates, we manage the details that make your directory presence more consistent and useful to customers.</p></div><div className="citations-grid">{included.map(([title, text], i)=>{const Icon=includedIcons[i];return <article key={title}><div className="citations-card-icon"><Icon size={21} strokeWidth={1.8}/></div><div><h3>{title}</h3><p>{text}</p></div></article>})}</div></div></section>

    <section className="citations-why"><div className="citations-wrap"><div className="citations-section-head"><div><span className="citations-kicker"><i/> WHY SANSOFT</span><h2>Local listings,<br/><em>handled with care.</em></h2></div><p>Strong citations come from thoughtful choices and dependable details. Our process focuses on useful coverage, accurate information and clear accountability.</p></div><div className="citations-reasons">{reasons.map(([title, text], i)=><article key={title}><b>0{i+1}</b><h3>{title}</h3><p>{text}</p></article>)}</div><div className="citations-cta"><div><span>READY TO STRENGTHEN YOUR LOCAL PRESENCE?</span><h3>Let’s put your business details in order.</h3><p>Start with a free citation audit and see where information is missing, inconsistent or ready to improve.</p></div><Link className="citations-button" href="/request-quote/?service=Local%20Citation%20Audit">Request your free audit <ArrowUpRight size={18}/></Link></div></div></section>
  </main>;
}

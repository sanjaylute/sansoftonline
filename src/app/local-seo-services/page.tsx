import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, MapPin, Navigation, Search, Star, Target, TrendingUp } from 'lucide-react';
import './local-seo.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("local-seo-services");

const deliverables = [
  ['Local keyword research','We identify the searches local customers use—from service-and-city terms to “near me” queries—and use those findings to guide your content and optimization priorities.'],
  ['Geo-targeted landing pages','We plan useful pages for the places you actually serve, with relevant local context, clear service information and calls to action that help visitors take the next step.'],
  ['On-page local optimization','We refine titles, meta descriptions, headings, image alt text and page content with location-aware language that reads naturally and supports local relevance.'],
  ['NAP consistency','We check your business name, address and phone number across your website and key directories, then identify inconsistencies that can confuse customers and search engines.'],
  ['Google Business Profile integration','We align your website and Google Business Profile details so customers can move easily between local search, your service information and your contact options.'],
  ['Local business schema','We recommend structured data that helps search engines interpret your business details, services and geographic area.'],
  ['Local citation building','We identify relevant directories and citation opportunities, then help keep business information accurate and consistent across the web.'],
  ['Customer review strategy','We help create a practical process for earning genuine customer feedback and responding in a way that builds trust.'],
  ['Mobile optimization','We review mobile speed, readability and contact paths, because nearby customers often search while they are ready to call, visit or book.'],
  ['Internal linking for local signals','We connect your core service pages with relevant location pages so visitors can navigate easily and search engines can understand how your local content relates.'],
  ['Local competitor analysis','We review how relevant businesses appear in local search and identify opportunities in their service pages, business profiles and customer experience.'],
  ['Monthly reporting and tracking','We report on agreed local search signals—such as keyword visibility, map presence, website visits and enquiries—so you can see what is improving and what needs attention.'],
] as const;

const reasons = [
  ['Hyperlocal focus','We shape the strategy around your actual service areas and the customers you want to reach there.'],
  ['Pages built to convert','Location pages answer real customer questions and make it easy to call, book or request information.'],
  ['Connected local presence','We coordinate your website, Google Business Profile, reviews and local listings as parts of one customer journey.'],
  ['Ready for more locations','For businesses serving multiple areas, we help maintain accurate information and useful local experiences as coverage grows.'],
  ['Clear reporting','We explain visibility, traffic and enquiry trends in plain language, with practical next steps.'],
  ['People you can reach','You work with a team that learns your business and stays available as priorities change.'],
];

const faqs = [
  ['What do local SEO services include?','Local SEO can include local keyword research, location page improvements, Google Business Profile alignment, citation consistency, local structured data, mobile experience, review guidance and reporting. The right mix depends on your business and service areas.'],
  ['Can local SEO help a service-area business without a storefront?','Yes. A local strategy can be planned around the areas you genuinely serve, with accurate business details and useful location content. Recommendations depend on your business eligibility and setup.'],
  ['How many location pages does my business need?','That depends on the number of areas you serve and whether you can provide useful, distinct information for each one. We avoid making thin duplicate pages and prioritize locations with a clear customer need.'],
  ['How do you measure local SEO progress?','We agree on useful measures such as local search visibility, map presence, website visits, calls and enquiries where tracking is available, then review changes over time.'],
];

export default function LocalSeoPage() {
  return <main className="local-seo-page">
    <section className="ls-hero"><div className="ls-shell ls-hero-grid">
      <div className="ls-hero-copy"><div className="ls-eyebrow"><i/> LOCAL SEO SERVICES</div><h1>Rank higher in your area.<br/><em>Win more local customers.</em></h1><p>Help nearby customers find your business when they are ready to call, visit or book. Sansoft’s local SEO services bring local keyword research, useful location pages, business profile alignment and practical reporting together around your market.</p><ul>{['Local keyword strategy for the places you serve','Location pages built around real customer needs','Google Business Profile and citation alignment'].map(x=><li key={x}><Check size={16}/>{x}</li>)}</ul><div className="ls-actions"><Link className="ls-button" href="/request-quote/?service=Local%20SEO">Get a free local SEO audit <ArrowUpRight size={17}/></Link><a href="#local-seo-includes" className="ls-inline">Explore what’s included <ArrowRight size={16}/></a></div></div>
      <div className="ls-hero-photo"><img src="https://sitecura.com/_next/image?q=75&url=%2Fimages%2Fsitecura%2Fhero-local-owner.webp&w=3840" alt="Local shop owner checking the business profile shown on a smartphone and laptop"/><div className="ls-photo-shade"/><div className="ls-photo-label"><MapPin size={16}/> LOCAL SEARCH · REAL CUSTOMERS</div><div className="ls-photo-caption"><span>BE VISIBLE WHERE IT MATTERS</span><b>Make your next<br/>local customer<br/><em>easier to find.</em></b></div><div className="ls-photo-note"><span><Navigation size={17}/></span><b>Search nearby.<br/>Connect locally.</b></div></div>
    </div><div className="ls-hero-bottom"><div className="ls-shell"><span>BUILT FOR YOUR SERVICE AREA</span><i/><b>Relevant local pages</b><i/><b>Consistent business details</b><i/><b>Clear customer next steps</b></div></div></section>

    <section className="ls-definition ls-shell"><div className="ls-definition-photo"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="A welcoming neighborhood storefront ready to serve local customers" loading="lazy"/><div><span>LOCAL INTENT</span><b>From nearby search<br/>to a real connection.</b></div></div><div className="ls-definition-copy"><div className="ls-eyebrow"><i/> LOCAL SEO, EXPLAINED</div><h2>What is <em>local SEO?</em></h2><p>Local SEO is the work of improving your website and online presence so people can find you in searches tied to a place. Think “dentist near me” or “best pizza in Whitefield”: these searches often come from people looking for a nearby business and a clear next step.</p><p>That work can include location-focused pages, local metadata and internal links, Google Business Profile integration and consistent business citations. Unlike broad organic SEO, local SEO connects your business with people in the areas you serve—supporting calls, visits and bookings.</p><div className="ls-intent-points"><span><Search size={16}/> Local discovery</span><span><MapPin size={16}/> Service areas</span><span><Target size={16}/> Customer action</span></div><Link className="ls-text-link" href="/request-quote/?service=Local%20SEO">Talk with our local SEO team <ArrowRight size={16}/></Link></div></section>

    <section className="ls-deliverables" id="local-seo-includes"><div className="ls-shell"><div className="ls-section-heading"><div><div className="ls-eyebrow"><i/> WHAT OUR LOCAL SEO SERVICES INCLUDE</div><h2>Rank locally.<br/><em>Grow with purpose.</em></h2></div><p>We tailor each engagement to your business, customers and locations. These are the core areas we can bring together to strengthen local visibility and help turn discovery into enquiries.</p></div><div className="ls-deliverable-grid">{deliverables.slice(0,6).map(([title,text],i)=><article key={title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div><i/></article>)}</div><details className="ls-show-all"><summary>View all 12 local SEO deliverables <ArrowRight size={17}/></summary><div className="ls-deliverable-grid">{deliverables.slice(6).map(([title,text],i)=><article key={title}><span>{String(i+7).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div><i/></article>)}</div></details></div></section>

    <section className="ls-why"><div className="ls-shell"><div className="ls-section-heading"><div><div className="ls-eyebrow"><i/> WHY SANSOFT FOR LOCAL SEO</div><h2>More than visibility.<br/><em>Local growth that connects.</em></h2></div><p>Your local search presence should make it easier for the right people to understand what you offer and how to choose you. We combine local strategy with thoughtful execution and clear communication.</p></div><div className="ls-reasons">{reasons.map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="ls-local-cta"><div><span>READY TO SHOW UP IN YOUR AREA?</span><h3>Let’s make your business easier to find.</h3><p>Start with a free local SEO audit and a clear view of the opportunities across your website and service area.</p></div><Link className="ls-button ls-button-light" href="/request-quote/?service=Local%20SEO">Request your free audit <ArrowUpRight size={17}/></Link></div></div></section>

    <section className="ls-faq ls-shell"><div><div className="ls-eyebrow"><i/> LOCAL SEO QUESTIONS</div><h2>Helpful answers<br/><em>for your next step.</em></h2><p>Every business has a different location, audience and service footprint. We’ll help you find a plan that makes sense for yours.</p></div><div className="ls-faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
  </main>;
}

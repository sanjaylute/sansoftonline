import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Search, Settings2, FileText, Link2, ChartNoAxesCombined, ShieldCheck, MapPin, Video, Mic2, Sparkles, ClipboardCheck, BarChart3, Quote } from 'lucide-react';
import './seo-service.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("seo-services");

const benefits = [
  {icon:ChartNoAxesCombined,title:'Proven SEO expertise',text:'Our team works across industries and business sizes, bringing practical experience in search strategy, website optimization and organic growth.'},
  {icon:MapPin,title:'Customized SEO strategies',text:'Your SEO plan is shaped around your market, audience, competition, website and commercial goals. Priorities are based on opportunity, not a one-size-fits-all checklist.'},
  {icon:ClipboardCheck,title:'Comprehensive website SEO audit',text:'We review technical health, search visibility, content quality, keyword opportunities and competitor gaps, then turn the findings into a clear improvement roadmap.'},
  {icon:FileText,title:'On-page optimization',text:'We improve page titles, meta descriptions, headings, content, images, internal links and URL structure so pages are useful to visitors and easier for search engines to interpret.'},
  {icon:Settings2,title:'Technical SEO',text:'We work on crawlability, indexation, site speed, mobile usability, structured data, redirects and other foundations that affect how a site is discovered and experienced.'},
  {icon:Link2,title:'Responsible authority building',text:'We focus on earning relevant, credible mentions and links through useful content and outreach, rather than relying on shortcuts that can put trust at risk.'},
  {icon:FileText,title:'Content marketing and optimization',text:'We plan and refine landing pages, articles, service pages and product content around real search intent, helping the right people find useful answers.'},
  {icon:BarChart3,title:'Clear reporting and ongoing support',text:'Regular updates explain work completed, visibility trends, organic traffic and enquiries. We use the evidence to refine priorities and keep the strategy moving.'},
];

const seoServices = [
  {href:'/on-page-seo-services/',icon:FileText,title:'On-Page SEO',text:'Optimize page content, title tags, meta descriptions, headings, images, URLs and internal links to improve relevance and user experience.'},
  {href:'/technical-seo-services/',icon:Settings2,title:'Technical SEO',text:'Resolve crawl and indexation issues, improve site speed and mobile usability, and strengthen the technical foundation of your website.'},
  {href:'/off-page-seo-services/',icon:Link2,title:'Off-Page SEO',text:'Build authority with quality backlinks, relevant brand mentions and thoughtful outreach that support long-term search visibility.'},
  {href:'/voice-search-seo-services/',icon:Mic2,title:'Voice Search SEO',text:'Make useful information easier to discover through conversational, question-led searches and clear answers.'},
  {href:'/youtube-video-seo-services/',icon:Video,title:'YouTube Video SEO',text:'Improve video discovery with audience research, optimized titles and descriptions, channel structure and a stronger content plan.'},
  {href:'/generative-engine-optimization-services/',icon:Sparkles,title:'Generative Engine Optimization (GEO)',text:'Make your expertise, brand information and content easier to understand across evolving AI-powered search experiences.'},
];

const workAreas = [
  {icon:Search,title:'SEO setup and analysis',items:['Keyword research and search-intent mapping','In-depth website and competitor analysis','Duplicate-content and indexation checks','Initial visibility and ranking baseline','Google Search Console and analytics review']},
  {icon:FileText,title:'On-page optimization',items:['Page speed and image optimization','Heading structure and HTML cleanup','Internal linking and anchor text','Robots.txt and XML sitemap review','Title, meta description and canonical tags']},
  {icon:Settings2,title:'Technical SEO',items:['Crawlability and website indexation','HTTPS, broken links and redirect chains','Mobile friendliness and Core Web Vitals','Structured data and breadcrumb guidance','Orphan pages, duplicate URLs and 5xx errors']},
  {icon:Link2,title:'Off-page optimization',items:['Backlink profile review','Relevant authority and outreach opportunities','Brand mention monitoring','Digital PR and content-led link earning','Toxic-link assessment where appropriate']},
  {icon:BarChart3,title:'Reporting and improvement',items:['Keyword and visibility reporting','Website audit and action summaries','Organic traffic and landing-page review','Progress updates and priority tracking','Strategy refinements based on observed results']},
];

const faqs = [
  {q:'What do SEO services include?',a:'SEO services can include keyword research, website audits, on-page optimization, technical SEO, content planning, local search improvements, authority building and performance reporting. The right mix depends on your website, market and business goals.'},
  {q:'How long does SEO take to show results?',a:'SEO is a sustained process, and timing varies with competition, website condition, content quality and the work required. We establish a baseline, prioritize the highest-impact fixes and report progress over time rather than promising a fixed ranking or deadline.'},
  {q:'How do you measure SEO performance?',a:'We review relevant measures such as search visibility, keyword movement, organic visits, landing-page engagement and enquiries or conversions where tracking is available. Reporting connects the work to the outcomes that matter to your business.'},
  {q:'Can you work with an existing website or CMS?',a:'Yes. SEO work can be tailored for existing websites and platforms such as WordPress, Shopify, Wix and Squarespace. We first assess the platform setup and identify changes that are practical and valuable.'},
  {q:'Do you use white-hat SEO techniques?',a:'Our approach prioritizes helpful content, sound technical foundations and responsible authority building. We avoid shortcuts that can compromise your website’s long-term trust and search performance.'},
];

export default function SeoServicesPage() {
  return <main className="seo-page">
    <section className="seo-hero"><div className="seo-shell seo-hero-grid">
      <div className="seo-hero-copy"><div className="seo-eyebrow"><i/> SEARCH ENGINE OPTIMIZATION</div><h1>SEO services<br/>that drive <em>lasting<br/>results.</em></h1><p>Build your visibility with a search engine optimization strategy grounded in research, sound technical work and useful content. Sansoft helps businesses improve organic rankings, attract qualified traffic and turn more of the right visits into enquiries.</p><div className="seo-hero-actions"><Link className="seo-button" href="/request-quote">Request a free SEO audit <ArrowUpRight size={17}/></Link><a href="#seo-services-list" className="seo-inline-link">Explore SEO services <ArrowRight size={16}/></a></div><div className="seo-hero-proof"><span><Check size={15}/></span><b>Strategy tailored to your website and goals</b></div></div>
      <div className="seo-hero-photo" role="img" aria-label="Website analytics and search performance being reviewed on a laptop"><div className="seo-photo-shade"/><div className="seo-photo-label"><span>SEARCH ENGINE OPTIMIZATION</span><b>Make your next<br/>move <em>discoverable.</em></b><small>Research · Technical SEO · Content · Reporting</small></div><a href="https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-desk-zKyy5qarc7g" target="_blank" rel="noreferrer" className="seo-photo-credit">Photo by Walls.io / Unsplash</a></div>
    </div><div className="seo-hero-strip"><div className="seo-shell"><span>SEARCH STRATEGY</span><i/><b>Understand demand</b><i/><b>Improve the experience</b><i/><b>Measure meaningful progress</b></div></div></section>

    <section className="seo-value seo-shell"><div className="seo-section-heading"><div className="seo-eyebrow"><i/> SEO THAT SUPPORTS BUSINESS GROWTH</div><h2>More than rankings.<br/><em>A stronger search presence.</em></h2><p>Search visibility matters most when it connects the right people with the right pages. Our SEO company approach brings research, website improvements and ongoing analysis together, so the work supports discovery, trust and business growth.</p></div><div className="seo-value-grid"><article><span>01</span><h3>Innovative SEO solutions</h3><p>Search is always changing. We keep your SEO strategy responsive to evolving search behavior, useful content standards and technology—while keeping the fundamentals strong.</p></article><article><span>02</span><h3>Holistic SEO tactics</h3><p>We look beyond isolated keywords. Technical SEO, on-page optimization, local visibility, content marketing and authority all work together to create a more complete organic presence.</p></article><article><span>03</span><h3>Progress you can understand</h3><p>We focus on the metrics that show whether your strategy is moving in the right direction, from search visibility and organic traffic to qualified enquiries and conversions.</p></article></div></section>

    <section className="seo-why"><div className="seo-shell"><div className="seo-section-heading seo-section-heading-dark"><div className="seo-eyebrow"><i/> WHY CHOOSE SANSOFT</div><h2>What you get from an<br/><em>experienced SEO partner.</em></h2><p>When you hire Sansoft as your SEO company, you gain a team that takes the time to understand your website, audience and goals. We combine technical analysis with practical recommendations, clear communication and continued optimization.</p></div><div className="seo-benefit-grid">{benefits.map((item,index)=>{const Icon=item.icon;return <article key={item.title}><div className="seo-benefit-top"><span><Icon size={21}/></span><small>0{index+1}</small></div><h3>{item.title}</h3><p>{item.text}</p></article>})}</div><div className="seo-partner-note"><ShieldCheck size={22}/><p><b>A strategy shaped for your business.</b><br/>Whether you run a local company, an ecommerce store or a growing service business, we build an SEO roadmap around your market and the opportunities on your website.</p></div></div></section>

    <section className="seo-services-list seo-shell" id="seo-services-list"><div className="seo-section-heading"><div className="seo-eyebrow"><i/> OUR SEO SERVICES</div><h2>Specialist SEO services<br/><em>for every part of search.</em></h2><p>Choose focused support for a specific challenge or bring several disciplines together into a coordinated search engine optimization plan.</p></div><div className="seo-specialty-grid">{seoServices.map(item=>{const Icon=item.icon;return <article key={item.title}><span className="seo-specialty-icon"><Icon size={22}/></span><div><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href}>Explore this service <ArrowUpRight size={15}/></Link></div></article>})}</div></section>

    <section className="seo-glance"><div className="seo-shell"><div className="seo-section-heading"><div className="seo-eyebrow"><i/> SEO SERVICE AT A GLANCE</div><h2>A practical roadmap from<br/><em>audit to improvement.</em></h2><p>Every SEO campaign starts with understanding how your website performs today. We use that insight to prioritize work across your site, content and authority.</p></div><div className="seo-work-grid">{workAreas.map((area,index)=>{const Icon=area.icon;return <article key={area.title}><div className="seo-work-head"><span><Icon size={21}/></span><small>0{index+1}</small></div><h3>{area.title}</h3><ul>{area.items.map(item=><li key={item}><Check size={14}/>{item}</li>)}</ul></article>})}</div></div></section>

    <section className="seo-process seo-shell"><div className="seo-process-copy"><div className="seo-eyebrow"><i/> HOW OUR SEO PROCESS WORKS</div><h2>Clear priorities.<br/><em>Steady improvement.</em></h2><p>Good SEO is an ongoing partnership. We use a clear process to find opportunities, resolve issues, improve important pages and keep you informed about the work and its progress.</p><Link className="seo-button" href="/request-quote">Talk with an SEO expert <ArrowUpRight size={17}/></Link></div><div className="seo-process-steps"><article><b>01</b><div><h3>Audit and understand</h3><p>We review your site, search visibility, competitors, content and technical setup to identify what is helping and what is holding you back.</p></div></article><article><b>02</b><div><h3>Set priorities and strategy</h3><p>We map search intent to useful pages, agree on meaningful goals and organize recommendations into an actionable SEO roadmap.</p></div></article><article><b>03</b><div><h3>Optimize and build</h3><p>We improve technical foundations, on-page elements and content, then work on relevant authority opportunities and internal links.</p></div></article><article><b>04</b><div><h3>Measure and refine</h3><p>We review search performance and business outcomes, share clear reports and adjust the plan as we learn what works.</p></div></article></div></section>

    <section className="seo-credentials seo-shell" aria-label="Sansoft SEO credentials on Upwork and Fiverr">
      <article className="seo-credential">
        <span className="seo-platform-mark seo-upwork-mark" aria-hidden="true">Up</span>
        <h2>#1 Top Rated Plus<br/>SEO Agency in Upwork</h2>
        <a href="https://www.upwork.com/agencies/sansoft/" target="_blank" rel="noreferrer">View our Upwork profile <ArrowRight size={17}/></a>
      </article>
      <article className="seo-credential">
        <span className="seo-platform-mark seo-fiverr-mark" aria-hidden="true">fiverr</span>
        <h2>Top Rated SEO<br/>Service provider in Fiverr</h2>
        <a href="https://www.fiverr.com/s/99Ar02j" target="_blank" rel="noreferrer">View our Fiverr profile <ArrowRight size={17}/></a>
      </article>
      <article className="seo-credential-cta">
        <span>READY TO GROW ORGANICALLY?</span>
        <h2>Looking for high-quality SEO service for your business?</h2>
        <Link href="/contact-us">Contact us now <ArrowUpRight size={17}/></Link>
      </article>
    </section>

    <section className="seo-testimonial seo-shell"><div className="seo-quote-mark"><Quote size={24}/></div><div><span>SEO CLIENT FEEDBACK</span><blockquote>“Did great work! Definitely will hire Sansoft for next SEO project.”</blockquote><small>Client feedback shared on the Sansoft website</small></div><Link href="/testimonials" aria-label="Read more testimonials"><ArrowUpRight size={20}/></Link></section>

    <section className="seo-faq"><div className="seo-shell seo-faq-layout"><div className="seo-section-heading"><div className="seo-eyebrow"><i/> SEO QUESTIONS, ANSWERED</div><h2>Helpful answers before<br/><em>you get started.</em></h2><p>Learn what SEO services can include, how progress is measured and what to expect from a long-term search strategy.</p><Link className="seo-inline-link" href="/request-quote">Ask us about your SEO goals <ArrowRight size={16}/></Link></div><div className="seo-faq-list">{faqs.map(item=><details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div></div></section>

    <section className="seo-final"><div className="seo-shell"><div><span>READY TO IMPROVE YOUR ORGANIC VISIBILITY?</span><h2>Let’s build an SEO strategy<br/>that moves your business forward.</h2><p>Talk to Sansoft about a free SEO audit and consultation. We’ll review your needs and recommend a practical next step.</p></div><Link className="seo-button seo-button-light" href="/request-quote">Get your free SEO audit <ArrowUpRight size={17}/></Link></div></section>
  </main>;
}

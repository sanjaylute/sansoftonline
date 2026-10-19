import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import './marketing-service-page.css';

export type MarketingPageData = {
  variant: 'search'|'display'|'shopping'|'video'|'onpage';
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  action: string;
  introEyebrow: string;
  introTitle: string;
  introAccent: string;
  intro: string[];
  highlights: {title:string;text:string}[];
  sectionEyebrow: string;
  sectionTitle: string;
  sectionAccent: string;
  sectionText: string;
  deliverables: {title:string;text:string}[];
  process: {title:string;text:string}[];
  faqs: {q:string;a:string}[];
  calloutEyebrow: string;
  calloutTitle: string;
  calloutText: string;
};

function HeroVisual({variant}:{variant:MarketingPageData['variant']}){
  const visuals={
    search:{src:'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1500&q=85',alt:'Marketing team reviewing search campaign performance',label:'PAID SEARCH STRATEGY',caption:'Find the right people.'},
    display:{src:'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1500&q=85',alt:'Creative team planning a digital advertising campaign',label:'CAMPAIGN CREATIVE',caption:'Make your brand memorable.'},
    shopping:{src:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1500&q=85',alt:'Ecommerce performance dashboard on a laptop',label:'SHOPPING CAMPAIGNS',caption:'Turn discovery into sales.'},
    video:{src:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1500&q=85',alt:'Creative team collaborating on a video campaign',label:'VIDEO ADVERTISING',caption:'Tell a story worth watching.'},
    onpage:{src:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1500&q=85',alt:'Designer reviewing a website page on a laptop',label:'ON-PAGE SEO',caption:'Make every page work harder.'},
  } satisfies Record<MarketingPageData['variant'],{src:string;alt:string;label:string;caption:string}>;
  const visual=visuals[variant];
  return <div className={`msp-photo-visual msp-photo-${variant}`}><img src={visual.src} alt={visual.alt} loading="eager"/><div className="msp-photo-shade"/><div className="msp-photo-label"><i/> {visual.label}</div><div className="msp-photo-caption"><span>STRATEGY · CREATIVE · PERFORMANCE</span><b>{visual.caption}</b></div><div className="msp-photo-note"><span><Check size={15}/></span><div><small>THE SANSOFT APPROACH</small><b>One connected team.<br/>Clear next steps.</b></div></div></div>;
}

export default function MarketingServicePage({data}:{data:MarketingPageData}){
  return <main className={`msp-page msp-${data.variant}`}>
    <section className="msp-hero"><div className="msp-shell msp-hero-grid"><div className="msp-hero-copy"><div className="msp-eyebrow"><i/>{data.eyebrow}</div><h1>{data.title}<br/><em>{data.accent}</em></h1><p>{data.description}</p><div className="msp-actions"><Link href="/request-quote" className="msp-button">{data.action}<ArrowUpRight size={17}/></Link><a className="msp-text-link" href="#service-details">What’s included <ArrowRight size={16}/></a></div><div className="msp-proof"><span><Check size={15}/></span><b>Tailored to your goals, audience and website</b></div></div><HeroVisual variant={data.variant}/></div><div className="msp-strip"><div className="msp-shell"><span>STRATEGY BEFORE SPEND</span><i/><b>Relevant to your audience</b><i/><b>Clear about the next step</b><i/><b>Measured for progress</b></div></div></section>
    <section className="msp-intro msp-shell"><div><div className="msp-eyebrow"><i/>{data.introEyebrow}</div><h2>{data.introTitle}<br/><em>{data.introAccent}</em></h2></div><div>{data.intro.map(text=><p key={text}>{text}</p>)}</div></section>
    <section className="msp-highlights"><div className="msp-shell"><div className="msp-section-heading"><div className="msp-eyebrow"><i/>WHY SANSOFT</div><h2>Good work, grounded<br/><em>in the details.</em></h2><p>We pair thoughtful strategy with careful execution and clear communication, so you understand what is being done and why it matters.</p></div><div className="msp-highlight-grid">{data.highlights.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    <section className="msp-details msp-shell" id="service-details"><div className="msp-section-heading"><div className="msp-eyebrow"><i/>{data.sectionEyebrow}</div><h2>{data.sectionTitle}<br/><em>{data.sectionAccent}</em></h2><p>{data.sectionText}</p></div><div className="msp-deliverables">{data.deliverables.slice(0,6).map((item,index)=><article key={item.title}><span>{String(index+1).padStart(2,'0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>{data.deliverables.length>6&&<details className="msp-show-deliverables"><summary>View all {data.deliverables.length} deliverables <ArrowRight size={16}/></summary><div className="msp-deliverables">{data.deliverables.slice(6).map((item,index)=><article key={item.title}><span>{String(index+7).padStart(2,'0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></details>}</section>
    <section className="msp-process"><div className="msp-shell msp-process-grid"><div className="msp-section-heading"><div className="msp-eyebrow"><i/>A CLEAR, COLLABORATIVE PROCESS</div><h2>Thoughtful at launch.<br/><em>Better over time.</em></h2><p>We begin with a clear understanding of your goals and keep you involved as the work moves forward.</p></div><div className="msp-steps">{data.process.map((item,index)=><article key={item.title}><b>0{index+1}</b><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>
    <section className="msp-faq"><div className="msp-shell msp-faq-grid"><div className="msp-section-heading"><div className="msp-eyebrow"><i/>COMMON QUESTIONS</div><h2>Helpful answers<br/><em>before you start.</em></h2><p>Talk with our team about your website, audience and goals. We’ll help you identify the right next step.</p><Link className="msp-text-link" href="/request-quote">Ask a question <ArrowRight size={16}/></Link></div><div className="msp-faq-list">{data.faqs.map(item=><details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div></div></section>
    <section className="msp-cta"><div className="msp-shell"><div><span>{data.calloutEyebrow}</span><h2>{data.calloutTitle}</h2><p>{data.calloutText}</p></div><Link href="/request-quote" className="msp-button">Get a free consultation <ArrowUpRight size={16}/></Link></div></section>
  </main>;
}

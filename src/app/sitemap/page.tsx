import Link from 'next/link';
import { ArrowUpRight, Compass, FileText, MapPin, Palette, Search, ShoppingBag, Target, Users } from 'lucide-react';
import { remainingPages } from '@/lib/remaining-page-data';
import './sitemap.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("sitemap");

const excluded=new Set(['shop','cart','checkout','our-portfolio','smm-packages','seo-package-details','sitemap']);
const sections=[
  {name:'Search engine optimization',icon:Search,match:(category:string)=>category.includes('SEO')&&!category.includes('Local')},
  {name:'Local search',icon:MapPin,match:(category:string)=>category.includes('Local')},
  {name:'Paid advertising',icon:Target,match:(category:string)=>category.includes('Paid')},
  {name:'Social media',icon:Users,match:(category:string)=>category.includes('Social')},
  {name:'Creative and design',icon:Palette,match:(category:string)=>category.includes('Design')},
  {name:'Packages',icon:ShoppingBag,match:(category:string)=>category.includes('Packages')},
];
const coreLinks=[['Home','/'],['About Sansoft','/about-us/'],['Services','/services/'],['Packages','/seo-packages/'],['Portfolio','/our-portfolio/'],['Insights and blog','/blog/'],['Testimonials','/testimonials/'],['Certifications','/certifications/'],['Contact us','/contact-us/'],['Request a quote','/request-quote/']];

export default function SitemapPage(){return <main className="site-map-page"><section className="smap-hero"><div className="smap-wrap"><div className="smap-kicker"><Compass size={16}/> FIND YOUR WAY AROUND</div><h1>Explore Sansoft.<br/><em>Find the right next step.</em></h1><p>Browse our services, company information and resources. If you’re unsure where to begin, tell us what you’re working toward and we’ll point you in a useful direction.</p><Link className="smap-button" href="/request-quote/">Talk with our team <ArrowUpRight size={18}/></Link></div><div className="smap-index">SANSOFT <span>·</span> SITE DIRECTORY</div></section>
  <section className="smap-core smap-wrap"><div className="smap-heading"><div><div className="smap-kicker"><FileText size={15}/> COMPANY & RESOURCES</div><h2>Useful places to start.</h2></div><p>Go directly to company information, recent insights or a conversation with our team.</p></div><div className="smap-core-grid">{coreLinks.map(([name,href])=><Link href={href} key={href}>{name}<ArrowUpRight size={17}/></Link>)}</div></section>
  <section className="smap-services"><div className="smap-wrap"><div className="smap-heading"><div><div className="smap-kicker"><Compass size={15}/> SERVICE DIRECTORY</div><h2>Find support by discipline.</h2></div><p>Each service has its own scope and approach. Explore the area that best fits your goal.</p></div><div className="smap-groups">{sections.map(({name,icon:Icon,match})=>{const pages=remainingPages.filter(page=>!excluded.has(page.slug)&&match(page.category));return <section className="smap-group" key={name}><h3><Icon size={19}/>{name}<span>{String(pages.length).padStart(2,'0')}</span></h3><div>{pages.map(page=><Link href={`/${page.slug}/`} key={page.slug}>{page.title}<ArrowUpRight size={15}/></Link>)}</div></section>})}</div><div className="smap-other"><h3>More ways we can help</h3><div>{remainingPages.filter(page=>!excluded.has(page.slug)&&!sections.some(section=>section.match(page.category))).map(page=><Link href={`/${page.slug}/`} key={page.slug}>{page.title}<ArrowUpRight size={15}/></Link>)}</div></div></div></section>
  <section className="smap-bottom"><div className="smap-wrap"><div><small>HAVE A SPECIFIC GOAL IN MIND?</small><h2>We’ll help you find<br/>the best place to begin.</h2><p>Tell us about your business and what you want to improve. Our team will recommend a practical next step.</p></div><Link className="smap-button" href="/request-quote/">Request a consultation <ArrowUpRight size={18}/></Link></div></section></main>}

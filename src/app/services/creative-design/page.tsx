import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Brush, Check, Image, Layers, PenTool, Shapes } from 'lucide-react';
import '../service-pages.css';

export const metadata = {
  title: 'Creative Design Services | Sansoft',
  description: 'Creative design services for campaigns, social media, brand assets and marketing collateral. Get distinctive, consistent visuals designed around your audience and business goals.',
  alternates: { canonical: '/services/creative-design/' },
};

const deliverables = [
  { icon: PenTool, title: 'Campaign concepts', text: 'A clear visual direction for launches, promotions and campaigns, shaped around your audience and goals.' },
  { icon: Image, title: 'Social media creative', text: 'On-brand posts, stories and ad assets that help your business show up consistently across channels.' },
  { icon: Layers, title: 'Marketing collateral', text: 'Brochures, flyers and sales materials that explain your offer and make the next step clear.' },
  { icon: Shapes, title: 'Brand visual systems', text: 'A considered mix of color, type, layout and imagery that keeps every touchpoint recognizably yours.' },
];

export default function CreativeDesignPage() {
  return <main className="service-child creative-child">
    <section className="child-hero"><div className="child-wrap child-hero-grid"><div className="child-copy"><span className="child-kicker">CREATIVE DESIGN · BRAND EXPERIENCE</span><h1>Make your message<br/><em>hard to forget.</em></h1><p>Creative design services that help your business look clear, consistent and distinctive. From campaign concepts and social media creative to marketing collateral, we build visuals around your brand and the people you want to reach.</p><div className="child-actions"><Link className="child-button" href="/request-quote/?service=Creative%20Design">Share your design brief <ArrowUpRight size={17}/></Link><a className="child-text-link" href="#design-services">Explore what we create <ArrowRight size={16}/></a></div><div className="child-proof"><Check size={16}/><span><b>One clear visual direction</b><small>Designed to work across your important channels</small></span></div></div><div className="child-photo creative-photo"><img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85" alt="Creative workspace with visual design materials"/><div className="child-photo-label"><span>STRATEGY · CRAFT · CONSISTENCY</span><b>Good design<br/>makes the point.</b></div><div className="child-float"><Brush size={18}/><span>Made for your brand</span></div></div></div></section>
    <section className="child-intro child-wrap"><div><span className="child-kicker">DESIGN THAT DOES A JOB</span><h2>Look the part.<br/><em>Say it clearly.</em></h2></div><div><p>Design is often the first way a customer experiences your business. A consistent visual language helps people recognize you, understand what you offer and feel confident taking the next step.</p><p>We bring your message, audience and brand together before shaping the creative. The result is work with a purpose: a stronger campaign, a more useful sales piece or a more coherent presence across your channels.</p></div></section>
    <section className="child-deliverables" id="design-services"><div className="child-wrap"><div className="child-section-head"><div><span className="child-kicker">CREATIVE & DESIGN SERVICES</span><h2>Thoughtful visuals.<br/><em>Made to connect.</em></h2></div><p>Choose the support that fits your next project, or combine creative services into one consistent campaign.</p></div><div className="child-card-grid">{deliverables.map(({icon:Icon,title,text})=><article className="child-card" key={title}><span className="child-card-icon"><Icon size={21}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="child-process child-wrap"><div><span className="child-kicker">FROM BRIEF TO FINAL FILE</span><h2>A collaborative<br/><em>creative process.</em></h2><p>We keep the work focused, the decisions clear and the final assets ready for the places you need them.</p></div><div className="child-steps"><article><b>01</b><span><strong>Understand</strong><small>We learn about your brand, audience, message and use case.</small></span></article><article><b>02</b><span><strong>Design</strong><small>We develop a visual direction and refine the creative with your feedback.</small></span></article><article><b>03</b><span><strong>Deliver</strong><small>You receive polished, correctly sized assets ready to put to work.</small></span></article></div></section>
    <section className="child-cta"><div className="child-wrap"><div><span className="child-kicker">HAVE A PROJECT IN MIND?</span><h2>Let’s make something<br/><em>worth remembering.</em></h2><p>Tell us what you’re creating and where it needs to work. We’ll help shape a clear next step.</p></div><Link className="child-button" href="/request-quote/?service=Creative%20Design">Talk to our creative team <ArrowUpRight size={17}/></Link></div></section>
  </main>;
}

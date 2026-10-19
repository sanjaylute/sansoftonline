import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BarChart3, CalendarDays, Heart, MessageCircle, Share2, Sparkles, UsersRound } from 'lucide-react';
import './social-media.css';

export const metadata: Metadata = {
  title: 'Social Media Marketing Services | Sansoft',
  description: 'Build a stronger social media presence with Sansoft. Get audience-led strategy, content planning, profile optimization and community support tailored to your business.',
  alternates: { canonical: 'https://www.sansoftonline.com/services/social-media/' },
  openGraph: {
    title: 'Social Media Marketing Services | Sansoft',
    description: 'Audience-led social media strategy, content planning and community support for growing businesses.',
    url: 'https://www.sansoftonline.com/services/social-media/',
    siteName: 'Sansoft',
    type: 'website',
  },
};

const focusAreas = [
  { icon: UsersRound, title: 'A strategy for your audience', text: 'Choose the right channels, audience and goals before you commit to a publishing schedule.' },
  { icon: CalendarDays, title: 'Content with a clear rhythm', text: 'Plan useful themes and posts that keep your brand recognizable and consistent.' },
  { icon: MessageCircle, title: 'Community that feels human', text: 'Make room for conversations, timely responses and the feedback that helps your business learn.' },
];

const services = [
  { icon: CalendarDays, title: 'Social media management', text: 'Bring planning, publishing and community support together in a sustainable workflow.', href: '/social-media-management-services/', label: 'Explore management' },
  { icon: Sparkles, title: 'Social content creation', text: 'Turn your expertise, offers and everyday business moments into channel-ready content.', href: '/social-media-content-creation-services/', label: 'Explore content creation' },
  { icon: Share2, title: 'Profile optimization', text: 'Make your profiles clearer, more consistent and easier for customers to act on.', href: '/social-media-profile-optimization-services/', label: 'Explore profile optimization' },
];

const steps = [
  ['Listen', 'We learn about your business, audience, current channels and what social media needs to support.'],
  ['Plan', 'We set priorities, content themes, channel roles and a workable approval rhythm.'],
  ['Create & publish', 'We prepare content in your brand voice and help keep publishing consistent.'],
  ['Learn & refine', 'We review meaningful signals and use them to guide practical improvements.'],
];

const faqs = [
  ['What does social media marketing include?', 'It can include channel strategy, content planning, post creation, profile improvements, publishing coordination and community support. We shape the exact scope around your goals and team.'],
  ['Which social media platforms should my business use?', 'The right mix depends on your audience, offer and available content. We help prioritize the channels where your customers are active and where your business can contribute consistently.'],
  ['Can you create the content as well as manage our accounts?', 'Yes. Social media management and content creation can be planned together, including themes, copy, creative formats and an approval workflow.'],
  ['How do you measure social media progress?', 'We agree on useful indicators for your goals, such as reach, engagement, profile actions, website visits or enquiries. Reporting focuses on what the signals suggest and what to improve next.'],
];

export default function SocialMediaMarketingPage() {
  return <main className="smm-hub">
    <section className="smm-hero">
      <div className="smm-wrap smm-hero-grid">
        <div className="smm-hero-copy">
          <span className="smm-eyebrow"><i/>SOCIAL MEDIA MARKETING · STRATEGY, CONTENT & COMMUNITY</span>
          <h1>Make your brand<br/><em>part of the conversation.</em></h1>
          <p>Build a social presence people recognize and want to engage with. Sansoft brings strategy, content planning and thoughtful community support together around your audience and business goals.</p>
          <div className="smm-actions"><Link className="smm-button" href="/request-quote/?service=social-media">Plan your social media strategy <ArrowUpRight size={18}/></Link><a className="smm-secondary" href="#what-we-do">Explore what we do <ArrowRight size={17}/></a></div>
          <div className="smm-proof"><span><Heart size={17}/></span><div><b>Useful content. Real connection.</b><small>Built around your brand and your people.</small></div></div>
        </div>
        <div className="smm-hero-image">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1500&q=88" alt="Marketing team planning content together around a laptop"/>
          <div className="smm-image-shade"/>
          <div className="smm-image-meta"><span>YOUR BRAND, IN GOOD COMPANY</span><b>Show up with<br/>something to say.</b><small>STRATEGY · CONTENT · COMMUNITY</small></div>
          <div className="smm-floating-card"><span><BarChart3 size={20}/></span><div><b>Made to keep improving</b><small>Listen, learn, refine.</small></div></div>
        </div>
      </div>
      <div className="smm-proof-bar"><div className="smm-wrap"><span>BE CONSISTENT</span><i/><b>Build a presence that sounds and feels like your business.</b><i/><span>STAY CONNECTED</span></div></div>
    </section>

    <section className="smm-intro smm-wrap" id="what-we-do">
      <div><span className="smm-eyebrow"><i/>SOCIAL MEDIA THAT HAS A PURPOSE</span><h2>More than posts.<br/><em>A place to build trust.</em></h2></div>
      <div className="smm-intro-copy"><p>Social media gives people a way to discover your business, understand what makes it different and start a conversation. A thoughtful approach connects those moments instead of treating every post as a one-off.</p><p>We help you find a practical rhythm for your channels, with clear themes and useful content that supports the next step you want customers to take.</p></div>
    </section>

    <section className="smm-focus"><div className="smm-wrap"><div className="smm-section-head"><div><span className="smm-eyebrow"><i/>A STRONGER SOCIAL PRESENCE</span><h2>Clear direction.<br/><em>Better conversations.</em></h2></div><p>Social media marketing works best when every channel has a role and every piece of content gives people a reason to connect.</p></div>
      <div className="smm-focus-grid">{focusAreas.map(({icon:Icon,title,text})=><article key={title}><span className="smm-icon"><Icon size={22}/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className="smm-offerings"><div className="smm-wrap"><div className="smm-section-head"><div><span className="smm-eyebrow"><i/>HOW SANSOFT CAN HELP</span><h2>Support for every<br/><em>part of the process.</em></h2></div><p>Start with the support you need now, then connect the pieces as your social presence grows.</p></div>
      <div className="smm-offering-grid">{services.map(({icon:Icon,title,text,href,label})=><article key={title}><span className="smm-icon"><Icon size={21}/></span><h3>{title}</h3><p>{text}</p><Link href={href}>{label} <ArrowUpRight size={16}/></Link></article>)}</div>
    </div></section>

    <section className="smm-process"><div className="smm-wrap smm-process-grid"><div className="smm-process-copy"><span className="smm-eyebrow"><i/>A PRACTICAL WORKING RHYTHM</span><h2>From first conversation<br/><em>to steady momentum.</em></h2><p>We keep the process collaborative and clear. You know what is being planned, what needs your input and how the work is moving toward your goals.</p><Link className="smm-dark-link" href="/request-quote/?service=social-media">Talk through your goals <ArrowRight size={17}/></Link></div>
      <div className="smm-steps">{steps.map(([title,text],index)=><article key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </div></section>

    <section className="smm-faq smm-wrap"><div><span className="smm-eyebrow"><i/>COMMON QUESTIONS</span><h2>Questions about<br/><em>social media marketing.</em></h2><p>Tell us what you are working toward and we’ll help you find a suitable starting point.</p></div><div className="smm-faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="smm-cta"><div className="smm-wrap"><div><span>READY TO SHOW UP WITH PURPOSE?</span><h2>Let’s build a social presence<br/><em>people want to come back to.</em></h2><p>Start with a conversation about your audience, channels and goals.</p></div><Link href="/request-quote/?service=social-media">Request a social media consultation <ArrowUpRight size={18}/></Link></div></section>
  </main>;
}

import type { Metadata } from 'next';
import { ArrowDown, ArrowUpRight, Heart, MapPin, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { LifeGallery } from '@/components/life-gallery';
import './life.css';

export const metadata: Metadata = {
  title: 'Life at Sansoft | Our People, Workplace & Story',
  description: 'A look at the people, workplaces and milestones that have shaped Sansoft in Nagpur since 2003.',
  alternates: { canonical: '/life-at-sansoft/' },
};

export default function LifeAtSansoftPage() {
  return <main className="life-page">
    <section className="life-hero">
      <div className="life-wrap life-hero-grid">
        <div className="life-hero-copy">
          <span className="life-kicker"><i/>LIFE @ SANSOFT</span>
          <h1>Good work starts<br/>with <em>good people.</em></h1>
          <p>Since our beginnings in Nagpur, Sansoft has grown through the people who bring care, curiosity and ideas to the work. Here’s a glimpse of the team and places behind our story.</p>
          <a className="life-link" href="#moments">Explore our moments <ArrowDown size={17}/></a>
          <div className="life-facts"><span><UsersRound size={17}/>People make the place</span><span><MapPin size={17}/>Nagpur, India</span></div>
        </div>
        <div className="life-hero-photo"><img src="/about-timeline/early-team.jpg" alt="Sansoft colleagues together in the company’s early years"/><div className="life-photo-label"><span>OUR STORY, TOGETHER</span><b>Built by people<br/>who care about the work.</b></div><span className="life-hero-year">SINCE 2003</span></div>
      </div>
      <div className="life-hero-bottom"><div className="life-wrap"><span>A LITTLE OF WHAT MAKES US, US</span><b>People</b><i/><b>Shared ideas</b><i/><b>Room to grow</b><i/><b>Good moments</b></div></div>
    </section>

    <section className="life-intro life-wrap"><div><span className="life-kicker"><i/>MORE THAN A WORKPLACE</span><h2>Many chapters.<br/><em>One Sansoft.</em></h2></div><div><p>Every company is shaped by the people who show up, solve problems together and make a place their own. Our story has moved from a small early team to a renewed workplace in Nagpur, with each chapter adding something to the culture we carry forward.</p><p>This gallery brings together moments and milestones from that journey. We’ll keep adding new team, workplace and event photos as more memories are shared.</p></div></section>

    <LifeGallery/>

    <section className="life-culture"><div className="life-wrap life-culture-grid"><div className="life-culture-mark"><Heart size={27}/><span>THE SANSOFT SPIRIT</span><strong>Care in the work.<br/><em>Respect for people.</em></strong></div><div><span className="life-kicker"><i/>HOW WE GROW TOGETHER</span><h2>Curiosity, collaboration<br/>and <em>room to do your best.</em></h2><p>Good work takes different perspectives, clear communication and a willingness to keep learning. We value the people behind every project and the care they bring to the details.</p><Link href="/contact-us/" className="life-cta-link">Say hello to our team <ArrowUpRight size={17}/></Link></div></div></section>

    <section className="life-final"><div className="life-wrap"><span>EVERY GOOD CHAPTER HAS PEOPLE IN IT</span><h2>Want to know more<br/>about <em>Sansoft?</em></h2><p>Meet the company, discover our journey and get to know the people behind the work.</p><Link href="/about-us/">Read our story <ArrowUpRight size={17}/></Link></div></section>
  </main>;
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, HeartHandshake, Lightbulb, UsersRound } from 'lucide-react';
import './people.css';

export const metadata: Metadata = {
  title: 'Our People | The Team Behind Sansoft',
  description: 'Meet the people and teams whose ideas, expertise and commitment have shaped Sansoft since its founding in Nagpur in 2003.',
  alternates: { canonical: '/our-people/' },
};

const contributions = [
  { icon: Lightbulb, title: 'The people who started it', text: 'Founder Sanjay L. established Sansoft in Nagpur in 2003, bringing an early belief in the web’s ability to help businesses grow.' },
  { icon: UsersRound, title: 'The teams who built it', text: 'Across each chapter, colleagues have brought their craft to search, creative, technology and client work—and helped Sansoft grow together.' },
  { icon: HeartHandshake, title: 'The people who keep it moving', text: 'Every project is shaped by people who listen, share ideas and care about getting the details right for the businesses they support.' },
];

const currentPeople = [
  { name: 'Amit Sawarkar', shade: 'peach' },
  { name: 'Manish Mate', shade: 'orange' },
  { name: 'Vivek D', shade: 'sand' },
  { name: 'Mukund M', shade: 'peach' },
  { name: 'Ashwini', shade: 'cream' },
  { name: 'Palash N', shade: 'orange' },
  { name: 'Nikhil M', shade: 'sand' },
];

function displayName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2 || /^\d+$/.test(parts.at(-1) || '')) return name;
  return `${parts.slice(0, -1).join(' ')} ${parts.at(-1)?.[0]}.`;
}

export default function OurPeoplePage() {
  return <main className="people-page">
    <section className="people-hero"><div className="people-wrap people-hero-grid"><div className="people-hero-copy"><span className="people-kicker"><i/>THE PEOPLE OF SANSOFT</span><h1>Built by people.<br/><em>Strengthened together.</em></h1><p>Every chapter in Sansoft’s story has been shaped by the people who contributed their ideas, skill and commitment. This is a recognition of the founder and the many colleagues behind the work.</p><a href="#contributors" className="people-hero-link">Meet our contributors <ArrowDown size={17}/></a><div className="people-since"><strong>2003</strong><span>Founded in Nagpur<br/>and growing through people</span></div></div><div className="people-hero-image"><Image src="/about-timeline/early-team.jpg" alt="Sansoft colleagues gathered together in the company’s early years" width={2048} height={1536} priority/><span>THE PEOPLE BEHIND THE PROGRESS</span></div></div></section>

    <section className="people-founder" id="contributors"><div className="people-wrap people-founder-grid"><div className="people-founder-photo"><Image src="/about-timeline/us-office.jpg" alt="Sansoft founder Sanjay L. during a visit to the United States" width={720} height={540}/><span>FOUNDER · SANSOFT</span></div><div className="people-founder-copy"><span className="people-kicker"><i/>A FOUNDING CONTRIBUTION</span><h2>Sanjay L.<br/><em>Founder, Sansoft</em></h2><p>Entrepreneur Sanjay L. founded Sansoft in Nagpur in 2003 with a belief in the potential of the web to help businesses grow. His vision set the company in motion and shaped its journey from a small beginning to a digital marketing business serving clients locally and around the world.</p><p>From establishing the first team to building Sansoft’s long-term home in Nagpur, his contribution remains part of the company’s story.</p><Link href="/about-us/" className="people-story-link">Explore the Sansoft story <ArrowUpRight size={17}/></Link></div></div></section>

    <section className="people-employee-section"><div className="people-wrap"><div className="people-heading"><div><span className="people-kicker"><i/>TODAY’S TEAM</span><h2>People moving<br/><em>Sansoft forward.</em></h2></div><p>Meet some of the people whose work and ideas continue to move Sansoft forward. Icon portraits are shown until approved employee photos are available.</p></div><div className="people-employee-collage">{currentPeople.map((person,index)=><article className={`people-employee-card people-employee-card-${index+1}`} key={person.name}><div className={`people-employee-photo people-person-placeholder ${person.shade}`} aria-hidden="true"><UsersRound size={54} strokeWidth={1.35}/></div><div className="people-employee-caption"><span>OUR TEAM</span><strong>{displayName(person.name)}</strong></div></article>)}</div><p className="people-roster-source">Sansoft team members are shown by first name and last initial where provided.</p></div></section>

    <section className="people-alumni"><div className="people-wrap"><div className="people-heading"><div><span className="people-kicker"><i/>PAST CONTRIBUTORS</span><h2>Those who helped<br/><em>shape the early years.</em></h2></div><p>Sansoft’s history includes colleagues whose work and teamwork helped build the company’s early foundation.</p></div><div className="people-alumni-grid"><article className="people-alumni-team"><Image src="/about-timeline/early-team.jpg" alt="Sansoft colleagues in the early team group photo" width={2048} height={1536}/><div><span>THE EARLY SANSOFT TEAM</span><strong>Many people.<br/>A shared beginning.</strong><p>An archive photo of the colleagues who helped shape Sansoft’s early chapter.</p></div></article><article className="people-alumni-card"><div className="people-alumni-photo people-person-placeholder" aria-hidden="true"><UsersRound size={54} strokeWidth={1.35}/></div><div className="people-employee-caption"><span>MARKETOZ TEAM · 2011–12</span><strong>{displayName('Rajhans Khobragade')}</strong><p>Recognized as a member of Sansoft’s Best Team of the Year for 2011–12.</p></div></article></div><p className="people-roster-source">Historical team recognition: <a href="https://in.linkedin.com/in/seorajhans" target="_blank" rel="noreferrer">Rajhans K.’s public profile <ArrowUpRight size={13}/></a>.</p></div></section>

    <section className="people-contributions"><div className="people-wrap"><div className="people-heading"><div><span className="people-kicker"><i/>A COLLECTIVE EFFORT</span><h2>Many talents.<br/><em>One shared effort.</em></h2></div><p>Sansoft’s progress belongs to the people who contributed at every stage. Their work spans many disciplines, connected by care for clients and pride in the details.</p></div><div className="people-contribution-grid">{contributions.map(({icon:Icon,title,text},index)=><article key={title}><span className="people-contribution-number">0{index+1}</span><div className="people-icon"><Icon size={22}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="people-recognition"><div className="people-wrap people-recognition-inner"><span>TO EVERYONE WHO HAS BEEN PART OF THE JOURNEY</span><h2>Your contribution<br/><em>is part of our story.</em></h2><p>We’re grateful to the colleagues, collaborators and clients who have helped Sansoft learn, grow and keep moving forward.</p><Link href="/life-at-sansoft/">See life at Sansoft <ArrowUpRight size={17}/></Link></div></section>
  </main>;
}

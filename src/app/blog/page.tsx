import Link from 'next/link';
import { ArrowUpRight, CalendarDays, MoveRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import './blog-pages.css';
import { livePageMetadata } from "@/lib/live-seo-metadata";

export const metadata = livePageMetadata("blog");

export default function BlogPage() {
  const [featured, ...articles] = blogPosts;
  return <main className="journal-page">
    <section className="journal-intro"><div className="journal-wrap">
      <div className="journal-kicker"><i/>SANSOFT JOURNAL <span>·</span> IDEAS FOR WHAT’S NEXT</div>
      <h1>Make your next<br/><em>move a smarter one.</em></h1>
      <div className="journal-intro-bottom"><p>Useful thinking on SEO, digital marketing and building a stronger business online. Clear perspectives, grounded in the work that helps customers find you.</p><a href="#latest">Explore the journal <MoveRight size={18}/></a></div>
    </div></section>
    <section className="journal-feature-section journal-wrap" aria-label="Featured article">
      <article className="journal-feature">
        <Link href={`/${featured.slug}/`} className="journal-feature-image" aria-label={`Read ${featured.title}`}><img src={featured.image} alt={featured.imageAlt}/><span className="journal-image-label">FEATURED ARTICLE</span></Link>
        <div className="journal-feature-copy"><div className="journal-meta"><span>{featured.category}</span><span><CalendarDays size={14}/>{featured.date}</span></div><h2><Link href={`/${featured.slug}/`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><Link className="journal-read-link" href={`/${featured.slug}/`}>Read the article <ArrowUpRight size={17}/></Link></div>
      </article>
    </section>
    <section className="journal-list-section" id="latest"><div className="journal-wrap">
      <div className="journal-section-heading"><div><div className="journal-kicker"><i/>THE LATEST</div><h2>Ideas worth <em>your time.</em></h2></div><p>Browse practical guides and fresh perspectives for your next stage of growth.</p></div>
      <div className="journal-grid">{articles.map((post,index)=><article className="journal-card" key={post.slug}>
        <Link href={`/${post.slug}/`} className="journal-card-image"><img src={post.image} alt={post.imageAlt} loading="lazy"/><span>0{index+2}</span></Link>
        <div className="journal-card-copy"><div className="journal-meta"><span>{post.category}</span><span>{post.date}</span></div><h3><Link href={`/${post.slug}/`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="journal-read-link" href={`/${post.slug}/`}>Read article <ArrowUpRight size={16}/></Link></div>
      </article>)}</div>
    </div></section>
    <section className="journal-bottom-cta"><div className="journal-wrap"><div><span>HAVE A GROWTH QUESTION?</span><h2>Let’s find a clear<br/><em>way forward.</em></h2></div><Link href="/contact-us/">Talk to our team <ArrowUpRight size={18}/></Link></div></section>
  </main>;
}

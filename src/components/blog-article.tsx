import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import { blogPosts, type BlogPost } from '@/lib/blog-data';

export function findBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function blogPostMetadata(post: BlogPost) {
  return {
    title: `${post.title} | Sansoft`,
    description: post.excerpt,
    keywords: [post.title, post.category, 'Sansoft'],
    alternates: { canonical: `/${post.slug}/` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: 'article' as const },
  };
}

function readingMinutes(post: BlogPost) {
  const words = [post.paragraphs.join(' '), ...(post.sections?.map(section => section.content) ?? [])].join(' ').trim().split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 210));
}

export function BlogArticle({ post }: { post: BlogPost }) {
  const related = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 2);
  const recommendations = related.length === 2 ? related : blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return <main className="journal-article-page">
    <section className="article-masthead"><div className="journal-wrap">
      <Link className="article-back" href="/blog/"><ArrowLeft size={16}/>All insights</Link>
      <div className="journal-kicker"><i/>{post.category.toUpperCase()} <span>·</span> SANSOFT JOURNAL</div>
      <h1>{post.title}</h1>
      <p className="article-deck">{post.excerpt}</p>
      <div className="article-byline"><span>Sansoft Editorial Team</span><i/><span><CalendarDays size={15}/>{post.date}</span><i/><span><Clock3 size={15}/>{readingMinutes(post)} min read</span></div>
    </div></section>
    <div className="journal-wrap article-photo-wrap"><figure className="article-photo"><img src={post.image} alt={post.imageAlt}/><figcaption>{post.imageAlt}</figcaption></figure></div>
    <section className="journal-wrap article-layout"><aside className="article-aside"><span>IN THIS ARTICLE</span><p>{post.title}</p><Link href="/request-quote/">Talk to Sansoft <ArrowUpRight size={15}/></Link></aside>
      <article className="article-reading"><p className="article-lead">{post.paragraphs[0]}</p>
        {post.sections ? post.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2><p>{section.content}</p></section>) : post.paragraphs.slice(1).map((paragraph,index)=><section key={paragraph}><h2>{articleSubhead(post,index)}</h2><p>{paragraph}</p></section>)}
        <div className="article-callout"><span>THE TAKEAWAY</span><p>Build around what your customers need, keep the details clear and use what you learn to make the next improvement count.</p></div>
        <Link href="/blog/" className="article-back-bottom"><ArrowLeft size={16}/>Back to all insights</Link>
      </article>
    </section>
    <section className="article-related"><div className="journal-wrap"><div className="journal-section-heading"><div><div className="journal-kicker"><i/>KEEP READING</div><h2>More ideas for <em>growth.</em></h2></div><Link href="/blog/">Visit the journal <ArrowUpRight size={16}/></Link></div>
      <div className="article-related-grid">{recommendations.map((item)=><article key={item.slug}><Link href={`/${item.slug}/`}><img src={item.image} alt={item.imageAlt} loading="lazy"/><div className="journal-meta"><span>{item.category}</span><span>{item.date}</span></div><h3>{item.title}</h3><span className="journal-read-link">Read article <ArrowUpRight size={15}/></span></Link></article>)}</div>
    </div></section>
    <section className="journal-bottom-cta"><div className="journal-wrap"><div><span>READY TO PUT AN IDEA INTO ACTION?</span><h2>Let’s work on your<br/><em>next chapter.</em></h2></div><Link href="/contact-us/">Start a conversation <ArrowUpRight size={18}/></Link></div></section>
  </main>;
}

function articleSubhead(post: BlogPost, index: number) {
  const headings: Record<string, string[]> = {
    'why-your-nagpur-business-needs-seo-in-2026': ['Build a reliable local foundation', 'Make your website useful to nearby customers', 'Earn trust across local touchpoints', 'Keep improving with real-world signals'],
    'best-digital-marketing-strategies-for-nagpur-businesses-in-2026': ['Start with the outcome', 'Strengthen the foundation first', 'Give every channel a clear role', 'Make learning part of the plan'],
    'how-local-seo-helps-nagpur-businesses-attract-more-customers': ['Make your business easy to verify', 'Connect local discovery to a useful website', 'Build trust consistently', 'Measure the actions that matter'],
    'top-seo-trends-in-nagpur-businesses-should-watch-in-2026': ['Prioritize genuinely useful content', 'Keep technical fundamentals strong', 'Continue investing in local relevance', 'Use measurement to guide decisions'],
    'understanding-the-structure-of-professional-seo-packages': ['Look for a clear, relevant scope', 'Understand the deliverables', 'Expect useful reporting', 'Choose transparency over promises'],
    'how-digital-marketing-services-help-businesses-grow-online': ['Create a strong digital destination', 'Connect channels to customer intent', 'Use measurement to join the dots', 'Keep the experience improving'],
    'why-businesses-prefer-monthly-seo-services': ['Create a consistent improvement rhythm', 'Know what the work is delivering', 'Set realistic measures of progress', 'Adapt as your business evolves'],
  };
  return headings[post.slug]?.[index] ?? `A practical perspective on ${post.category.toLowerCase()}`;
}

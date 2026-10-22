import { blogPosts } from '@/lib/blog-data';

export const dynamic = 'force-static';

export function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sansoftonline.com').replace(/\/$/, '');

  return Response.json({
    posts: blogPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      url: `${base}/${post.slug}/`,
      publishedAt: post.date,
    })),
  }, {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}

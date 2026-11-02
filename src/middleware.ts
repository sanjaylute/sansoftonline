import { NextResponse, type NextRequest } from 'next/server';

// These paths were used by the legacy site's nested service navigation. The
// rebuilt site uses one canonical URL per service, so preserve their equity
// without treating arbitrary, malformed URLs as valid pages.
const legacyServiceRedirects: Record<string, string> = {
  '/seo-services/on-page-seo-services/': '/on-page-seo-services/',
  '/seo-services/technical-seo-services/': '/technical-seo-services/',
  '/seo-services/off-page-seo-services/': '/off-page-seo-services/',
  '/seo-services/voice-search-seo-services/': '/voice-search-seo-services/',
  '/seo-services/youtube-video-seo-services/': '/youtube-video-seo-services/',
  '/seo-services/generative-engine-optimization-services/': '/generative-engine-optimization-services/',
  '/local-business-seo-services/google-my-business-seo-services/': '/google-my-business-seo-services/',
  '/local-business-seo-services/local-seo-services/': '/local-seo-services/',
  '/local-business-seo-services/local-citations-directories/': '/local-citations-directories/',
  '/cms-seo-services/wordpress-seo-services/': '/wordpress-seo-services/',
  '/cms-seo-services/shopify-seo-services/': '/shopify-seo-services/',
  '/cms-seo-services/wix-seo-services/': '/wix-seo-services/',
  '/cms-seo-services/squarespace-seo-services/': '/squarespace-seo-services/',
  '/social-media-ads-services/facebook-ads-services/': '/facebook-ads-services/',
  '/social-media-ads-services/instagram-ads-services/': '/instagram-ads-services/',
  '/social-media-ads-services/youtube-ads-services/': '/youtube-ads-services/',
  '/social-media-ads-services/pinterest-ads-services/': '/pinterest-ads-services/',
  '/social-media-ads-services/linkedin-ads-services/': '/linkedin-ads-services/',
  '/social-media-ads-services/twitter-ads-services/': '/twitter-ads-services/',
  '/social-media-management-services/social-media-content-creation-services/': '/social-media-content-creation-services/',
  '/social-media-management-services/social-media-profile-optimization-services/': '/social-media-profile-optimization-services/',
  '/graphic-design-services/business-poster-design-services/': '/business-poster-design-services/',
  '/graphic-design-services/brochure-design-services/': '/brochure-design-services/',
  '/graphic-design-services/flyer-design-services/': '/flyer-design-services/',
  '/graphic-design-services/banners-for-google-ads/': '/banners-for-google-ads/',
  '/graphic-design-services/header-cover-design-services/': '/header-cover-design-services/',
  '/graphic-design-services/nft-characters-design-services/': '/nft-characters-design-services/',
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0]?.toLowerCase();

  if (hostname === 'sansoftonline.com') {
    const destination = request.nextUrl.clone();
    destination.protocol = 'https:';
    destination.hostname = 'www.sansoftonline.com';
    destination.port = '';

    return NextResponse.redirect(destination, 308);
  }

  const pathname = request.nextUrl.pathname.endsWith('/')
    ? request.nextUrl.pathname
    : `${request.nextUrl.pathname}/`;
  const legacyDestination = legacyServiceRedirects[pathname];

  if (legacyDestination) {
    const destination = request.nextUrl.clone();
    destination.pathname = legacyDestination;
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

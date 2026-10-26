import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0]?.toLowerCase();

  if (hostname === 'sansoftonline.com') {
    const destination = request.nextUrl.clone();
    destination.protocol = 'https:';
    destination.hostname = 'www.sansoftonline.com';
    destination.port = '';

    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

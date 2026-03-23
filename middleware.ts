import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);

  const url = request.nextUrl;

  if (!url.searchParams.has('viewport')) {
    url.searchParams.set('viewport', isMobile ? 'mobile' : 'desktop');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/game/:path*'],
};

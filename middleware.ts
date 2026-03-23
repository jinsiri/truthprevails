import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.searchParams.has('viewport')) return NextResponse.next();

  const ua = request.headers.get('user-agent') || '';
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
  const viewport = isMobile ? 'mobile' : 'desktop';

  url.searchParams.set('viewport', viewport);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/', '/game/:path*'],
};

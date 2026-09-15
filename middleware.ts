import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();

  if (host === 'makarilla.menu.paneltakip.com') {
    const { pathname } = request.nextUrl;

    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/menu/makarilla';
      return NextResponse.rewrite(url);
    }

    if (pathname === '/menu') {
      const url = request.nextUrl.clone();
      url.pathname = '/menu/makarilla';
      url.searchParams.set('view', 'menu');
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

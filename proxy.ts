import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();

  if (host === 'makarilla.menu.paneltakip.com') {
    const { pathname } = request.nextUrl;

    // Keep Next.js assets, public files and API routes untouched.
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // The branded domain root is the Makarilla QR-menu landing page.
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/menu/makarilla';
      return NextResponse.rewrite(url);
    }

    // Preserve the clean branded URL while supporting menu navigation.
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

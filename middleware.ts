import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.get('session');

  // Private routes
  const privateRoutes = ['/profile', '/notes'];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  // Public routes for authorisation
  const authRoutes = ['/sign-in', '/sign-up'];
  const isAuthRoute = authRoutes.includes(pathname);

  // If an unauthorised user tries to open a private page
  if (isPrivateRoute && !hasSession) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If an authorised user opens a public page
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import edgeConfig from './server/auth/edge-config';

const { auth } = NextAuth(edgeConfig);

export const middleware = auth((req) => {
  const isAuthorized = !!req.auth?.user.email;
  const path = req.nextUrl.pathname;

  if (path.startsWith('/platform') && !isAuthorized) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  if (path.startsWith('/login') && isAuthorized) {
    return NextResponse.redirect(new URL('/platform', req.nextUrl));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

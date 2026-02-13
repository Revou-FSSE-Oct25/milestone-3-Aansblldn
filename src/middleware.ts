// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Cek apakah user sudah login (dari cookie)
  const authToken = request.cookies.get('auth-token');
  
  // Kalau tidak ada token, redirect ke login
  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

// Hanya jalan di route yang dilindungi
export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*'],
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // إذا كان المسار الحالي هو صفحة الإغلاق، لا نقوم بإعادة التوجيه
  if (request.nextUrl.pathname === '/closed') {
    return NextResponse.next();
  }

  // توجيه جميع المسارات الأخرى إلى صفحة الإغلاق
  return NextResponse.redirect(new URL('/closed', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - closed (صفحة الإغلاق نفسها)
     */
    '/((?!_next/static|_next/image|favicon.ico|closed).*)',
  ],
}; 
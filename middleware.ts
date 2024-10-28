import { NextRequest, NextResponse } from 'next/server'
import { decrypt, getSession } from '@/lib/auth'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = '/kelola'
const publicRoutes = ['/login', '/signup', '/']
 
export async function middleware(req: NextRequest , sessionStorage: Storage) {

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
 
  // 3. Decrypt the session from the cookie
  const session = await getSession()
 
  // 5. Redirect to /login if the user is not authenticated
  if (req.nextUrl.pathname.startsWith(protectedRoutes) && !session?.data) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
  if (req.nextUrl.pathname.startsWith(protectedRoutes) && (session?.data.role !== 'ADMIN' && session?.data.role !== 'RESEPSIONIS')) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  // }
 
  return NextResponse.next()
}

export function loginPage(req:NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect if trying to access protected routes without a session
  if (pathname === '/login') {
      return NextResponse.next(); // Allow access to the login page
  }

  // Additional checks for other routes can be added here
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/kelola/:path*'],
}
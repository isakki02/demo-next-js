import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; 

  // Define protected routes
  const protectedRoutes = ['/my-blogs', '/create-blog'];

  // Check if the request is for a protected route
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      // Redirect to login if no token is found
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

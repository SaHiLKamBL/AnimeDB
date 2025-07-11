import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow public routes
        if (
          pathname.startsWith('/api/auth') ||
          pathname === '/login' ||
          pathname === '/register'
        ) {
          return true;
        }

        // Require token for all other pages
        if (!token) {
          return false;
        }

        return true;
      }
    },
    pages: {
      signIn: '/login',
    }
  }
)
